package moe.zenith.plugins.api.apis

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import moe.zenith.plugins.postgresSQL.database.dao.search.searchBlog

fun Application.searchAPI() {
    routing {
        get("/search/blog") {
            call.respond(searchBlog(call))
        }
    }
}