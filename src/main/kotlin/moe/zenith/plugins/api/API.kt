package moe.zenith.plugins.api

import io.ktor.server.application.*
import moe.zenith.plugins.api.apis.*

fun Application.configureAPI() {
    api()
    userAPI()
    blogAPI()
    categoryAPI()
    draftAPI()
    imgAPI()
    searchAPI()
    rsaKeyAPI()
}