package moe.zenith.plugins.postgresSQL.database.relation

import org.jetbrains.exposed.sql.Table


object User : Table("user") {
    val userId = long("user_id").uniqueIndex()
    val description = varchar("user_desc", 500)
    val userName = varchar("user_name", 30)
    val userPassword = varchar("user_password", 40)

    override val primaryKey = PrimaryKey(userId)
}
