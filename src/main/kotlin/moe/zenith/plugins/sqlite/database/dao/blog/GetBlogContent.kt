package moe.zenith.plugins.sqlite.database.dao.blog

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Blog
import org.ktorm.dsl.*
import java.io.File

/**
 * Return a map of the blog content.
 *
 * @param database The database which wish to search.
 * @param id The id of the blog.
 * @return A map of the blog content.
 */
fun getBlogContent(database: Database, id: Long): Map<String, String?> {
    when (id) {
        0L -> return mapOf("content" to null)
        else -> {
            var blogPAth: String? = null;

            val result = database.getConnection().from(Blog)
                .select(Blog.blogPath)
                .where(Blog.blogId eq id)

            result.forEach {
                blogPAth = it[Blog.blogPath]
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