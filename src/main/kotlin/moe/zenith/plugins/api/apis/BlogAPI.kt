package moe.zenith.plugins.api.apis

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.postgresSQL.database.dao.blog.*
import moe.zenith.util.security.verifyToken
import moe.zenith.util.validation.isNull
import moe.zenith.util.validation.isUndefined

fun Application.blogAPI() {
    routing {
        authenticate {
            post("/blog/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    val id = call.parameters["id"]?.toLongOrNull()
                    val json = call.receiveText()
                    call.respond(postBlog(json, id))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            delete("/blog") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    val json = call.receiveText()
                    call.respond(deleteBlog(json))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }
        }

        get("/blog/total") {
            call.respond(getBolgTotal())
        }

        get("/blog/{userId}/{id}") {
            val userId = call.parameters["userId"]
            val id = call.parameters["id"]
            if (!isNull(userId) && !isUndefined(userId)) {
                userId?.let { uid ->
                    if (isNull(id)) {
                        call.respond(getBlogAll(uid.toLong(), call))
                    } else
                        id?.let {
                            call.respond(getBlog(uid.toLong(), it.toLong()))
                        }
                }
            }
        }

        get("/blog/content/{id}") {
            val id = call.parameters["id"]
            if (isNull(id))
                call.respond(getBlogContent(0))
            else
                id?.let {
                    call.respond(getBlogContent(it.toLong()))
                }
        }
    }
}