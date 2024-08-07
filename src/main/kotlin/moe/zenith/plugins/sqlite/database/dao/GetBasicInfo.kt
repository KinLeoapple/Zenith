package moe.zenith.plugins.sqlite.database.dao

import io.ktor.server.auth.jwt.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.dao.user.getUser
import moe.zenith.plugins.sqlite.database.relation.Designer
import org.ktorm.dsl.*

/**
 * Return a map of some basic information, such as user's name.
 *
 * @param database The database which wish to search.
 * @return A map of basic information.
 */
fun getBasicInfo(database: Database, id: Long): Map<String, String?> {
    var userName: String? = null
    var quote: String? = null
    var quoteName: String? = null
    var designerName: String? = null
    var designerPage: String? = null

    getUser(database, id).forEach {
        when (it.key) {
            "name" -> userName = it.value
            "quote" -> quote = it.value
            "quote_name" -> quoteName = it.value
        }
    }

    var result = database.getConnection().from(Designer)
        .select(Designer.desiName)
        .where(Designer.desiId eq 0)
    result.forEach {
        designerName = it[Designer.desiName]
    }

    result = database.getConnection().from(Designer)
        .select(Designer.desiPage)
        .where(Designer.desiId eq 0)
    result.forEach {
        designerPage = it[Designer.desiPage]
    }

    return mapOf(
        "name" to userName,
        "quote" to quote,
        "quote_name" to quoteName,
        "desi_name" to designerName,
        "desi_page" to designerPage
    )
}