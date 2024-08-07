package moe.zenith.plugins.sqlite.database.relation

import org.ktorm.schema.Table
import org.ktorm.schema.datetime
import org.ktorm.schema.long
import org.ktorm.schema.varchar

private val TABLE_NAME by lazy { "draft" }

data object Draft: Table<Nothing>(TABLE_NAME) {
    val draftId = long("draft_id").primaryKey()
    val userId = long("user_id")
    val draftUpdateDt = datetime("draft_update_dt")
    val draftPath = varchar("draft_path")
    val draftTitle = varchar("draft_title")
}

private val sql: String by lazy {
    """
    CREATE TABLE IF NOT EXISTS `$TABLE_NAME` (
          `draft_id` BIGINT NOT NULL,
           `user_id` BIGINT NOT NULL,
          `draft_update_dt` DATETIME NOT NULL,
          `draft_path` VARCHAR(100) NOT NULL,
          `draft_title` VARCHAR(100) NOT NULL,
          PRIMARY KEY (`draft_id`),
          FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`));
          CREATE UNIQUE INDEX IF NOT EXISTS `idx_$TABLE_NAME` ON `$TABLE_NAME` (draft_id);
""".trimIndent()
}

fun createDraft():String {
    return sql
}