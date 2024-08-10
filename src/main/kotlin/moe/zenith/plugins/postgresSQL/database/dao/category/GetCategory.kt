package moe.zenith.plugins.postgresSQL.database.dao.category

import moe.zenith.plugins.postgresSQL.database.relation.Category
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the category result.
 *
 * @param id The id of the category.
 * @return A map of the category result.
 */
fun getCategory(id: Long): Map<String, String?> {
    var catName: String? = null;
    var catId: Long? = 0;

    transaction {
        Category.select(Category.catName, Category.catId)
            .where(Category.catId eq id)
            .forEach {
                catName = it[Category.catName]
                catId = it[Category.catId]
            }
    }

    return mapOf(
        "catName" to catName,
        "id" to "$catId",
    )
}