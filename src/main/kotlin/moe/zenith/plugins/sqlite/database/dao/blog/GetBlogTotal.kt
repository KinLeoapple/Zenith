package moe.zenith.plugins.sqlite.database.dao.blog

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Blog
import org.ktorm.dsl.from
import org.ktorm.dsl.select

/**
 * Return a map of the blog total count.
 *
 * @param database The database which wish to search.
 * @return A map of the blog total count.
 */
fun getBolgTotal(database: Database): Map<String, Int> {
    val total = database.getConnection().from(Blog)
        .select(Blog.blogId)
        .totalRecordsInAllPages
    return mapOf("total" to total)
}