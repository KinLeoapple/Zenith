package moe.zenith.plugins.postgresSQL

import io.ktor.server.application.*
import moe.zenith.plugins.postgresSQL.database.database
import moe.zenith.plugins.postgresSQL.database.relation.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Application.configurePostgresSQL() {
    database().connection
    transaction {
        SchemaUtils.createMissingTablesAndColumns(User)
        SchemaUtils.createMissingTablesAndColumns(Blog)
        SchemaUtils.createMissingTablesAndColumns(Draft)
        SchemaUtils.createMissingTablesAndColumns(Category)
        SchemaUtils.createMissingTablesAndColumns(Image)
    }
}