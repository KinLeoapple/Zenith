import {Card, CardContent, Chip, CircularProgress, Divider, List, ListItem, ListItemButton, Typography} from "@mui/joy";
import {Inventory2} from "@mui/icons-material";
import {MAX_LOAD} from "@/assets/lib/data/static.ts";
import {
    get_blog,
    get_blog_all,
    get_blog_content,
    get_draft,
    get_draft_all,
    get_draft_content, get_search_blog
} from "@/assets/lib/api/api.ts";
import {append_list} from "@/assets/lib/utils/append_list.js";
import {useDispatch, useSelector} from "react-redux";
import {selectUserBasicInfo} from "@/assets/lib/data/reducer/user_basic_info_slice.js";
import {useCallback, useEffect, useRef, useState} from "react";
import {
    newSearchBlogKeyword,
    selectSearchKeyword,
    setSearchBlogKeyword
} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {setBlogValue} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {setShowResultValue} from "@/assets/lib/data/reducer/blog/show_search_result_slice.js";
import {GoBackButton} from "@/components/button/GoBackButton.jsx";

export const ResultList = ({
                               id = "",
                               blog = true,
                               search = false
                           }) => {
    const userBasicInfo = useSelector(selectUserBasicInfo);
    const keyword = useSelector(selectSearchKeyword);
    const dispatch = useDispatch();

    const [mounted, setMounted] = useState(false);
    const [currKeyWord, setCurrKeyWord] = useState(keyword.value);
    const [dynamicList, setDynamicList] = useState([]);
    const dynamicListRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const [isLoadAll, setIsLoadAll] = useState(false);
    const loadAll = useRef(false);
    const [offsetCount, setOffsetCount] = useState(1);
    const offsetCountRef = useRef(1);

    useEffect(() => {
        if (search) {
            if (keyword.triggeredBy !== null) {
                setDynamicList([]);
                setCurrKeyWord(keyword.value);
                loadData();
            }
        }
    }, [keyword]);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            setCurrKeyWord(keyword.value);
            dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
            window.addEventListener("scroll", scrollLoad);
        } else {
            window.removeEventListener("scroll", scrollLoad);
        }
    }, []);

    const scrollLoad = useCallback(() => {
        const options = {
            threshold: 1.0,
        };
        const callback = (entries) => {
            entries.forEach(((entry, index) => {
                if (index === entries.length - 1) {
                    if (entry.intersectionRatio === 1.0) {
                        if (!loadAll.current) {
                            loadData();
                            setOffsetCount(offsetCountRef.current + 1);
                        }
                    }
                }
            }));
        }
        const observer = new IntersectionObserver(callback, options);
        let dom = document.querySelector(`#${id}`);
        if (dom !== null) {
            let children = dom.children;
            if ((typeof children[children.length - 1]) != "undefined")
                observer.observe(children[children.length - 1]);
        } else {
            window.removeEventListener("scroll", scrollLoad);
        }
    }, []);

    function hasNext() {
        const fn = (r) => {
            Object.getOwnPropertyNames(r).length === 0 ? (() => {
                setIsLoadAll(true);
                loadAll.current = true;
            })() : null;
            setOffsetCount(offsetCountRef.current + 1);
        }

        let offset = offsetCount * MAX_LOAD;
        if (blog) {
            get_blog_all(userBasicInfo.id, offset, MAX_LOAD).then(r => {
                fn(r);
            });
        } else {
            get_draft_all(localStorage.getItem("token"), userBasicInfo.id, offset, MAX_LOAD).then(r => {
                fn(r);
            });
        }
    }

    function loadData() {
        setLoading(true);
        dynamicListRef.current = dynamicList;
        offsetCountRef.current = offsetCount;
        if (search) {
            loadSearchData();
        } else {
            loadListData();
        }
    }

    function loadListData() {
        if (!loadAll.current) {
            let offset = (offsetCount - 1) * MAX_LOAD;
            if (blog) {
                get_blog_all(userBasicInfo.id, offset, MAX_LOAD).then(r => {
                    updateList(r);
                    hasNext();
                });
            } else {
                get_draft_all(localStorage.getItem("token"), userBasicInfo.id, offset, MAX_LOAD).then(r => {
                    updateList(r);
                    hasNext();
                });
            }
        }
    }

    function updateList(r) {
        let size = 0;
        let list = [];
        let timer = null;
        for (let i in r) {
            size++;
            clearTimeout(timer);
            let requestList;
            if (blog) {
                requestList = [get_blog(userBasicInfo.id, r[i].id), get_blog_content(r[i].id)];
            } else {
                let token = localStorage.getItem("token");
                requestList = [get_draft(token, userBasicInfo.id, r[i].id), get_draft_content(token, r[i].id)];
            }
            Promise.all(requestList).then(arr => {
                arr[0].content = arr[1].content;
                list.push(arr[0]);
                timer = setTimeout(() => {
                    if (list.length !== 0)
                        setDynamicList(append_list(dynamicListRef.current, list));
                    setLoading(false);
                }, 100);
            });
        }
        if (size === 0) {
            setIsLoadAll(true);
            loadAll.current = true;
        }
    }

    function loadSearchData() {
        if (!loadAll.current) {
            let offset = (offsetCount - 1) * MAX_LOAD;
            get_search_blog(keyword.value, offset, MAX_LOAD).then(r => {
                let list = [];
                if (r !== null) {
                    for (let i in r) {
                        list.push(r[i]);
                    }
                }
                if (list.length === 0) {
                    setIsLoadAll(true);
                    loadAll.current = true;
                } else {
                    setDynamicList(append_list(dynamicListRef.current, list));
                }
                setLoading(false);
            });
        }
    }

    function goToRender(id) {
        dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
        dispatch(setBlogValue(id));
        dispatch(setShowResultValue(false));
    }

    return (
        <div className={'relative mt-10'}>
            <GoBackButton/>
            <Card invertedColors variant={"soft"} color={"primary"}>
                {search &&
                    <>
                        <div className={'flex justify-start gap-2 select-none'}>
                            <Typography className={'font-bold'} level="title-sm" variant="plain" color="primary">
                                Results of
                            </Typography>
                            <Chip color="primary"
                                  size="sm"
                                  variant="outlined"
                                  sx={{
                                      "--Chip-minHeight": "19px",
                                      "--Chip-gap": "8px",
                                      "--Chip-paddingInline": "12px"
                                  }}>
                                <span className={'w-full text-center'}>{currKeyWord}</span>
                            </Chip>
                        </div>
                        <Divider sx={{
                            width: "95%",
                            marginLeft: "2.5%"
                        }}/>
                    </>
                }
                <CardContent>
                    <List
                        className={`${dynamicList.length === 0 ? 'flex justify-center items-center' : ''}`}
                        id={id}
                        color={"primary"}
                        variant="soft"
                        placement="bottom-start"
                        sx={{
                            padding: 0,
                            borderRadius: "var(--joy-radius-sm)",
                            backgroundColor: "transparent",
                        }}>
                        {dynamicList.length === 0 ?
                            <>
                                <Typography variant={"plain"} color={"primary"} level={'body-lg'}>
                                    <Inventory2/>
                                </Typography>
                                <Typography level={'body-sm'}>
                                    No Results Found
                                </Typography>
                            </> :
                            <>{dynamicList.map((item, i) => (
                                <div key={i}>
                                    <ListItem sx={{
                                        borderRadius: 6,
                                        marginTop: "3px",
                                        marginLeft: "3%",
                                        marginRight: "3%",
                                        marginBottom: "3px",
                                    }}>
                                        <ListItemButton tabIndex={-1} onClick={
                                            () => goToRender(item.id)
                                        }>
                                            <Typography>
                                                <Typography className={'font-bold'}>{item.title}</Typography><br/>
                                                <Typography noWrap level={'body-sm'}>{item.desc}</Typography><br/>
                                                <Typography level={'body-sm'}>{
                                                    item.content.length <= 100 ? item.content : (item.content.slice(0, 100) + " ...")
                                                }</Typography>
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            ))}</>
                        }
                    </List>
                    {(isLoadAll && loading) &&
                        <div className="flex justify-center items-center">
                            <CircularProgress
                                color="primary"
                                determinate={false}
                                size="md"
                                variant="soft"
                            />
                        </div>
                    }
                </CardContent>
            </Card>
        </div>
    )
}