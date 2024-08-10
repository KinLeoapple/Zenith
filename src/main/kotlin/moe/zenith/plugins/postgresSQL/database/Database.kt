package moe.zenith.plugins.postgresSQL.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.jetbrains.exposed.sql.*

object DatabaseSetting {
    val config by lazy {
        HikariConfig().apply {
            jdbcUrl = "jdbc:postgresql://localhost:5432/zenith"
            driverClassName = "org.postgresql.Driver"
            username = "postgres"
            password = "123456"
            isReadOnly = false
            transactionIsolation = "TRANSACTION_SERIALIZABLE"
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
