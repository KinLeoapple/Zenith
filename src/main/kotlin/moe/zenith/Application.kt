package moe.zenith

import io.ktor.server.application.*
import io.ktor.server.netty.*
import moe.zenith.plugins.*
import moe.zenith.plugins.api.configureAPI
import moe.zenith.plugins.jwt.configureJWT
import moe.zenith.plugins.postgresSQL.configurePostgresSQL


fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    configureSessions()
    configureJWT()
    configureIdGenerator()
    configurePostgresSQL()
    configureSerialization()
    configureHTTP()
    configureResources()
    configureAPI()
    configureSwagger()
}
