package moe.zenith.plugins.api.apis

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.dao.draft.*
import moe.zenith.util.security.verifyToken
import moe.zenith.util.validation.isNull
import moe.zenith.util.validation.isUndefined

fun Application.draftAPI(database: Database) {
    routing {
        authenticate {
            get("/blog/draft/content/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(database, it, call) } == true) {
                    val id = call.parameters["id"]
                    if (isNull(id))
                        call.respond(getDraftContent(database, 0))
                    else
                        id?.let {
                            call.respond(getDraftContent(database, it.toLong()))
                        }
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            get("/blog/draft/{userId}/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(database, it, call) } == true) {
                    val userId = call.parameters["userId"]
                    val id = call.parameters["id"]
                    if (!isNull(userId) && !isUndefined(userId)) {
                        userId?.let { uid ->
                            if (isNull(id))
                                call.respond(getDraftAll(database, uid.toLong(), call))
                            else
                                id?.let {
                                    call.respond(getDraft(database, uid.toLong(), it.toLong()))
                                }
                        }
                    }
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            get("/blog/draft/total") {
                call.respond(getDraftTotal(database))
            }

            post("/blog/draft/{id}") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(database, it, call) } == true) {
                    val id = call.parameters["id"]?.toLongOrNull()
                    val json = call.receiveText()
                    call.respond(postDraft(database, json, id))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }

            delete("/blog/draft") {
                val token = call.authentication.principal<JWTPrincipal>()
                if (token?.let { verifyToken(database, it, call) } == true) {
                    val json = call.receiveText()
                    call.respond(deleteDraft(database, json))
                } else
                    call.response.status(HttpStatusCode(401, "Invalid Token"))
            }
        }
    }
}