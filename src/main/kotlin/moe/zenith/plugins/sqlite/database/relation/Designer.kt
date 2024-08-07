package moe.zenith.plugins.sqlite.database.relation

import org.ktorm.schema.Table
import org.ktorm.schema.long
import org.ktorm.schema.varchar

private val TABLE_NAME by lazy { "designer" }

data object Designer: Table<Nothing>(TABLE_NAME) {
    val desiId = long("desi_id").primaryKey()
    val desiName = varchar("desi_name")
    val desiPage = varchar("desi_page")
}

private val sql: String by lazy {
    """
    CREATE TABLE IF NOT EXISTS `$TABLE_NAME` (
      `desi_id` BIGINT NOT NULL DEFAULT 0,
      `desi_name` VARCHAR(30) NOT NULL,
      `desi_page` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`desi_id`));
    CREATE UNIQUE INDEX IF NOT EXISTS `idx_$TABLE_NAME` ON `$TABLE_NAME` (desi_id);
""".trimIndent()
}

fun createDesigner(): String {
    return sql
}