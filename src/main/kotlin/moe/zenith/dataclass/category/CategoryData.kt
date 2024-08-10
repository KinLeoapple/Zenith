package moe.zenith.dataclass.category

import com.google.gson.annotations.SerializedName

data class CategoryData(
    @SerializedName("cat_name")
    val categoryName: String,
)