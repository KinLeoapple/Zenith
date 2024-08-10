package moe.zenith.plugins.postgresSQL.database.dao.blog

import io.ktor.server.application.*
import moe.zenith.plugins.postgresSQL.database.relation.Blog
import moe.zenith.util.requestOffset
import moe.zenith.util.requestSize
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the all blog result.
 *
 * @param userId The ID of the user.
 * @param call The ApplicationCall.
 * @return A map of the blog result.
 */
fun getBlogAll(userId: Long, call: ApplicationCall): Map<String, Map<String, String?>> {
    val offset = requestOffset(call)
    val size = requestSize(call)

    val map: MutableMap<String, Map<String, String?>> = HashMap()

    transaction {
        Blog
            .select(Blog.blogId, Blog.blogPubDt)
            .where { Blog.userId eq userId }
            .limit(offset, size.toLong())
            .orderBy(Blog.blogPubDt)
            .forEach {
                val blogId: Long? = it[Blog.blogId]

                val blog = mapOf(
                    "id" to "$blogId",
                )
                map["$blogId"] = blog
            }
    }

    return map.toMap()
}