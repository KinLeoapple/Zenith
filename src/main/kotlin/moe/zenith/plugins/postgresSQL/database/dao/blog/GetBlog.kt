package moe.zenith.plugins.postgresSQL.database.dao.blog

import moe.zenith.plugins.postgresSQL.database.dao.category.getCategory
import moe.zenith.plugins.postgresSQL.database.relation.Blog
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the blog information.
 *
 * @param userId The ID of the user.
 * @param id The id of the blog.
 * @return A map of the blog information.
 */
fun getBlog(userId: Long, id: Long): Map<String, String?> {
    var title: String? = null
    var desc: String? = null
    var date: String? = null
    var catId: Long? = null
    var category: String? = null

    transaction {
        Blog.select(Blog.blogTitle, Blog.blogDescription, Blog.blogPubDt, Blog.catId)
            .where { Blog.userId eq userId }
            .where(Blog.blogId eq id)
            .forEach {
                title = it[Blog.blogTitle]
                desc = it[Blog.blogDescription]
                date = it[Blog.blogPubDt].time.toMillisecondOfDay().toString()
                catId = it[Blog.catId]
            }
    }

    catId?.let {
        category = getCategory(it)["catName"]
    }

    return mapOf(
        "id" to id.toString(),
        "title" to title,
        "desc" to desc,
        "date" to date,
        "category" to category
    )
}