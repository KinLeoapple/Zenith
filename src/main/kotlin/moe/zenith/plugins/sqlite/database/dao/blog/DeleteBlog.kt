package moe.zenith.plugins.sqlite.database.dao.blog

import com.google.gson.Gson
import moe.zenith.dataclass.DeleteBlogData
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Blog
import org.ktorm.dsl.delete
import org.ktorm.dsl.eq
import java.io.File

/**
 * Return a map of the delete blog result.
 *
 * @param database The database which wish to search.
 * @param json The json containers the information.
 * @return A map of the delete blog result.
 */
fun deleteBlog(database: Database, json: String): Map<String, Boolean> {
    val dataClass: DeleteBlogData = Gson().fromJson(json, DeleteBlogData::class.java)

    // delete the information in database anyway.
    database.getConnection().delete(Blog) {
        it.blogId eq dataClass.blogId.toLong()
    }
    // try to delete file
    val blogFile = File("./blog/${dataClass.blogId}")
    blogFile.delete()
    return mapOf("deleted" to true)
}