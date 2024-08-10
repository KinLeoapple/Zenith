package moe.zenith.plugins.postgresSQL.database.relation

import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.kotlin.datetime.datetime


object Draft: Table("draft") {
    val draftId = long("draft_id")
    val userId = reference(
        "user_id",
        User.userId,
        onDelete = ReferenceOption.SET_NULL,
        onUpdate = ReferenceOption.CASCADE
    )
    val draftUpdateDt = datetime("draft_update_dt")
    val draftPath = varchar("draft_path", 100)
    val draftTitle = varchar("draft_title", 100)

    override val primaryKey = PrimaryKey(draftId)
}