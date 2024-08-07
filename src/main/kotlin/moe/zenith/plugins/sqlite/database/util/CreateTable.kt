package moe.zenith.plugins.sqlite.database.util

import java.sql.Connection

fun createTable(sql: String, conn: Connection?) {
    val statement by lazy { conn?.createStatement() }
    sql.split(";\n").forEach {
        statement?.executeUpdate(it)
    }
}