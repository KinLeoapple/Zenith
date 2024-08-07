package moe.zenith.plugins.sqlite.database.dao.category

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Blog
import org.ktorm.dsl.eq
import org.ktorm.dsl.from
import org.ktorm.dsl.select
import org.ktorm.dsl.where

/**
 * Return a map of how many blog of this category.
 *
 * @param database The database which wish to search.
 * @param id The id of the category.
 * @return A map of the get draft result.
 */
fun getBlogNumOfCategory(database: Database, id: Long): Map<String, Int> {
   return when (id) {
        0L -> mapOf("count" to 0)
        else -> {
            val result = database.getConnection().from(Blog)
                .select(Blog.blogId)
                .where(
                    Blog.catId eq id
                )

            mapOf("count" to result.totalRecordsInAllPages)
        }
    }
}