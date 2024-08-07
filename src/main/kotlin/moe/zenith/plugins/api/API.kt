package moe.zenith.plugins.api

import io.ktor.server.application.*
import moe.zenith.plugins.api.apis.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.configureDatabase

fun Application.configureAPI() {
    val database = Database(configureDatabase())
    database.invoke()

    api(database)
    blogAPI(database)
    categoryAPI(database)
    draftAPI(database)
    imgAPI(database)
    searchApi(database)
    rsaKeyAPI()
}