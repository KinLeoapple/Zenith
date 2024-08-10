package moe.zenith.plugins.postgresSQL.database.dao.img

import com.github.yitter.idgen.YitIdHelper
import io.ktor.http.content.*
import kotlinx.datetime.toKotlinLocalDateTime
import moe.zenith.plugins.postgresSQL.database.relation.Image
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
    var newId: Long? = null
    var fileBytes: ByteArray? = null
    var saveTo: File? = null

    form.forEachPart { part ->
        when (part) {
            is PartData.BinaryChannelItem -> return@forEachPart
            is PartData.BinaryItem -> return@forEachPart
            is PartData.FormItem -> return@forEachPart
            is PartData.FileItem -> {
                newId = id ?: YitIdHelper.nextId()
                fileBytes = part.streamProvider().readBytes()

                saveTo = File("./img/${newId}.${part.contentType.toString().replace("image/", "")}")
                saveTo!!.parentFile.mkdirs()
                if (!saveTo!!.exists()) {
                    saveTo!!.createNewFile()
                }
            }
        }
    }
    if (saveTo != null && fileBytes != null && newId != null) {
        saveTo!!.writeBytes(fileBytes!!)
        // store to database
        transaction {
            try {
                Image.insert {
                    it[imgId] = newId!!
                    it[imgPath] = saveTo!!.path
                    it[imgPubDt] = LocalDateTime.now().toKotlinLocalDateTime()
                }
            } catch (e: Exception) {
                Image.update({ Image.imgId eq newId!! }) {
                    it[imgPath] = saveTo!!.path
                    it[imgPubDt] = LocalDateTime.now().toKotlinLocalDateTime()
                }
            }
        }
        return mapOf("saved" to (if (newId != null) "$newId" else null))
    } else
        return mapOf("saved" to null)
}