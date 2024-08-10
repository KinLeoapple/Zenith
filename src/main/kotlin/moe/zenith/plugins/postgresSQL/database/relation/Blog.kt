package moe.zenith.plugins.postgresSQL.database.relation

import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.kotlin.datetime.datetime


object Blog : Table("blog") {
    val blogId = long("blog_id").uniqueIndex()
    val catId = reference(
        "cat_id",
        Category.catId,
        onDelete = ReferenceOption.SET_NULL,
        onUpdate = ReferenceOption.CASCADE
    )
    val userId = reference(
        "user_id",
        User.userId,
        onDelete = ReferenceOption.SET_NULL,
        onUpdate = ReferenceOption.CASCADE
    )
    val blogPubDt = datetime("blog_pub_dt")
    val blogPath = varchar("blog_path", 100)
    val blogTitle = varchar("blog_title", 100)
    val blogDescription = varchar("blog_desc", 100)

    override val primaryKey = PrimaryKey(blogId)
}