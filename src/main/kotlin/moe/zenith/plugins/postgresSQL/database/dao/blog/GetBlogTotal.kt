package moe.zenith.plugins.postgresSQL.database.dao.blog

import moe.zenith.plugins.postgresSQL.database.relation.Blog
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the blog total count.
 *
 * @return A map of the blog total count.
 */
fun getBolgTotal(): Map<String, String> {
    val total = transaction {
        Blog.select(Blog.blogId).count()
    }
    return mapOf("total" to total.toString())
}