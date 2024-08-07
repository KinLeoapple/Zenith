import {CategoriesList} from "@/components/blog/CategoriesList.jsx";
import {BlogList} from "@/components/blog/BlogList.jsx";
import {Layout} from "@/components/layout/Layout.js";
import {Pagination} from "@/components/blog/Pagination.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Condition} from "@/components/blog/Condition.jsx";
import {selectBlog, setBlogValue} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {BlogRenderer} from "@/components/blog/BlogRenderer.jsx";
import {BlogIndex} from "@/components/blog/BlogIndex.jsx";
import {useEffect} from "react";
import {setContentValue} from "@/assets/lib/data/reducer/blog/blog_content_slice.js";
import {selectShowSearchResult} from "@/assets/lib/data/reducer/blog/show_search_result_slice.js";
import {SearchResult} from "@/components/blog/SearchResult.jsx";
import {DeleteConfirm} from "@/components/blog/DeleteConfirm.jsx";
import {setOpButtonValue} from "@/assets/lib/data/reducer/blog/blog_op_button_slice.js";
import {CreateBlogButton} from "@/components/blog/CreateBlogButton.tsx";

export const Blog = () => {
    const dispatch = useDispatch();
    const blog = useSelector(selectBlog);
    const showResult = useSelector(selectShowSearchResult);

    useEffect(() => {
        dispatch(setBlogValue(0));
        dispatch(setContentValue(""));
        dispatch(setOpButtonValue(0));
    }, []);

    return (
        <>
            <Layout
                left={{
                    el: <>
                        {blog === 0 ?
                            <>
                                <CreateBlogButton/>
                                <CategoriesList/>
                            </> :
                            <BlogIndex/>
                        }
                    </>,
                    fixed: true
                }}
                content={{
                    el: <div className={`min-h-full`}>
                        {showResult ? <SearchResult/> :
                            <>{blog === 0 ?
                                <>
                                    <Condition/>
                                    <BlogList/>
                                    <Pagination/>
                                    <DeleteConfirm/>
                                </> :
                                <BlogRenderer/>
                            }</>
                        }
                    </div>
                }}
            />
        </>
    )
}