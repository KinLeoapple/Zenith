import {
    CircularProgress, Divider, List,
    ListItem,
    ListItemButton, Stack,
    Typography,
    useColorScheme
} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {
    newSearchBlogKeyword,
    selectSearchKeyword,
    setSearchBlogKeyword
} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {SEARCH_INPUT, SEARCH_INPUT_DARK} from "@/assets/lib/data/static.ts";
import {setBlogValue} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {useEffect, useRef, useState} from "react";
import {get_search_blog} from "@/assets/lib/api/api.ts";
import {Inventory2} from "@mui/icons-material";

interface searchItem {
    id: string;
    title: string;
    desc: string;
}

interface searchItemList {
    item: searchItem;
}

export const SearchMenu = () => {
    const themeMode = useColorScheme();
    const keyword = useSelector(selectSearchKeyword);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [searchList, setSearchList] = useState<searchItem[]>([]);
    const delaySearchTimer = useRef(
        {
            timer: setTimeout(() => {}),
            time: new Date().getTime()
        }
    );

    useEffect(() => {
        setSearchList([]);
        const time = new Date().getTime();
        if (time - delaySearchTimer.current.time <= 1200) {
            clearTimeout(delaySearchTimer.current.timer);
        }
        setLoading(true);
        delaySearchTimer.current.timer = setTimeout(() => {
            if (keyword.value !== "") {
                get_search_blog(keyword.value).then(r => {
                    const list:searchItem[] = [];
                    if (r !== null) {
                        if (r instanceof Object) {
                            const response = r as searchItemList;
                            let key: keyof searchItemList;
                            for (key in response) {
                                list.push(response[key] as searchItem);
                            }
                        }
                    }
                    setSearchList(list);
                    setLoading(false)
                });
            } else
                setSearchList([]);
        }, 1200);
        delaySearchTimer.current.time = time;
    }, [keyword]);

    function goToRender(id: string | number) {
        dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
        dispatch(setBlogValue(id));
    }

    return (
        <>
            {
                keyword.value !== "" &&
                <Stack
                    className={`w-full ${searchList.length === 0 ? 'min-h-24' : 'h-auto'} select-none`}
                    sx={{
                        boxShadow: "lg",
                        marginTop: .5,
                        borderRadius: "var(--joy-radius-sm)",
                        backgroundColor: themeMode.mode === 'dark' ? SEARCH_INPUT_DARK : SEARCH_INPUT,
                    }}>
                    <List
                        variant="soft"
                        className={`${searchList.length === 0 ? 'flex justify-center items-center' : ''}`}
                        sx={{
                            padding: 0,
                            borderRadius: "var(--joy-radius-sm)",
                            backgroundColor: themeMode.mode === 'dark' ? SEARCH_INPUT_DARK : SEARCH_INPUT,
                        }}>
                        {searchList.length > 0 ?
                            <>{
                                searchList.map((item, i) => (
                                    <div key={i}>
                                        <ListItem className={'pl-2 pr-2'} sx={{
                                            borderRadius: 6,
                                            marginTop: "3px",
                                            marginLeft: "5px",
                                            marginRight: "5px",
                                            marginBottom: "4px",
                                        }}>
                                            <ListItemButton tabIndex={-1} color={"primary"}
                                                            onClick={() => goToRender(item.id)}>
                                                <Typography>
                                                    <Typography
                                                        className={'font-bold'}>{item.title}</Typography><br/>
                                                    <Typography level={'body-sm'}>{item.desc}</Typography>
                                                </Typography>
                                            </ListItemButton>
                                        </ListItem>
                                        {i < searchList.length - 1 &&
                                            <Divider/>
                                        }
                                    </div>
                                ))
                            }</> :
                            <>{loading ?
                                <CircularProgress
                                    color="primary"
                                    determinate={false}
                                    size="md"
                                    variant="soft"
                                /> :
                                <>{
                                    searchList.length === 0 &&
                                    <>
                                        <Typography variant={"plain"} color={"primary"} level={'body-lg'}>
                                            <Inventory2/>
                                        </Typography>
                                        <Typography level={'body-sm'}>
                                            No Results Found
                                        </Typography>
                                    </>
                                }</>
                            }</>
                        }
                    </List>
                </Stack>
            }
        </>
    )
}