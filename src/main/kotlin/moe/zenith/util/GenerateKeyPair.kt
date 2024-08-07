package moe.zenith.util

import cn.hutool.crypto.asymmetric.RSA

fun generateKeyPair(): Pair<String, String> {
    val rsa = RSA()
    val publicKey = rsa.publicKeyBase64
    val privateKey = rsa.privateKeyBase64
    return Pair(publicKey, privateKey)
}