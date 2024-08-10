package moe.zenith.plugins.postgresSQL.database.dao.blog

import com.google.gson.Gson
import kotlinx.datetime.toKotlinLocalDateTime
import moe.zenith.dataclass.PostBlogData
import moe.zenith.plugins.postgresSQL.database.dao.draft.deleteDraft
import moe.zenith.plugins.postgresSQL.database.relation.Blog
import moe.zenith.util.generateId
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import java.io.File
import java.time.LocalDateTime

/**
 * Return a map of the post blog result which contains blog id.
 *
 * @param json The json containers the information.
 * @param id The id of the blog.
 * @return A map of the post blog result.
 */
fun postBlog(json: String, id: Long?): Map<String, String?> {
    try {
        val dataClass: PostBlogData = Gson().fromJson(json, PostBlogData::class.java)

        if (dataClass.blog != "null" && dataClass.blog.trimIndent().isNotEmpty()) {
            val newId = generateId(id) // get id or generate id
            // save to file
            val saveTo = File("./blog/$newId")
            saveTo.parentFile.mkdirs()
            if (!saveTo.exists()) {
                saveTo.createNewFile()
            }
            saveTo.writeText(dataClass.blog) // write to file

            // store to database
            transaction {
                try {
                    Blog.insert {
                        it[blogId] = newId
                        it[catId] = dataClass.catId.toLong()
                        it[blogPubDt] = LocalDateTime.now().toKotlinLocalDateTime()
                        it[blogPath] = saveTo.path
                        it[blogTitle] = dataClass.title
                        it[blogDescription] = dataClass.blogDes
                    }
                } catch (e: Exception) {
                    Blog.update({ Blog.blogId eq newId }) {
                        it[catId] = dataClass.catId.toLong()
                        it[blogPubDt] = LocalDateTime.now().toKotlinLocalDateTime()
                        it[blogPath] = saveTo.path
                        it[blogTitle] = dataClass.title
                        it[blogDescription] = dataClass.blogDes
                    }
                }
            }

            // try to delete draft of this blog
            val draftId = """
                {
                    "draft_id": $newId
                }
            """.trimIndent()
            deleteDraft(draftId)

            return mapOf("saved" to "$newId")
        } else
            return mapOf("saved" to null)
    } catch (e: Exception) {
        return mapOf("saved" to null)
    }
}