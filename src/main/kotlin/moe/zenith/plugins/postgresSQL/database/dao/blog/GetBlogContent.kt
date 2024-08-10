package moe.zenith.plugins.postgresSQL.database.dao.blog

import moe.zenith.plugins.postgresSQL.database.relation.Blog
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

/**
 * Return a map of the blog content.
 *
 * @param id The id of the blog.
 * @return A map of the blog content.
 */
fun getBlogContent(id: Long): Map<String, String?> {
    when (id) {
        0L -> return mapOf("content" to null)
        else -> {
            var blogPAth: String? = null;

            transaction {
                Blog
                    .select(Blog.blogPath)
                    .where(Blog.blogId eq id)
                    .forEach {
                        blogPAth = it[Blog.blogPath]
                    }
            }

            val blogFile = File("$blogPAth")
            val blogContent = if (blogFile.exists())
                blogFile.readText()
            else
                ""

            return mapOf("content" to blogContent)
        }
    }
}