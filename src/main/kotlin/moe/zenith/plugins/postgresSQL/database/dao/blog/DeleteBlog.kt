package moe.zenith.plugins.postgresSQL.database.dao.blog

import com.google.gson.Gson
import moe.zenith.dataclass.DeleteBlogData
import moe.zenith.plugins.postgresSQL.database.relation.Blog
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

/**
 * Return a map of the delete blog result.
 *
 * @param json The json containers the information.
 * @return A map of the delete blog result.
 */
fun deleteBlog(json: String): Map<String, Boolean> {
    val dataClass: DeleteBlogData = Gson().fromJson(json, DeleteBlogData::class.java)

    // delete the information in database anyway.
    transaction {
        Blog.deleteWhere {
            blogId eq dataClass.blogId.toLong()
        }
    }
    // try to delete file
    val blogFile = File("./blog/${dataClass.blogId}")
    blogFile.delete()
    return mapOf("deleted" to true)
}