package moe.zenith.plugins.postgresSQL.database.dao.draft

import io.ktor.server.application.*
import moe.zenith.plugins.postgresSQL.database.relation.Draft
import moe.zenith.util.requestOffset
import moe.zenith.util.requestSize
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the all draft result.
 *
 * @param userId The ID of the user.
 * @param call The ApplicationCall.
 * @return A map of the all draft result.
 */
fun getDraftAll(userId: Long, call: ApplicationCall): Map<String, Map<String, String?>> {
    val offset = requestOffset(call)
    val size = requestSize(call)

    val map: MutableMap<String, Map<String, String?>> = HashMap()

    transaction {
        Draft.select(Draft.draftId, Draft.draftUpdateDt)
            .where { Draft.userId eq userId }
            .limit(offset, size.toLong())
            .orderBy(Draft.draftUpdateDt)
            .forEach {
                val draftId: Long = it[Draft.draftId];

                val draft = mapOf(
                    "id" to "$draftId",
                )
                map["$draftId"] = draft
            }
    }
    return map.toMap()
}