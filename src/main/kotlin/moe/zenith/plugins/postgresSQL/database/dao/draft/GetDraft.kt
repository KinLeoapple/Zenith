package moe.zenith.plugins.postgresSQL.database.dao.draft

import moe.zenith.plugins.postgresSQL.database.relation.Draft
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the get draft result.
 *
 * @param userId The ID of the user.
 * @param id The id of the draft.
 * @return A map of the get draft result.
 */
fun getDraft(userId: Long, id: Long): Map<String, String?> {
    var title: String? = null
    var date: String? = null

    transaction {
        Draft.select(Draft.draftUpdateDt, Draft.draftTitle)
            .where { Draft.userId eq userId }
            .where(Draft.draftId eq id)
            .forEach {
                title = it[Draft.draftTitle]
                date = it[Draft.draftUpdateDt].time.toMillisecondOfDay().toString()
            }
    }

    return mapOf(
        "title" to title,
        "date" to date,
        "id" to "$id",
    )
}