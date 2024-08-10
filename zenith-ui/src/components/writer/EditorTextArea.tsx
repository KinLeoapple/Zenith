import {
    Box,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Typography, useColorScheme
} from "@mui/joy";
import PerfectScrollbar from "react-perfect-scrollbar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectEditorSize} from "@/assets/lib/data/reducer/writer/editor_size_slice";
import "highlight.js/styles/atom-one-dark.min.css";
import Markdown from "react-markdown";
import gfm from 'remark-gfm';
import math from 'remark-math';
import MonacoEditor from "react-monaco-editor";

const toolBarItems = [
    {
        id: "bold",
        icon: "format_bold",
        color: "primary",
    },
    {
        id: "italic",
        icon: "format_italic",
        color: "primary",
    },
    {
        id: "underline",
        icon: "format_underlined",
        color: "primary",
    },
    {
        id: "strike",
        icon: "strikethrough_s",
        color: "primary",
    },
    {
        id: "script#super",
        icon: "superscript",
        color: "primary",
    },
    {
        id: "script#sub",
        icon: "subscript",
        color: "primary",
    },
    {
        id: "header#1",
        icon: "format_h1",
        color: "primary",
    },
    {
        id: "header#2",
        icon: "format_h2",
        color: "primary",
    },
    {
        id: "blockquote",
        icon: "format_quote",
        color: "primary",
    },
    {
        id: "code-block",
        icon: "code",
        color: "primary",
    },
    {
        id: "link",
        icon: "link",
        color: "primary",
    },
    {
        id: "list#ordered",
        icon: "format_list_numbered",
        color: "primary",
    },
    {
        id: "list#bullet",
        icon: "format_list_bulleted",
        color: "primary",
    },
    {
        id: "image",
        icon: "imagesmode",
        color: "primary",
    }
]

export const EditorTextArea = () => {
    const theme = useColorScheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();
    const [markdown, setMarkdown] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [length, setLength] = useState(0);
    const editorSize = useSelector(selectEditorSize);

    useEffect(() => {
        setEditorHeight();
    }, [editorSize]);

    function setEditorHeight() {
        const dom = document.querySelector(".ql-editor");
        if (dom) {
            (dom as HTMLElement).style.minHeight = `calc(${editorSize.height}px - 153px)`;
        }
    }

    function handleMarkdownChange(value: string) {
        setMarkdown(value);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const uploadImg = async () => {
        // return new Promise(resolve => {
        //     post_img(localStorage.getItem("token"), file).then(r => {
        //         if (r.saved !== null && r.saved !== undefined) {
        //             resolve(r.saved);
        //         }
        //     });
        // });
    };

    return (
        <>
            <Card color={"primary"} variant={"outlined"} sx={{
                minHeight: "100%",
                boxShadow: "lg",
            }}>
                <CardContent sx={{
                    padding: "0",
                }}>
                    <Grid container
                          rowSpacing={1}
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="stretch"
                          sx={{flexGrow: 1}}>
                        <Grid xs>
                            <Card size="sm" color={"primary"} variant={"plain"} sx={{
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingTop: 1,
                                paddingBottom: 1,
                            }}>
                                <ButtonGroup
                                    id={'toolbar'}
                                    size="sm"
                                    color="primary"
                                    orientation="horizontal"
                                    variant="outlined"
                                >
                                    {toolBarItems.map((item, index) => (
                                        <IconButton tabIndex={-1} id={item.id} size="sm" key={index}
                                                    variant={"soft"}
                                                    className={`toolBarButton`}
                                                    sx={{
                                                        paddingLeft: 2.5,
                                                        paddingRight: 2.5
                                                    }}>
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </IconButton>
                                    ))}
                                </ButtonGroup>
                            </Card>
                        </Grid>
                        <Grid xs>
                            <Card size="sm" color={"primary"} variant={"outlined"}
                                  sx={{
                                      padding: 0,
                                      minHeight: `calc(${editorSize.height}px - 135px)`,
                                      height: "100%",
                                      maxHeight: `calc(${editorSize.height}px - 135px)`,
                                      overflow: "hidden"
                                  }}>
                                <Box display="flex" justifyContent={"space-evenly"} sx={{
                                    height: `calc(${editorSize.height}px - 135px)`,
                                }}>
                                    <Box flex={1} sx={{
                                        width: "50%",
                                        height: `calc(${editorSize.height}px - 135px)`,
                                    }}>
                                        <MonacoEditor
                                            width="100%"
                                            height={editorSize.height - 135}
                                            language="markdown"
                                            theme={theme.mode === "dark" ? "vs-dark" : "vs"}
                                            value={markdown}
                                            onChange={(value) => handleMarkdownChange(value)}
                                            options={{
                                                selectOnLineNumbers: true,
                                                matchBrackets: "near",
                                            }}
                                        />
                                    </Box>
                                    <Box flex={1} sx={{
                                        width: "50%",
                                        height: `calc(${editorSize.height}px - 135px)`,
                                    }}>
                                        <PerfectScrollbar
                                            options={{suppressScrollX: true, useBothWheelAxes: false}}>
                                            <Box flex={1} sx={{
                                                paddingLeft: 2,
                                                paddingRight: 2,
                                                paddingTop: .5,
                                                paddingBottom: .5,
                                                width: "100%",
                                                height: "100%",
                                            }}>
                                                <Markdown remarkPlugins={[gfm, math]}>{markdown}</Markdown>
                                            </Box>
                                        </PerfectScrollbar>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={'flex justify-end items-end mt-[-20px]'}>
                    <Typography className={'select-none'} level={"body-xs"} color="primary"
                                variant={"plain"}>{`${length}  character(s)`}</Typography>
                </CardActions>
            </Card>
        </>
    );
};