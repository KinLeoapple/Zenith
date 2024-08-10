package moe.zenith.plugins.postgresSQL.database.dao.draft

import com.google.gson.Gson
import kotlinx.datetime.toKotlinLocalDateTime
import moe.zenith.dataclass.PostDraftData
import moe.zenith.plugins.postgresSQL.database.relation.Draft
import moe.zenith.util.generateId
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.io.File
import java.time.LocalDateTime

/**
 * Return a map of the post draft result which contains draft id.
 *
 * @param json The json containers the information.
 * @param id The id of the draft.
 * @return A map of the post draft result.
 */
fun postDraft(json: String, id: Long?): Map<String, String?> {
    try {
        val dataClass: PostDraftData = Gson().fromJson(json, PostDraftData::class.java)

        if (dataClass.draft != "null" && dataClass.draft.trimIndent().isNotEmpty()) {
            val newId = generateId(id) // get id or generate id
            // save to file
            val saveTo = File("./draft/$newId")
            saveTo.parentFile.mkdirs()
            if (!saveTo.exists()) {
                saveTo.createNewFile()
            }
            saveTo.writeText(dataClass.draft) // write to file

            // store to database
            transaction {
                try {
                    Draft.insert {
                        it[draftId] = newId
                        it[draftUpdateDt] = LocalDateTime.now().toKotlinLocalDateTime()
                        it[draftPath] = saveTo.path
                        it[draftTitle] = dataClass.title
                    }
                } catch (e: Exception) {
                    Draft.update({ Draft.draftId eq newId }) {
                        it[draftUpdateDt] = LocalDateTime.now().toKotlinLocalDateTime()
                        it[draftPath] = saveTo.path
                        it[draftTitle] = dataClass.title
                    }
                }
            }
            return mapOf("saved" to "$newId")
        } else
            return mapOf("saved" to null)
    } catch (e: Exception) {
        return mapOf("saved" to null)
    }
}