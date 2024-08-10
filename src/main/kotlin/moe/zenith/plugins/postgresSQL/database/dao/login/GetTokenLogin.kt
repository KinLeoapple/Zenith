package moe.zenith.plugins.postgresSQL.database.dao.login

import io.ktor.server.application.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.*
import moe.zenith.plugins.jwt.auth.Auth
import moe.zenith.plugins.postgresSQL.database.relation.User
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the token login result.
 *
 * @param call The ApplicationCall.
 * @return A map of the token login result.
 */
fun getTokenLogin(token: JWTPrincipal, call: ApplicationCall): Map<String, String?> {
    val ua = call.request.headers["User-Agent"]
    ua?.let { s ->
        val username = token["name"]
        if (username != null) {
            var userId: Long? = null
            transaction {
                User.select(User.userId)
                    .where(User.userName eq username)
                    .forEach {
                        userId = it[User.userId]
                    }
            }

            val newToken = Auth.sign(username, call.request.origin.remoteHost, s)
            return mapOf(
                "id" to "$userId",
                "login" to newToken
            )
        } else
            return mapOf("login" to null)
    }
    return mapOf("login" to null)
}