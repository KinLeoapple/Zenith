package moe.zenith.plugins.api.apis

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.postgresSQL.database.dao.draft.*
import moe.zenith.util.security.verifyToken
import moe.zenith.util.validation.isNull
import moe.zenith.util.validation.isUndefined

fun Application.draftAPI() {
    routing {
        authenticate {
            get("/blog/draft/content/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    val id = call.parameters["id"]
                    if (isNull(id))
                        call.respond(getDraftContent(0))
                    else
                        id?.let {
                            call.respond(getDraftContent(it.toLong()))
                        }
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            get("/blog/draft/{userId}/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    val userId = call.parameters["userId"]
                    val id = call.parameters["id"]
                    if (!isNull(userId) && !isUndefined(userId)) {
                        userId?.let { uid ->
                            if (isNull(id))
                                call.respond(getDraftAll(uid.toLong(), call))
                            else
                                id?.let {
                                    call.respond(getDraft(uid.toLong(), it.toLong()))
                                }
                        }
                    }
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            get("/blog/draft/total") {
                call.respond(getDraftTotal())
            }

            post("/blog/draft/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    val id = call.parameters["id"]?.toLongOrNull()
                    val json = call.receiveText()
                    call.respond(postDraft(json, id))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            delete("/blog/draft") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(it, call) } == true) {
                    val json = call.receiveText()
                    call.respond(deleteDraft(json))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }
        }
    }
}