import {useEffect, useRef, useState} from "react";
import {get_blog, get_blog_all, get_blog_total} from "@/assets/lib/api/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {selectBlogPage} from "@/assets/lib/data/reducer/blog/blog_page_slice.js";
import {MAX_PER_PAGE} from "@/assets/lib/data/static.ts";
import {selectBlogNumber, setNumberValue} from "@/assets/lib/data/reducer/blog/blog_number_slice.js";
import {scroll_to_top} from "@/assets/lib/utils/scroll.js";
import {ConditionType, selectCondition} from "@/assets/lib/data/reducer/blog/condition_slice.js";
import {BlogCard} from "@/components/blog/BlogCard.jsx";
import {setFilterNumberValue} from "@/assets/lib/data/reducer/blog/blog_filter_number_slice.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {selectUserBasicInfo} from "@/assets/lib/data/reducer/user_basic_info_slice.js";
import {selectLoginState} from "@/assets/lib/data/reducer/login_state_slice.js";

export const BlogList = () => {
    const params = useParams();
    const [ids, setIds] = useState({data: [], refresh: false});
    const [blogs, setBlogs] = useState({data: [], refresh: false});
    const [filterBlogs, setFilterBlogs] = useState({data: [], refresh: false});
    const [refresh, setRefresh] = useState(false);
    const userId = useRef(params.id);
    const userBasicInfo = useSelector(selectUserBasicInfo);
    const loginState = useSelector(selectLoginState);
    const page = useSelector(selectBlogPage);
    const total = useSelector(selectBlogNumber);
    const conditions = useSelector(selectCondition);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.split("/")[1] === "blog") {
            if (loginState) {
                userId.current = params.id ? params.id : userBasicInfo.id;
                if (userId.current === undefined || userId.current === null) {
                    navigate("/login", {replace: true});
                }
                setRefresh(!refresh)
            } else {
                userId.current = params.id;
                if (userId.current === undefined || userId.current === null) {
                    navigate("/login", {replace: true});
                }
            }
        }
    }, [loginState]);

    useEffect(() => {
        get_blog_total().then(r => {
            if (r !== null) {
                dispatch(setNumberValue(r.total));
            }
        });
    }, [dispatch]);

    useEffect(() => {
        scroll_to_top();
    }, [page]);

    useEffect(() => {
        if (userId.current !== undefined) {
            let offset = 0, size;
            if (page === 1) {
                size = MAX_PER_PAGE;
            } else {
                offset = (page - 1) * MAX_PER_PAGE;
                size = total - offset;
            }
            get_blog_all(userId.current, offset, size).then(r => {
                if (r !== null) {
                    let list = [];
                    for (let i in r) {
                        list.push(r[i].id);
                    }
                    setIds({data: list, refresh: true});
                } else {
                    setIds({data: [], refresh: false});
                }
            });
        }
    }, [ids.refresh, page, total, refresh]);

    useEffect(() => {
        updateFilterBlogs();
    }, [blogs.data, filterBlogs.refresh, conditions]);

    useEffect(() => {
        if (userId.current !== undefined) {
            let requests = [];
            if (ids.data.length > 0) {
                for (let i in ids.data) {
                    requests.push(get_blog(userId.current, ids.data[i]));
                }
                Promise.all(requests).then(arr => {
                    let list = [];
                    for (let i in arr) {
                        if (arr[i] !== null) {
                            list.push(arr[i]);
                        } else {
                            list.push(null);
                        }
                    }
                    setBlogs({data: list, refresh: true});
                });
            }
        }
    }, [blogs.refresh, ids.data, userId]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function updateFilterBlogs() {
        if (conditions.length > 0) {
            let list = blogs.data;
            if (conditions.filter(item => item.type === ConditionType.Category).length > 0) {
                list = list.filter(item => {
                    for (let i = 0; i < conditions.length; i++) {
                        let con = conditions[i];
                        if (con.type === ConditionType.Category && item.category === con.condition) {
                            return true;
                        }
                    }
                });
            }
            if (conditions.filter(item => item.type === ConditionType.Date).length > 0) {
                list = list.filter(item => {
                    for (let i = 0; i < conditions.length; i++) {
                        let con = conditions[i];
                        if (con.type === ConditionType.Date && item.date === con.condition) {
                            return true;
                        }
                    }
                });
            }
            setFilterBlogs({data: list, refresh: true});
        } else {
            setFilterBlogs(blogs);
        }
        dispatch(setFilterNumberValue(filterBlogs.data.length));
    }

    return (
        <>
            {
                filterBlogs.data.sort((a, b) => {
                    return Number(b.date) - Number(a.date);
                }).map((blog, i) => (
                    <BlogCard key={i}
                              id={blog.id}
                              title={blog.title}
                              category={blog.category}
                              date={blog.date}
                              desc={blog.desc}
                    />
                ))
            }
        </>
    )
}