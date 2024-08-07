package moe.zenith.util

import io.ktor.server.application.*
import moe.zenith.util.validation.isInt

fun requestOffset(call: ApplicationCall): Int {
    val offsetPar = call.request.queryParameters["offset"]
    var offset = 0
    offsetPar?.let {
        if (isInt(it)) {
            offset = it.toInt()
        }
    }
    return offset
}