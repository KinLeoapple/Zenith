package moe.zenith.util

import java.math.BigInteger
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException


fun md5(str: String): String {
    val md5 = MessageDigest.getInstance("MD5").digest(str.toByteArray())
    val s = BigInteger(1, md5).toString(32)
    return s
}

fun md5(data: ByteArray): String {
    val md5 = MessageDigest.getInstance("MD5").digest(data)
    val s = BigInteger(1, md5).toString(32)
    return s
}