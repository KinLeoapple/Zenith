package moe.zenith.plugins.postgresSQL.database.dao.category

import moe.zenith.plugins.postgresSQL.database.relation.Blog
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of how many blog of this category.
 *
 * @param id The id of the category.
 * @return A map of the get draft result.
 */
fun getBlogNumOfCategory(id: Long): Map<String, String> {
   return when (id) {
        0L -> mapOf("count" to "0")
        else -> {
            val total = transaction {
                Blog
                    .select(Blog.blogId)
                    .where(
                        Blog.catId eq id
                    )
            }

            mapOf("count" to total.toString())
        }
    }
}