package moe.zenith.plugins.postgresSQL.database.dao.draft

import com.google.gson.Gson
import moe.zenith.dataclass.draft.DeleteDraftData
import moe.zenith.plugins.postgresSQL.database.relation.Draft
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

/**
 * Return a map of the delete draft result.
 *
 * @param json The json containers the information.
 * @return A map of the delete draft result.
 */
fun deleteDraft(json: String): Map<String, Boolean> {
    val dataClass: DeleteDraftData = Gson().fromJson(json, DeleteDraftData::class.java)

    // delete the information in database anyway.
    transaction {
        Draft.deleteWhere {
            draftId eq dataClass.id.toLong()
        }
    }
    // try to delete file
    val draftFile = File("./draft/${dataClass.id}")
    draftFile.delete()
    return mapOf("deleted" to true)
}