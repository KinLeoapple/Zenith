package moe.zenith.dataclass.draft

import com.google.gson.annotations.SerializedName

data class PostDraftData(
    @SerializedName("title")
    val title: String,
    @SerializedName("draft")
    val content: String,
)