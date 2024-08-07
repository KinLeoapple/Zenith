package moe.zenith.plugins.sqlite.database

import io.ktor.server.application.*
import org.ktorm.logging.LogLevel

data class DatabaseConfig(
    val driverClassName: String,    // 驱动的类名
    val url: String,                // jdbc url
    val initialSize: Int = 10,      // 默认连接数
    val maxActive: Int = 25,        // 最大连接数
    val maxWait: Long = 3000,       // 最大等待时间
    val testWhileIdle: Boolean = true, // 检测池中连接的可用性
    val validationQuery: String = "SELECT 1", // 测试数据库连接
    val logLevel: LogLevel = LogLevel.ERROR // 输出的日志级别
)

fun Application.configureDatabase(): DatabaseConfig {
    val url = environment.config.propertyOrNull("ktorm.sqlite.url")?.getString() ?: "jdbc:sqlite:./memo.db"
    val driver = environment.config.propertyOrNull("ktorm.sqlite.driver")?.getString() ?: "org.sqlite.JDBC"

    val databaseConfig by lazy {
        DatabaseConfig(
            driverClassName = driver,
            url = url
        )
    }
    return databaseConfig
}
