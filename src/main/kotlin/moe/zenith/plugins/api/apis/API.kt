package moe.zenith.plugins.api.apis

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.dao.getBasicInfo
import moe.zenith.plugins.sqlite.database.dao.login.getLogin
import moe.zenith.plugins.sqlite.database.dao.login.getTokenLogin
import moe.zenith.util.security.verifyToken

fun Application.api(database: Database) {
    routing {
        authenticate {
            post("/login/token") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(database, it, call) } == true) {
                    call.respond(getTokenLogin(database, token, call))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }
        }

        get("/basic_info/{id}") {
            val id = call.parameters["id"]
            id?.let {
                call.respond(getBasicInfo(database, it.toLong()))
            }
            call.respond(getBasicInfo(database, -1))
        }

        post("/login") {
            val json = call.receiveText()
            call.respond(getLogin(database, json, call))
        }
    }
}