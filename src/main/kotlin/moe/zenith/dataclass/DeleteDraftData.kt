package moe.zenith.dataclass

import com.google.gson.annotations.SerializedName

data class DeleteDraftData(
    @SerializedName("draft_id")
    val draftId: String,
)