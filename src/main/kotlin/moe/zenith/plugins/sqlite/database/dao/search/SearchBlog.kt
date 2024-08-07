package moe.zenith.plugins.sqlite.database.dao.search

import io.ktor.server.application.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Blog
import moe.zenith.util.requestOffset
import moe.zenith.util.requestSize
import org.ktorm.dsl.*
import java.io.File
import java.time.ZoneOffset

/**
 * Return a map of blogs that contain the keyword.
 *
 * @param database The database which wish to search.
 * @param call The ApplicationCall
 * @return A map of blogs that contain the keyword.
 */
fun searchBlog(database: Database, call: ApplicationCall): Map<String, Map<String, String?>> {
    val map: MutableMap<String, Map<String, String?>> = HashMap()

    val keyword = call.request.queryParameters["keyword"]
    val offset = requestOffset(call)
    val size = requestSize(call)

    if (!keyword.isNullOrEmpty()) {
        val result = database.getConnection().from(Blog)
            .select(Blog.blogId, Blog.blogTitle, Blog.blogDes, Blog.blogPubDt, Blog.blogPath)
            .limit(offset, size)
            .orderBy(Blog.blogPubDt.asc())

        result.forEach {
            val blogId = it[Blog.blogId]
            val title = it[Blog.blogTitle]
            val desc = it[Blog.blogDes]
            val date = it[Blog.blogPubDt]?.toInstant(ZoneOffset.UTC)?.toEpochMilli().toString()
            val blogPAth = it[Blog.blogPath]

            val blogFile = File("$blogPAth")
            val blogContent = if (blogFile.exists())
                blogFile.readText()
            else
                ""

            if ((!title.isNullOrEmpty() && title.contains(keyword))
                || (!desc.isNullOrEmpty() && desc.contains(keyword))
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
        return map
    }
    return map
}