package moe.zenith.plugins

import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun Application.configureResources() {
    routing {
        staticResources("/", "/static") {
            preCompressed(CompressedFileType.BROTLI, CompressedFileType.GZIP)
        }
        singlePageApplication{
            vue("/static")
        }
    }
}
