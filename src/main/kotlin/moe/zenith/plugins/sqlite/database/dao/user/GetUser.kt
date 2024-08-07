package moe.zenith.plugins.sqlite.database.dao.user

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Quote
import moe.zenith.plugins.sqlite.database.relation.User
import org.ktorm.dsl.*

/**
 * Return a map of the user information.
 *
 * @param database The database which wish to search.
 * @return A map of the user information.
 */
fun getUser(database: Database, id: Long): Map<String, String?> {
    var name: String? = null
    var quoteId: Long? = 0
    var quote: String? = null
    var quoteName: String? = null

    var result = database.getConnection().from(User)
        .select(User.userName, User.quoteId)
        .where(User.userId eq id)
    result.forEach {
        name = it[User.userName]
        quoteId = it[User.quoteId]
    }

    quoteId?.let { i ->
        result = database.getConnection().from(Quote)
            .select(Quote.quoteText, Quote.quoteName)
            .where(Quote.quoteId eq i)
        result.forEach {
            quote = it[Quote.quoteText]
            quoteName = it[Quote.quoteName]
        }
    }

    return mapOf(
        "name" to name,
        "quote" to quote,
        "quote_name" to quoteName,
    )
}