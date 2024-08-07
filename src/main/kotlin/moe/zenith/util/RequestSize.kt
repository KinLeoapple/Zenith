package moe.zenith.util

import io.ktor.server.application.*
import moe.zenith.util.validation.isInt

fun requestSize(call: ApplicationCall): Int {
    val sizePar = call.request.queryParameters["size"]
    var size = 5
    sizePar?.let {
        if (isInt(it)) {
            size = it.toInt()
        }
    }
    return size
}