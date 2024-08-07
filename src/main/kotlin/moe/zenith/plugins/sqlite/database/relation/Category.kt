package moe.zenith.plugins.sqlite.database.relation

import org.ktorm.schema.Table
import org.ktorm.schema.long
import org.ktorm.schema.varchar

private val TABLE_NAME by lazy { "category" }

data object Category : Table<Nothing>(TABLE_NAME) {
    val catId = long("cat_id").primaryKey()
    val catName = varchar("cat_name")
}

private val sql: String by lazy {
    """
    CREATE TABLE IF NOT EXISTS `$TABLE_NAME` (
        `cat_id` BIGINT NOT NULL,
        `cat_name` VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY (`cat_id`));
    CREATE UNIQUE INDEX IF NOT EXISTS `idx_$TABLE_NAME` ON `$TABLE_NAME` (cat_id);
""".trimIndent()
}

fun createCategory(): String {
    return sql
}