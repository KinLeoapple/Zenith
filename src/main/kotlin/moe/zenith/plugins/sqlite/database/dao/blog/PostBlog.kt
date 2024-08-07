package moe.zenith.plugins.sqlite.database.dao.blog

import com.google.gson.Gson
import moe.zenith.dataclass.PostBlogData
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.dao.draft.deleteDraft
import moe.zenith.plugins.sqlite.database.relation.Blog
import moe.zenith.util.generateId
import org.ktorm.dsl.eq
import org.ktorm.dsl.insert
import org.ktorm.dsl.update
import java.io.File
import java.time.LocalDateTime

/**
 * Return a map of the post blog result which contains blog id.
 *
 * @param database The database which wish to search.
 * @param json The json containers the information.
 * @param id The id of the blog.
 * @return A map of the post blog result.
 */
fun postBlog(database: Database, json: String, id: Long?): Map<String, String?> {
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
            try {
                database.getConnection().insert(Blog) {
                    set(it.blogId, newId)
                    set(it.catId, dataClass.catId.toLong())
                    set(it.blogPubDt, LocalDateTime.now())
                    set(it.blogPath, saveTo.path)
                    set(it.blogTitle, dataClass.title)
                    set(it.blogDes, dataClass.blogDes)
                }
            } catch (e: Exception) {
                database.getConnection().update(Blog) {
                    set(it.catId, dataClass.catId.toLong())
                    set(it.blogPubDt, LocalDateTime.now())
                    set(it.blogPath, saveTo.path)
                    set(it.blogTitle, dataClass.title)
                    set(it.blogDes, dataClass.blogDes)
                    where {
                        it.blogId eq newId
                    }
                }
            }

            // try to delete draft of this blog
            val draftId = """
                {
                    "draft_id": $newId
                }
            """.trimIndent()
            deleteDraft(database, draftId)

            return mapOf("saved" to "$newId")
        } else
            return mapOf("saved" to null)
    } catch (e: Exception) {
        return mapOf("saved" to null)
    }
}