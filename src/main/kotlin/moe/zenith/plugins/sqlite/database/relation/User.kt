package moe.zenith.plugins.sqlite.database.relation

import org.ktorm.schema.Table
import org.ktorm.schema.long
import org.ktorm.schema.varchar

private val TABLE_NAME by lazy { "user" }

data object User : Table<Nothing>(TABLE_NAME) {
    val userId = long("user_id").primaryKey()
    val quoteId = long("quote_id")
    val userName = varchar("user_name")
    val userPassword = varchar("user_password")
}

private val sql: String by lazy {
    """
    CREATE TABLE IF NOT EXISTS `$TABLE_NAME` (
        `user_id` BIGINT NOT NULL DEFAULT 0, 
        `quote_id` BIGINT NOT NULL DEFAULT 0,
        `user_name` VARCHAR(30) UNIQUE NOT NULL,
        `user_password` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`user_id`)
    FOREIGN KEY (`quote_id`) REFERENCES `quote` (`quote_id`));
    CREATE UNIQUE INDEX IF NOT EXISTS `idx_$TABLE_NAME` ON `$TABLE_NAME` (user_id);
""".trimIndent()
}

fun createUser(): String {
    return sql
}
