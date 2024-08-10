package moe.zenith.dataclass.blog

import com.google.gson.annotations.SerializedName

data class PostBlogData(
    @SerializedName("title")
    val title: String,
    @SerializedName("blog")
    val content: String,
    @SerializedName("cat_id")
    val id: String,
    @SerializedName("blog_des")
    val description: String,
)
