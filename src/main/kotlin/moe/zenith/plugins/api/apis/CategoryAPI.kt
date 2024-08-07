package moe.zenith.plugins.api.apis

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.dao.category.*
import moe.zenith.util.security.verifyToken
import moe.zenith.util.validation.isNull

fun Application.categoryAPI(database: Database) {
    routing {
        authenticate {
            post("/cat/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(database, it, call) } == true) {
                    val id = call.parameters["id"]?.toLongOrNull()
                    val json = call.receiveText()
                    call.respond(postCategory(database, json, id))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }
        }

        get("/cat/{id}") {
            val id = call.parameters["id"]
            if (isNull(id))
                call.respond(getCategoryAll(database))
            else
                id?.let {
                    call.respond(getCategory(database, it.toLong()))
                }
        }

        get("/cat/number/{id}") {
            val id = call.parameters["id"]
            if (isNull(id)) {
                call.respond(getBlogNumOfCategory(database, 0))
            } else {
                id?.let {
                    call.respond(getBlogNumOfCategory(database, it.toLong()))
                }
            }
        }
    }
}