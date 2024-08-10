package moe.zenith.plugins.postgresSQL.database.dao.search

import io.ktor.server.application.*
import moe.zenith.plugins.postgresSQL.database.relation.Blog
import moe.zenith.util.requestOffset
import moe.zenith.util.requestSize
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

/**
 * Return a map of blogs that contain the keyword.
 *
 * @param call The ApplicationCall
 * @return A map of blogs that contain the keyword.
 */
fun searchBlog(call: ApplicationCall): Map<String, Map<String, String?>> {
    val map: MutableMap<String, Map<String, String?>> = HashMap()

    val keyword = call.request.queryParameters["keyword"]
    val offset = requestOffset(call)
    val size = requestSize(call)

    if (!keyword.isNullOrEmpty()) {
        transaction {
            Blog.select(Blog.blogId, Blog.blogTitle, Blog.blogDescription, Blog.blogPubDt, Blog.blogPath)
                .limit(offset, size.toLong())
                .orderBy(Blog.blogPubDt)
                .forEach {
                    val blogId = it[Blog.blogId]
                    val title = it[Blog.blogTitle]
                    val desc = it[Blog.blogDescription]
                    val date = it[Blog.blogPubDt].time.toNanosecondOfDay().toString()
                    val blogPAth = it[Blog.blogPath]

                    val blogFile = File(blogPAth)
                    val blogContent = if (blogFile.exists())
                        blogFile.readText()
                    else
                        ""

                    if ((title.isNotEmpty() && title.contains(keyword))
                        || (desc.isNotEmpty() && desc.contains(keyword))
                        || (blogContent.isNotEmpty() && blogContent.contains(keyword))
                    ) {
                        val blog = mapOf(
                            "id" to blogId.toString(),
                            "title" to title,
                            "desc" to desc,
                            "date" to date,
                            "content" to blogContent
                        )
                        map["$blogId"] = blog
                    }
                }
        }
        return map
    }
    return map
}