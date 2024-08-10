package moe.zenith.plugins.postgresSQL.database.dao.img

import moe.zenith.plugins.postgresSQL.database.relation.Image
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

/**
 * Return a map of the get image result.
 *
 * @param id The id of the image.
 * @return A byte array of the image.
 */
fun getImg(id: Long): ByteArray {
    val imgContent: ByteArray
    var imgPath: String? = null;

    transaction {
        Image.select(Image.imgPath)
            .where(Image.imgId eq id)
            .forEach {
                imgPath = it[Image.imgPath]
            }
    }

    val imgFile = File("$imgPath")
    imgContent = if (imgFile.exists())
        imgFile.readBytes()
    else
        ByteArray(0)

    return imgContent
}