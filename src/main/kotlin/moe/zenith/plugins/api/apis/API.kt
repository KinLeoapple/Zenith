package moe.zenith.plugins.api.apis

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.postgresSQL.database.dao.login.getLogin
import moe.zenith.plugins.postgresSQL.database.dao.login.getTokenLogin
import moe.zenith.util.security.verifyToken

fun Application.api() {
    routing {
        authenticate {
            post("/login/token") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    call.respond(getTokenLogin(token, call))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }
        }

        post("/login") {
            val json = call.receiveText()
            call.respond(getLogin(json, call))
        }
    }
}