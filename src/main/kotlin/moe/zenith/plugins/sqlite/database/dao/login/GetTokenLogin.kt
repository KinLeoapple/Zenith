package moe.zenith.plugins.sqlite.database.dao.login

import io.ktor.server.application.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.*
import moe.zenith.plugins.jwt.auth.Auth
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.User
import org.ktorm.dsl.*

/**
 * Return a map of the token login result.
 *
 * @param call The ApplicationCall.
 * @return A map of the token login result.
 */
fun getTokenLogin(database: Database, token: JWTPrincipal,  call: ApplicationCall): Map<String, String?> {
    val ua = call.request.headers["User-Agent"]
    ua?.let { s ->
        val username = token["name"]
        if (username != null) {
            var userId: Long? = null
            val result = database.getConnection().from(User)
                .select(User.userId)
                .where(User.userName eq username)
            result.forEach {
                userId = it[User.userId]
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