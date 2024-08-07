package moe.zenith.plugins.sqlite

import io.ktor.server.application.*
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.configureDatabase
import moe.zenith.plugins.sqlite.database.relation.*
import moe.zenith.plugins.sqlite.database.util.createTable

fun Application.configureSQLite() {
    val sqlList: List<String> by lazy {
        listOf(
            createImage(),
            createQuote(),
            createUser(),
            createCategory(),
            createDraft(),
            createBlog(),
            createDesigner()
        )
    }

    val database by lazy { Database(configureDatabase()) }
    sqlList.forEach { sql ->
        val conn = database.nativeConnect()
        createTable(sql, conn)
        conn?.close()
    }
}