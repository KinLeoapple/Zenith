package moe.zenith.util

import com.github.yitter.idgen.YitIdHelper

fun generateId(id: Long?): Long {
    var identity: Long? = null
    id?.let {
        identity = if (it < 0)
            null
        else
            it
    }
    return identity ?: YitIdHelper.nextId()
}

fun generateId(): Long {
    return YitIdHelper.nextId()
}