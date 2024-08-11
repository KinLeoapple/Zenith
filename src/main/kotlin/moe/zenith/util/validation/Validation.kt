package moe.zenith.util.validation

import java.io.ByteArrayOutputStream
import java.io.IOException
import java.io.InputStream
import java.lang.Double.parseDouble
import java.lang.Integer.parseInt


fun isInt(num: String): Boolean {
    var numeric = true

    try {
        parseInt(num)
    } catch (e: NumberFormatException) {
        numeric = false
    }

    return numeric
}

fun isDouble(num: String): Boolean {
    var numeric = true

    try {
        parseDouble(num)
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

fun isNumberInRange(num: Int, min: Int, max: Int): Boolean {
    return num in min..max
}

fun isStringInLength(str: String?, min: Int, max: Int, trim: Boolean = false): Boolean {
    str?.let {
        val s = when (trim) {
            true -> it.trim()
            false -> it
        }
        return isNumberInRange(s.length, min, max)
    }
    return false
}

fun isByteInSize(inputStream: InputStream, size: Long): Boolean {
    val outStream = ByteArrayOutputStream()
    val buffer = ByteArray(1024)
    var length: Int
    var isInSize = true
    try {
        while ((inputStream.read(buffer).also { length = it }) != -1) {
            if (length >= size) {
                isInSize = false
                break
            }
            outStream.write(buffer, 0, length)
        }
    } catch (e: IOException) {
        return false
    }
    return isInSize
}