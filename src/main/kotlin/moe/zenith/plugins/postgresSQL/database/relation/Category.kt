package moe.zenith.plugins.postgresSQL.database.relation

import org.jetbrains.exposed.sql.Table

object Category : Table("category") {
    val catId = long("cat_id").uniqueIndex()
    val catName = varchar("cat_name", 30)

    override val primaryKey = PrimaryKey(catId)
}