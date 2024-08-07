package moe.zenith.plugins.sqlite.database.dao.draft

import com.google.gson.Gson
import moe.zenith.dataclass.DeleteDraftData
import moe.zenith.plugins.sqlite.database.Database
import moe.zenith.plugins.sqlite.database.relation.Draft
import org.ktorm.dsl.delete
import org.ktorm.dsl.eq
import java.io.File

/**
 * Return a map of the delete draft result.
 *
 * @param database The database which wish to search.
 * @param json The json containers the information.
 * @return A map of the delete draft result.
 */
fun deleteDraft(database: Database, json: String): Map<String, Boolean> {
    val dataClass: DeleteDraftData = Gson().fromJson(json, DeleteDraftData::class.java)

    // delete the information in database anyway.
    database.getConnection().delete(Draft) {
        it.draftId eq dataClass.draftId.toLong()
    }
    // try to delete file
    val draftFile = File("./draft/${dataClass.draftId}")
    draftFile.delete()
    return mapOf("deleted" to true)
}