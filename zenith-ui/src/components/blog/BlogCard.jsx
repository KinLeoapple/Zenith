import {
    AspectRatio,
    Card,
    CardContent,
    Chip,
    Divider,
    Dropdown,
    IconButton, ListItemDecorator,
    Menu,
    MenuButton, MenuItem,
    Typography
} from "@mui/joy";
import img from "@/assets/img/img.webp";
import CalculateMonth from "@mui/icons-material/CalendarMonth";
import {to_date} from "@/assets/lib/utils/to_date.js";
import CategoryIcon from "@mui/icons-material/Category";
import {append, ConditionType, newCondition} from "@/assets/lib/data/reducer/blog/condition_slice.js";
import {setBlogValue} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {useDispatch, useSelector} from "react-redux";
import {newSearchBlogKeyword, setSearchBlogKeyword} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {AutoFixHigh, Delete, MoreVert} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import {color_css_var} from "@/assets/lib/utils/color_css_var.js";
import {useNavigate, useParams} from "react-router-dom";
import {selectUserBasicInfo} from "@/assets/lib/data/reducer/user_basic_info_slice.js";
import {selectLoginState} from "@/assets/lib/data/reducer/login_state_slice.js";
import {setBlogDeleteValue} from "@/assets/lib/data/reducer/blog/blog_delete_slice.js";
import {selectBlogOpButton, setOpButtonValue} from "@/assets/lib/data/reducer/blog/blog_op_button_slice.js";

export const BlogCard = ({
                             id = 0,
                             title = "",
                             date = 0,
                             category = "",
                             desc = ""
                         }) => {
    const menuItems = [
        {
            decorator: <AutoFixHigh/>,
            text: "modify",
            color: "primary",
            func: modifyBlog
        },
        {
            decorator: <Delete/>,
            text: "delete",
            color: "danger",
            func: deleteBlog
        },
    ]

    const params = useParams();
    const userId = useRef(params.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogOpButton = useSelector(selectBlogOpButton);
    const userBasicInfo = useSelector(selectUserBasicInfo);
    const loginState = useSelector(selectLoginState);
    const [open, setOpen] = useState(false);
    const openRef = useRef(open);
    const [isSelf, setIsSelf] = useState(false);
    const opBtn = useRef(undefined);

    useEffect(() => {
        window.addEventListener("scroll", scrollClose);
    }, []);

    useEffect(() => {
        if (blogOpButton !== id) {
            setOpen(false);
            openRef.current = false;
        }
    }, [blogOpButton]);

    const scrollClose = useCallback(() => {
        const callback = (entries) => {
            entries.forEach((entry => {
                if (openRef.current) {
                    if (entry.intersectionRatio < 1) {
                        setOpen(false);
                        openRef.current = false;
                    }
                }
            }));
        }
        const observer = new IntersectionObserver(callback);
        let dom = opBtn.current;
        if (dom !== null) {
            if ((typeof dom) != "undefined")
                observer.observe(dom);
        } else {
            window.removeEventListener("scroll", scrollClose);
        }
    }, []);

    useEffect(() => {
        if (location.pathname.split("/")[1] === "blog") {
            if (loginState) {
                userId.current = params.id ? params.id : userBasicInfo.id;
                if (userId.current !== undefined && userId.current !== null) {
                    setIsSelf(userId.current === userBasicInfo.id);
                }
            }
        }
    }, [location, params, userBasicInfo, loginState]);

    function appendDateCondition(date) {
        dispatch(append(newCondition(ConditionType.Date, date)));
    }

    function appendCategoryCondition(category) {
        dispatch(append(newCondition(ConditionType.Category, category)));
    }

    function selectedBlog(blogId) {
        dispatch(setBlogValue(blogId));
        dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
    }

    function handleMouseClick(e) {
        e.stopPropagation();
        setOpen(!open);
        openRef.current = !openRef.current;
        if (openRef.current) {
            dispatch(setOpButtonValue(id));
        }
    }

    function modifyBlog(e) {
        e.stopPropagation();
        setOpen(false);
        openRef.current = false;
        navigate(`/writeblog/${id}`, {replace: true});
    }

    function deleteBlog(e) {
        e.stopPropagation();
        setOpen(false);
        openRef.current = false;
        dispatch(setBlogDeleteValue(id));
    }

    return (
        <>
            <Card
                onClick={() => selectedBlog(id)}
                invertedColors color="primary" variant="soft"
                className={`mb-5 cursor-pointer select-none`}
                sx={{
                    boxShadow: 'lg',
                    transition: "all .2s",
                    "&:hover": {
                        background: "var(--variant-softHoverBg, var(--joy-palette-primary-softHoverBg, var(--joy-palette-primary-200, #C7DFF7)))"
                    }
                }}>
                <AspectRatio minHeight="120px" maxHeight="200px">
                    <img
                        src={img}
                        loading="lazy"
                        alt=""
                        draggable={false}
                    />
                </AspectRatio>
                <div className={'flex justify-between items-start'}>
                    <div>
                        <Typography level="title-lg">{title}</Typography>
                        <div tabIndex={-1} className={`flex gap-2`}>
                                <span tabIndex={-1} className={`flex items-center gap-1`}><CalculateMonth
                                    sx={{fontSize: 'small'}}/><Chip
                                    tabIndex={-1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        appendDateCondition(date);
                                    }}
                                    size="sm" className={'text-xs'} color="primary" variant="soft" sx={{
                                    "--Chip-paddingInline": "5px",
                                    "--Chip-minHeight": "16px",
                                    "--Chip-decoratorChildHeight": "16px",
                                }}>{to_date(date)}</Chip></span>
                            <Divider orientation="vertical"/>
                            <span tabIndex={-1} className={`flex items-center gap-1`}><CategoryIcon
                                sx={{fontSize: 'small'}}/>
                                    <Chip
                                        tabIndex={-1}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            appendCategoryCondition(category);
                                        }}
                                        size="sm" className={'text-xs'} color="primary" variant="soft" sx={{
                                        "--Chip-paddingInline": "5px",
                                        "--Chip-minHeight": "16px",
                                        "--Chip-decoratorChildHeight": "16px",
                                    }}>{category}</Chip></span>
                        </div>
                    </div>
                    {isSelf &&
                        <Dropdown
                            open={open}>
                            <MenuButton
                                ref={opBtn}
                                tabIndex={-1}
                                slots={{root: IconButton}}
                                slotProps={{
                                    root: {
                                        size: 'sm',
                                        variant: 'plain',
                                        color: 'primary',
                                        onClick: handleMouseClick,
                                    }
                                }}
                            >
                                <MoreVert/>
                            </MenuButton>
                            <Menu
                                variant="soft"
                                color="primary"
                                placement="bottom-end"
                                className={'select-none'}
                                size="sm">
                                {menuItems.map((item, index) => (
                                    <div key={index}>
                                        <MenuItem
                                            onClick={item.func}
                                            tabIndex={-1}
                                            autoFocus={false}
                                            className={'flex justify-center items-center capitalize pl-2 pr-2'}
                                            sx={{
                                                borderRadius: 6,
                                                marginTop: "3px",
                                                marginLeft: "5px",
                                                marginRight: "5px",
                                                marginBottom: "4px",
                                            }}>
                                            <ListItemDecorator variant="plain" sx={{
                                                color: color_css_var(item.color)
                                            }}>
                                                {item.decorator}
                                            </ListItemDecorator>
                                            <span className={'text-sm font-bold capitalize'} style={{
                                                color: color_css_var(item.color)
                                            }}>
                                                {item.text}
                                            </span>
                                        </MenuItem>
                                        {
                                            index !== menuItems.length - 1 &&
                                            <Divider sx={{
                                                width: "80%",
                                                marginLeft: "10%"
                                            }}/>
                                        }
                                    </div>
                                ))}
                            </Menu>
                        </Dropdown>
                    }
                </div>
                <CardContent>
                    <Typography noWrap>
                        <span className={`text-xl`}>{desc.charAt(0)}</span>
                        <span>{desc.substring(1, desc.length)}</span>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}