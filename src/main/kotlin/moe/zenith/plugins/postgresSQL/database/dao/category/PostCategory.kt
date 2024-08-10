package moe.zenith.plugins.postgresSQL.database.dao.category

import com.google.gson.Gson
import moe.zenith.dataclass.category.CategoryData
import moe.zenith.plugins.postgresSQL.database.relation.Category
import moe.zenith.util.generateId
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

/**
 * Return a map of the post category result which contains category id.
 *
 * @param json The json containers the information.
 * @param id The id of the category.
 * @return A map of the post category result.
 */
fun postCategory(json: String, id: Long?): Map<String, String?> {
    try {
        val dataClass: CategoryData = Gson().fromJson(json, CategoryData::class.java)

        if (dataClass.categoryName != "null" && dataClass.categoryName.trimIndent().isNotEmpty()) {
            val newId = generateId(id) // get id or generate id

            // store to database
            try {
                transaction {
                    Category.insert {
                        it[catId] = newId
                        it[catName] = dataClass.categoryName
                    }
                }
            } catch (e: Exception) {
                val count = transaction {
                    Category.select(Category.catName eq dataClass.categoryName).count()
                }
                when (count <= 0) {
                    true -> return mapOf("posted" to null)
                    false -> transaction {
                        Category.update({ Category.catId eq newId }) {
                            it[catName] = dataClass.categoryName
                        }
                    }
                }
            }
            return mapOf("posted" to "$newId")
        } else
            return mapOf("posted" to null)
    } catch (e: Exception) {
        return mapOf("posted" to null)
    }
}