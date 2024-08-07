package moe.zenith.plugins.sqlite.database.dao.draft

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Draft
import org.ktorm.dsl.from
import org.ktorm.dsl.select

/**
 * Return a map of the draft total count.
 *
 * @param database The database which wish to search.
 * @return A map of the draft total count.
 */
fun getDraftTotal(database: Database): Map<String, Int> {
    val total = database.getConnection().from(Draft)
        .select(Draft.draftId)
        .totalRecordsInAllPages
    return mapOf("total" to total)
}