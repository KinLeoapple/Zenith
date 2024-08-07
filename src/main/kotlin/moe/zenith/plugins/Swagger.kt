package moe.zenith.plugins

import io.github.smiley4.ktorswaggerui.SwaggerUI
import io.ktor.server.application.*

fun Application.configureSwagger() {
    install(SwaggerUI) {
        swagger {
            swaggerUrl = "swagger-ui"
            forwardRoot = true
        }
        info {
            title = "Memo API"
            version = "latest"
            description = "Memo APIs"
        }
        server {
            url = "http://localhost:8080"
        }
    }
}
