package moe.zenith.plugins.api.apis

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.postgresSQL.database.dao.user.getUser

fun Application.userAPI() {
    routing {
        get("/user/{id}") {
            val id = call.parameters["id"]
            id?.let {
                call.respond(getUser(it.toLong()))
            }
            call.respond(mapOf("msg" to null))
        }
    }
}