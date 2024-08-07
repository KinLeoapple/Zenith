package moe.zenith.plugins.sqlite.database.dao.draft

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Draft
import org.ktorm.dsl.*
import java.time.ZoneOffset

/**
 * Return a map of the get draft result.
 *
 * @param database The database which wish to search.
 * @param userId The ID of the user.
 * @param id The id of the draft.
 * @return A map of the get draft result.
 */
fun getDraft(database: Database, userId: Long, id: Long): Map<String, String?> {
    var title: String? = null
    var date: String? = null

    val result = database.getConnection().from(Draft)
        .select(Draft.draftUpdateDt, Draft.draftTitle)
        .where { Draft.userId eq userId }
        .where(Draft.draftId eq id)

    result.forEach {
        title = it[Draft.draftTitle]
        date = it[Draft.draftUpdateDt]?.toInstant(ZoneOffset.UTC)?.toEpochMilli().toString()
    }

    return mapOf(
        "title" to title,
        "date" to date,
        "id" to "$id",
    )
}