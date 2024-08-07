import {AspectRatio, Card, CardContent, CardOverflow, useColorScheme} from "@mui/joy";
import img from "@/assets/img/img.webp";
import {useDispatch, useSelector} from "react-redux";
import {selectBlog} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {useEffect, useState} from "react";
import {get_blog_content} from "@/assets/lib/api/api.ts";
import {setContentValue} from "@/assets/lib/data/reducer/blog/blog_content_slice.js";
import {newSearchBlogKeyword, setSearchBlogKeyword} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {setShowResultValue} from "@/assets/lib/data/reducer/blog/show_search_result_slice.js";
import {GoBackButton} from "@/components/button/GoBackButton.jsx";

export const BlogRenderer = () => {
    const theme = useColorScheme();
    const blog = useSelector(selectBlog);
    const dispatch = useDispatch();
    const [id] = useState('render');
    const [content, setContent] = useState("");

    useEffect(() => {
        dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
        dispatch(setShowResultValue(false));
    }, []);

    useEffect(() => {
        get_blog_content(blog).then(r => {
            setContent(r.content);
        });
    }, [blog]);

    useEffect(() => {
        dispatch(setContentValue(content));
    }, [content, dispatch]);

    return (
        <div className={'relative mt-10'}>
            <GoBackButton/>
            <Card color="primary" variant="outlined" sx={{
                boxShadow: 'lg',
            }}>
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            src={img}
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    {/*<MdPreview*/}
                    {/*    theme={theme.mode === "dark" ? "dark" : "light"}*/}
                    {/*    style={{*/}
                    {/*        backgroundColor: "transparent",*/}
                    {/*    }}*/}
                    {/*    editorId={id}*/}
                    {/*    modelValue={content}*/}
                    {/*    sanitize={(html) => sanitize(content, html)}*/}
                    {/*    previewTheme={"vuepress"}/>*/}
                </CardContent>
            </Card>
        </div>
    )
}