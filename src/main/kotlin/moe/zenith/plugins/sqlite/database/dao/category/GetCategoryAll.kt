package moe.zenith.plugins.sqlite.database.dao.category

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Category
import org.ktorm.dsl.forEach
import org.ktorm.dsl.from
import org.ktorm.dsl.select

/**
 * Return a map of the all category result.
 *
 * @param database The database which wish to search.
 * @return A map of the all category result.
 */
fun getCategoryAll(database: Database): Map<String, Map<String, String?>> {
    val map: MutableMap<String, Map<String, String?>> = HashMap()

    val result = database.getConnection().from(Category)
        .select(Category.catId)

    result.forEach {
        val catId: Long? = it[Category.catId]

        val category = mapOf(
            "id" to "$catId",
        )
        map["$catId"] = category
    }
    return map.toMap()
}