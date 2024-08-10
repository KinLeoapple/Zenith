package moe.zenith.util.validation

import java.lang.Double.parseDouble
import java.lang.Integer.parseInt

fun isInt(num: String): Boolean {
    var numeric = true

    try {
        val n = parseInt(num)
    } catch (e: NumberFormatException) {
        numeric = false
    }

    return numeric
}

fun isDouble(num: String): Boolean {
    var numeric = true

    try {
        val n = parseDouble(num)
    } catch (e: NumberFormatException) {
        numeric = false
    }

    return numeric
}

fun isNull(str: String?): Boolean {
    str?.let {
        val s = it.trim()
        return s.equals("null", true)
    }
    return false
}

fun isUndefined(str: String?): Boolean {
    str?.let {
        val s = it.trim()
        return s.equals("undefined", true)
    }
    return false
}

fun isStringInLength(str: String?, length: Int, trim: Boolean = false): Boolean {
    str?.let {
        val s = when (trim) {
            true -> it.trim()
            false -> it
        }
        return s.length <= length
    }
    return false
}