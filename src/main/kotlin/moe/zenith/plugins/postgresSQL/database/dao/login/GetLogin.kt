package moe.zenith.plugins.postgresSQL.database.dao.login

import cn.hutool.crypto.asymmetric.KeyType
import cn.hutool.crypto.asymmetric.RSA
import com.google.gson.Gson
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.sessions.*
import moe.zenith.dataclass.LoginData
import moe.zenith.dataclass.SessionData
import moe.zenith.plugins.jwt.auth.Auth
import moe.zenith.plugins.postgresSQL.database.relation.User
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

/**
 * Return a map of the login result.
 *
 * @param json The json containers the information.
 * @param call The ApplicationCall.
 * @return A map of the login result.
 */
fun getLogin(json: String, call: ApplicationCall): Map<String, String?> {
    var userId: Long? = null
    var pass: String? = null

    val dataClass: LoginData = Gson().fromJson(json, LoginData::class.java)

    var decryptPass: String? = null
    val sessionData = call.sessions.get<SessionData>()

    sessionData?.let {
        val privateKey = it.privateKey
        val publicKey = it.publicKey
        val rsa = RSA(privateKey, publicKey)
        decryptPass = rsa.decryptStr(dataClass.password, KeyType.PrivateKey);
    }
    transaction {
        User.select(User.userId, User.userPassword)
            .where(User.userName eq dataClass.username)
            .forEach{
                userId = it[User.userId]
                pass = it[User.userPassword]
            }
    }

    // if it can decrypt the password
    if (decryptPass != null) {
        val checkpw = pass == decryptPass

        return when (checkpw) {
            true -> {
                val ua = call.request.headers["User-Agent"]
                ua?.let {
                    val token = Auth.sign(dataClass.username, call.request.origin.remoteHost, it)
                    return mapOf(
                        "id" to "$userId",
                        "login" to token
                    )
                }
                mapOf(
                    "login" to null,
                    "msg" to "Invalid user agent"
                )
            }

            false -> mapOf(
                "login" to null,
                "msg" to "Incorrect username or password"
            )
        }
    } else
        return mapOf(
            "login" to null,
            "msg" to "Error"
        )
}