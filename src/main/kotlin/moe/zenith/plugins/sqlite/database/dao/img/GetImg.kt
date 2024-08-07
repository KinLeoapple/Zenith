package moe.zenith.plugins.sqlite.database.dao.img

import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Image
import org.ktorm.dsl.*
import java.io.File

/**
 * Return a map of the get image result.
 *
 * @param database The database which wish to search.
 * @param id The id of the image.
 * @return A byte array of the image.
 */
fun getImg(database: Database, id: Long): ByteArray {
    val imgContent: ByteArray
    var imgPath: String? = null;

    val result = database.getConnection().from(Image)
        .select(Image.imgPath)
        .where(Image.imgId eq id)

    result.forEach {
        imgPath = it[Image.imgPath]
    }

    val imgFile = File("$imgPath")
    imgContent = if (imgFile.exists())
        imgFile.readBytes()
    else
        ByteArray(0)

    return imgContent
}