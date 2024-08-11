package moe.zenith.plugins.postgresSQL.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.jetbrains.exposed.sql.*

private data object Hikari {
    val jdbcUrl by lazy { "jdbc:postgresql://localhost:5432/zenith" }
    val driverClassName by lazy { "org.postgresql.Driver" }
    val username by lazy { "postgres" }
    val password by lazy { "123456" }
    val isReadOnly by lazy { false }
    val transactionIsolation by lazy { "TRANSACTION_SERIALIZABLE" }
}

private object DatabaseSetting {
    val config by lazy {
        HikariConfig().apply {
            jdbcUrl = Hikari.jdbcUrl
            driverClassName = Hikari.driverClassName
            username = Hikari.username
            password = Hikari.password
            isReadOnly = Hikari.isReadOnly
            transactionIsolation = Hikari.transactionIsolation
        }
    }
}

fun database(): HikariDataSource {
    val dataSource = HikariDataSource(DatabaseSetting.config)
    Database.connect(
        datasource = dataSource,
    )

    return dataSource
}
