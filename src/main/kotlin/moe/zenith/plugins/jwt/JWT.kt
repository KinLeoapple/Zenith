package moe.zenith.plugins.jwt

import io.ktor.server.application.*
import moe.zenith.plugins.jwt.auth.Auth
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*

fun Application.configureJWT() {
    val verifier = Auth.makeJwtVerifier()

    install(Authentication) {
        jwt {
            verifier(verifier)
            validate {
                JWTPrincipal(it.payload)
            }
        }
    }
}