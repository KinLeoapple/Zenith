package moe.zenith.plugins.sqlite.database.dao.draft

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Draft
import org.ktorm.dsl.*
import java.io.File

/**
 * Return a map of the draft content.
 *
 * @param database The database which wish to search.
 * @param id The id of the draft.
 * @return A map of the draft content.
 */
fun getDraftContent(database: Database, id: Long): Map<String, String?> {
    when (id) {
        0L -> return mapOf("content" to null)
        else -> {
            var draftPath: String? = null;

            val result = database.getConnection().from(Draft)
                .select(Draft.draftPath)
                .where(Draft.draftId eq id)

            result.forEach {
                draftPath= it[Draft.draftPath]
            }

            val draftFile = File("$draftPath")
            val draftContent = if (draftFile.exists())
                draftFile.readText()
            else
                ""

            return mapOf("content" to draftContent)
        }
    }
}