package moe.zenith.plugins.postgresSQL.database.dao.draft

import moe.zenith.plugins.postgresSQL.database.relation.Draft
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the draft total count.
 *
 * @return A map of the draft total count.
 */
fun getDraftTotal(): Map<String, String> {
    val total = transaction {
        Draft
            .select(Draft.draftId)
            .count()
    }
    return mapOf("total" to total.toString())
}