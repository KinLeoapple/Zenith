import {useSelector} from "react-redux";
import {selectBlogContent} from "@/assets/lib/data/reducer/blog/blog_content_slice.js";
import {List, ListItem, ListItemButton, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import {marked} from "marked";
import {smooth_scroll} from "@/assets/lib/utils/scroll.js";

export const BlogIndex = () => {
    const content = useSelector(selectBlogContent);
    const [blogIndex, setBlogIndex] = useState([]);
    const [max, setMax] = useState(6);
    const [min] = useState(6);

    useEffect(() => {
        indexOfBlog(content);
    }, [content]);

    useEffect(() => {
        for (let i = 0; i < blogIndex.length; i++) {
            if (max > blogIndex[i].tag) {
                setMax(blogIndex[i].tag);
            }
        }

        const render = document.querySelector("#render");
        for (let i = min; i >= max; i--)
            markHeadings(render, i);
    }, [blogIndex, max]);

    async function markHeadings(render, level) {
        const levelHeading = blogIndex.filter(el => {
            return el.tag === level;
        });
        if (levelHeading.length === 0) {
            return;
        }
        render.querySelectorAll(`h${level}`).forEach((el, i) => {
            el.setAttribute("id", `blog-index-${levelHeading[i].id}`);
        });
    }

    function indexOfBlog(content) {
        if (content !== null) {
            let list = [];
            let anchor = 0;
            let rendererMD = new marked.Renderer();
            // eslint-disable-next-line no-unused-vars
            rendererMD.heading = (text, level, _) => {
                if (max > level)
                    setMax(level);

                anchor += 1;

                let isExists = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === anchor) {
                        isExists = true;
                        break;
                    }
                }

                if (!isExists) {
                    list.push(
                        {
                            'id': anchor,
                            'tag': level,
                            'text': text
                        });
                    setBlogIndex(list);
                }
                return `<h${level}>${text}</h${level}>`;
            }

            marked.setOptions({
                renderer: rendererMD,
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            });
            marked(content);
        } else {
            setBlogIndex([]);
        }
    }

    return (
        <>
            <List
                className={`${blogIndex.length > 0 ? '' : 'hidden'} select-none`}
                size="lg"
                color="primary"
                variant="plain"
                sx={{
                    "--List-gap": "5px"
                }}
            >
                <Typography level="h4" color="neutral">
                    <span style={{
                        fontSize: 'x-large'
                    }}>C</span>ontents
                </Typography>
                {
                    blogIndex.map((item, i) => (
                        <ListItem key={i} className={`cursor-pointer select-none`}
                                  sx={{
                                      width: '100%'
                                  }}>
                            <ListItemButton
                                onClick={() => smooth_scroll(`blog-index-${item.id}`)}
                                color={"primary"}
                                className={'flex flex-row justify-start'} sx={{
                                borderRadius: '6px'
                            }}>
                                <span
                                    style={{
                                        marginLeft: `${((item.tag - max) * 10)}px`
                                    }}
                                    className={`text-base font-bold`}>{item.text}</span>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}