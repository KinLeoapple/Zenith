package moe.zenith

import io.ktor.server.application.*
import io.ktor.server.netty.*
import moe.zenith.plugins.*
import moe.zenith.plugins.api.configureAPI
import moe.zenith.plugins.jwt.configureJWT
import moe.zenith.plugins.sqlite.configureSQLite


fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    configureSessions()
    configureJWT()
    configureIdGenerator()
    configureSQLite()
    configureSerialization()
    configureHTTP()
    configureResources()
    configureAPI()
    configureSwagger()
}
