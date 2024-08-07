package moe.zenith.util

import java.math.BigInteger
import java.security.MessageDigest

fun md5(str: String): String {
    val md5s = MessageDigest.getInstance("MD5").digest(str.toByteArray())
    val s = BigInteger(1, md5s).toString(16)
    return s
}