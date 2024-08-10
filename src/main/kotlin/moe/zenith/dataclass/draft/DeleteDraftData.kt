package moe.zenith.dataclass.draft

import com.google.gson.annotations.SerializedName

data class DeleteDraftData(
    @SerializedName("draft_id")
    val id: String
)