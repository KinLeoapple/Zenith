package moe.zenith.plugins.postgresSQL.database.relation

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.kotlin.datetime.datetime


object Image : Table("image") {
    val imgId = long("img_id")
    val imgPubDt = datetime("img_pub_dt")
    val imgPath = varchar("img_path", 100)
    val imgHash = varchar("img_hash", 100)

    override val primaryKey = PrimaryKey(imgId)
}