package moe.zenith.dataclass

import com.google.gson.annotations.SerializedName

data class CategoryData(
    @SerializedName("catName")
    val catName: String,
)