package moe.zenith.plugins.postgresSQL.database.dao.user

import moe.zenith.plugins.postgresSQL.database.relation.User
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the user information.
 *
 * @return A map of the user information.
 */
fun getUser(id: Long): Map<String, String?> {
    var name: String? = null
    var description: String? = null

    transaction {
        User.select(User.userId, User.userName, User.description)
            .where { User.userId eq id }
            .forEach {
                name = it[User.userName]
                description = it[User.description]
            }
    }

    return mapOf(
        "name" to name,
        "desc" to description
    )
}