package moe.zenith.plugins.sqlite.database.relation

import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import org.ktorm.schema.varchar

private val TABLE_NAME by lazy { "img" }

data object Image : Table<Nothing>(TABLE_NAME) {
    val imgId = long("img_id").primaryKey()
    val imgPubDt = datetime("img_pub_dt")
    val imgPath = varchar("img_path")
    val imgHash = varchar("img_hash")
}

private val sql: String by lazy {
    """
    CREATE TABLE IF NOT EXISTS `$TABLE_NAME` (
        `img_id` BIGINT NOT NULL,
        `img_pub_dt` DATETIME NOT NULL,
        `img_path` VARCHAR(100) NOT NULL,
        `img_hash` VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (`img_id`));
    CREATE UNIQUE INDEX IF NOT EXISTS `idx_$TABLE_NAME` ON `$TABLE_NAME` (img_id);
""".trimIndent()
}

fun createImage(): String {
    return sql
}