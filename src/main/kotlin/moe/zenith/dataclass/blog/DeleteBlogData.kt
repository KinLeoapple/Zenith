package moe.zenith.dataclass.blog

import com.google.gson.annotations.SerializedName

data class DeleteBlogData(
    @SerializedName("blog_id")
    val id: String
)