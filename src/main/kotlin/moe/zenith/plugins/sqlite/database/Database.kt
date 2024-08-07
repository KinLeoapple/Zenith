package moe.zenith.plugins.sqlite.database

import com.alibaba.druid.pool.DruidDataSourceFactory
import org.ktorm.database.Database
import org.ktorm.logging.ConsoleLogger
import java.sql.Connection
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import javax.sql.DataSource

open class Database(private val config: DatabaseConfig) {
    private lateinit var connection: Database
    private lateinit var dataSource: DataSource

    fun getConnection(): Database {
        return connection;
    }

    fun invoke() {
        val prop = Properties()
        config.javaClass.declaredFields.forEach {
            prop[it.name] = "${it.apply { isAccessible = true }.get(config)}"
        }
        dataSource = DruidDataSourceFactory.createDataSource(prop)

        connection = Database.connect(
            dataSource = dataSource,
            logger = ConsoleLogger(config.logLevel)
        )
    }

    fun nativeConnect() : Connection? {
        var conn: Connection? = null
        try {
            Class.forName(config.driverClassName)

            conn = DriverManager.getConnection(
                config.url
            )
        } catch (e: ClassNotFoundException) {
            e.printStackTrace()
        } catch (e: SQLException) {
            e.printStackTrace()
        }
        return conn
    }
}