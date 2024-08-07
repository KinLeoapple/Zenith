package moe.zenith.dataclass

import com.google.gson.annotations.SerializedName

data class PostBlogData(
    @SerializedName("title")
    val title: String,
    @SerializedName("blog")
    val blog: String,
    @SerializedName("cat_id")
    val catId: String,
    @SerializedName("blog_des")
    val blogDes: String,
)
