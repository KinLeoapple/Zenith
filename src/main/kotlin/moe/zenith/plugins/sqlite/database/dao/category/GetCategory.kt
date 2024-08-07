package moe.zenith.plugins.sqlite.database.dao.category

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Category
import org.ktorm.dsl.*

/**
 * Return a map of the category result.
 *
 * @param database The database which wish to search.
 * @param id The id of the category.
 * @return A map of the category result.
 */
fun getCategory(database: Database, id: Long): Map<String, String?> {
    var catName: String? = null;
    var catId: Long? = 0;

    val result = database.getConnection().from(Category)
        .select(Category.catName, Category.catId)
        .where(Category.catId eq id)

    result.forEach {
        catName = it[Category.catName]
        catId = it[Category.catId]
    }

    return mapOf(
        "catName" to catName,
        "id" to "$catId",
    )
}