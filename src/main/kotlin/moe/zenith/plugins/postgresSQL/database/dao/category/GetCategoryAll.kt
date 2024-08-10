package moe.zenith.plugins.postgresSQL.database.dao.category

import moe.zenith.plugins.postgresSQL.database.relation.Category
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the all category result.
 *
 * @return A map of the all category result.
 */
fun getCategoryAll(): Map<String, Map<String, String?>> {
    val map: MutableMap<String, Map<String, String?>> = HashMap()

    transaction {
        Category
            .select(Category.catId)
            .forEach {
                val catId: Long = it[Category.catId]

                val category = mapOf(
                    "id" to "$catId",
                )
                map["$catId"] = category
            }
    }
    return map.toMap()
}