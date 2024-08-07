package moe.zenith.dataclass

import com.google.gson.annotations.SerializedName

data class DeleteBlogData(
    @SerializedName("blog_id")
    val blogId: String,
)