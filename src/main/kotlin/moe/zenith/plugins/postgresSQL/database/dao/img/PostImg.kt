package moe.zenith.plugins.postgresSQL.database.dao.img

import com.github.yitter.idgen.YitIdHelper
import io.ktor.http.content.*
import kotlinx.coroutines.flow.asFlow
import kotlinx.datetime.toKotlinLocalDateTime
import moe.zenith.plugins.postgresSQL.database.relation.Image
import moe.zenith.util.md5
import moe.zenith.util.validation.isByteInSize
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.io.File
import java.time.LocalDateTime

/**
 * Return a map of the get image result.
 *
 * @param form The data of the form.
 * @param id The id of the image.
 * @return A map of the post image result.
 */
suspend fun postImg(form: MultiPartData, id: Long?): Map<String, String?> {
    try {
        var newId: Long? = null
        var fileBytes: ByteArray? = null
        var saveTo: File? = null
        var isInSize = true

        form.forEachPart { part ->
            when (part) {
                is PartData.BinaryChannelItem -> return@forEachPart
                is PartData.BinaryItem -> return@forEachPart
                is PartData.FormItem -> return@forEachPart
                is PartData.FileItem -> {
                    newId = id ?: YitIdHelper.nextId()
                    if (!isByteInSize(part.streamProvider(), 1024 * 1024 * 5)) {
                        isInSize = false
                    } else {
                        fileBytes = part.streamProvider().readBytes()
                        saveTo = File("./img/${newId}.${part.contentType.toString().replace("image/", "")}")
                        saveTo!!.parentFile.mkdirs()
                        if (!saveTo!!.exists()) {
                            saveTo!!.createNewFile()
                        }
                    }
                }
            }
        }

        // Image size is too large
        if (!isInSize) {
            return mapOf("saved" to null)
        }

        if (saveTo != null && fileBytes != null && newId != null) {
            val md5 = md5(fileBytes!!)

            val result = transaction {
                Image.select(Image.imgId)
                    .where { Image.imgHash eq md5 }
            }

            val count = transaction {
                result.count()
            }

            if (count <= 0) {
                saveTo!!.writeBytes(fileBytes!!)
                // store to database
                transaction {
                    try {
                        Image.insert {
                            it[imgId] = newId!!
                            it[imgPath] = saveTo!!.path
                            it[imgPubDt] = LocalDateTime.now().toKotlinLocalDateTime()
                            it[imgHash] = md5
                        }
                    } catch (e: Exception) {
                        Image.update({ Image.imgId eq newId!! }) {
                            it[imgPath] = saveTo!!.path
                            it[imgPubDt] = LocalDateTime.now().toKotlinLocalDateTime()
                            it[imgHash] = md5
                        }
                    }
                }
                return mapOf("saved" to (if (newId != null) "$newId" else null))
            } else {
               transaction {
                    result.forEach {
                        newId = it[Image.imgId]
                    }
                }
                return mapOf("saved" to "$newId")
            }
        } else
            return mapOf("saved" to null)
    } catch (e: Exception) {
        return mapOf("saved" to null)
    }
}