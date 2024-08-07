package moe.zenith.plugins

import io.ktor.server.application.*
import io.ktor.server.sessions.*
import moe.zenith.dataclass.SessionData
import moe.zenith.util.generateSecretKey

fun Application.configureSessions() {
    install(Sessions) {
        val secretSignKey = generateSecretKey()
        cookie<SessionData>("session", SessionStorageMemory()) {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 60 * 60
            transform(SessionTransportTransformerMessageAuthentication(secretSignKey))
        }
    }
}