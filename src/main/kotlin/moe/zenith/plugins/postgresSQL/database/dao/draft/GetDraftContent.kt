package moe.zenith.plugins.postgresSQL.database.dao.draft

import moe.zenith.plugins.postgresSQL.database.relation.Draft
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

/**
 * Return a map of the draft content.
 *
 * @param id The id of the draft.
 * @return A map of the draft content.
 */
fun getDraftContent(id: Long): Map<String, String?> {
    when (id) {
        0L -> return mapOf("content" to null)
        else -> {
            var draftPath: String? = null;

            transaction {
                Draft.select(Draft.draftPath)
                    .where(Draft.draftId eq id)
                    .forEach {
                        draftPath = it[Draft.draftPath]
                    }
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