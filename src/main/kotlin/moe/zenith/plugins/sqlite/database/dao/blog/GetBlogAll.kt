package moe.zenith.plugins.sqlite.database.dao.blog

import io.ktor.server.application.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Blog
import moe.zenith.util.requestOffset
import moe.zenith.util.requestSize
import org.ktorm.dsl.*

/**
 * Return a map of the all blog result.
 *
 * @param database The database which wish to search.
 * @param userId The ID of the user.
 * @param call The ApplicationCall.
 * @return A map of the blog result.
 */
fun getBlogAll(database: Database, userId: Long, call: ApplicationCall): Map<String, Map<String, String?>> {
    val offset = requestOffset(call)
    val size = requestSize(call)

    val map: MutableMap<String, Map<String, String?>> = HashMap()

    val result = database.getConnection().from(Blog)
        .select(Blog.blogId, Blog.blogPubDt)
        .where { Blog.userId eq userId }
        .limit(offset, size)
        .orderBy(Blog.blogPubDt.asc())

    result.forEach {
        val blogId: Long? = it[Blog.blogId]

        val blog = mapOf(
            "id" to "$blogId",
        )
        map["$blogId"] = blog
    }
    return map.toMap()
}