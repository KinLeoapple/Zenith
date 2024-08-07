package moe.zenith.util

import java.security.SecureRandom

fun generateSecretKey(): ByteArray {
    val secureRandom = SecureRandom()
    val random = (Math.random() * 10).toInt()
    val secretKey = secureRandom.generateSeed(random)
    return secretKey
}