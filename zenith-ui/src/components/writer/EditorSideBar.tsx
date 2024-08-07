import {
    AspectRatio,
    Box, Button,
    Card, CardActions,
    CardContent, CardCover,
    CardOverflow, Chip,
    Divider,
    IconButton,
    Input, ModalClose, Option, Select, SelectStaticProps,
    Textarea,
    Typography
} from "@mui/joy";
import {Close, CloseRounded, ImageOutlined} from "@mui/icons-material";
import PerfectScrollbar from "react-perfect-scrollbar";
import {CutImageModal} from "@/components/writer/CutImageModal.tsx";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCoverImage, setCoverImageValue} from "@/assets/lib/data/reducer/writer/cover_image_slice";
import {setCoverModalOpenValue} from "@/assets/lib/data/reducer/writer/cover_modal_open_slice";
import {setSelectedCoverImageValue} from "@/assets/lib/data/reducer/writer/selected_cover_image_slice";
import {get_category, get_category_all} from "@/assets/lib/api/api.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {selectLoginState} from "@/assets/lib/data/reducer/login_state_slice";
import {selectEditorText} from "@/assets/lib/data/reducer/writer/editor_text_slice";

interface category {
    id: string | number,
    catName: string
}

interface categoryId {
    id: string | number,
}

export const EditorSideBar = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const blogId = useRef(params.id);
    const loginState = useSelector(selectLoginState);
    const location = useLocation();
    const navigate = useNavigate();
    const editorText = useSelector(selectEditorText);
    const [disabled, setDisabled] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const coverInputRef = useRef<HTMLInputElement | null>(null);
    const coverImage = useSelector(selectCoverImage);
    const [categoryList, setCategoryList] = useState<category[]>([]);
    const [selection, setSelection] = useState<string | null>(null);
    const selectionAction: SelectStaticProps['action'] = useRef(null);
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        if (location.pathname.split("/")[1] === "writeblog") {
            if (loginState) {
                blogId.current = params.id;
                if (blogId.current === undefined || blogId.current === null) {
                    setIsModify(false);
                } else {
                    setIsModify(true);
                }
                getCategory();
            } else {
                navigate("/login", {replace: true});
            }
        }
    }, []);

    useEffect(() => {
        const length = editorText.length - 1;
        if (length <= 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [editorText]);

    function handleTitleChange(e: React.FormEvent<HTMLDivElement>) {
        if (title.length < 40) {
            const target = e.target;
            setTitle((target as HTMLInputElement).value);
        }
    }

    function cleanTitle() {
        setTitle("");
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const target = e.target;
        const value = (target as HTMLTextAreaElement).value;
        if (value.length <= 500)
            setDescription(value);
    }

    function handleSelectCover() {
        if (coverImage || coverImage !== "") {
            dispatch(setCoverModalOpenValue(true));
        } else
            coverInputRef?.current?.click();
    }

    function handleCoverImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const target = e.target;
        const files = target.files;
        if (files && files.length) {
            const file = files[files.length - 1];
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const result = fileReader.result;
                if (result) {
                    dispatch(setSelectedCoverImageValue(result as string));
                    target.value = "";
                }
            };
            fileReader.readAsDataURL(file);
        }
    }

    function handleCleanCoverImage(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        dispatch(setCoverImageValue(""));
    }

    const getCategory = () => {
        const catList: category[] = [];
        get_category_all().then(r => {
            if (r !== null) {
                if (r instanceof Object) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    Object.entries(r).forEach(([_, value]) => {
                        get_category((value as categoryId).id).then(c => {
                            catList.push(c as category);
                            setCategoryList(catList);
                        });
                    });
                }
            }
        });
    }

    return (
        <>
            <Card color={"primary"} variant={"outlined"} sx={{
                minHeight: "100%",
                boxShadow: "lg",
            }}>
                <CardOverflow>
                    <Input
                        className={'mt-5'}
                        slots={{root: Input}}
                        slotProps={{
                            root: {
                                maxLength: 40,
                                endDecorator: <div className={'flex justify-end items-center gap-2'}>
                                    {
                                        title !== "" &&
                                        <IconButton
                                            tabIndex={-1}
                                            onClick={cleanTitle}
                                            sx={{
                                                background: "transparent",
                                                "&:hover": {
                                                    background: "transparent",
                                                }
                                            }}
                                        >
                                            <Close/>
                                        </IconButton>
                                    }
                                    <Typography color={'primary'} variant={"plain"} level={"body-sm"}>
                                        {`${title.length}/40`}
                                    </Typography>
                                </div>,
                                onChange: (e) => handleTitleChange(e),
                                onInput: (e) => handleTitleChange(e),
                                value: title,
                                color: "primary",
                                variant: "outlined",
                                size: "sm",
                                placeholder: "Type your title...",
                                sx: {
                                    '--Input-focusedThickness': '0',
                                }
                            }
                        }}>
                    </Input>
                </CardOverflow>
                <Divider inset="none"/>
                <CardContent sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: 2
                }}>
                    {/*Description*/}
                    <Box display="flex" flexDirection={"column"} gap={1}>
                        <Typography level={"title-sm"}>
                            Description
                        </Typography>
                        <Card color={"primary"} variant={"outlined"} className={'overflow-hidden'} sx={{
                            padding: 1,
                        }}>
                            <PerfectScrollbar options={{suppressScrollX: true, useBothWheelAxes: false}}>
                                <Box
                                    minHeight={80}
                                    maxHeight={80}>
                                    <Textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        color="primary"
                                        variant={"plain"}
                                        disabled={false}
                                        minRows={3}
                                        placeholder="Type description..."
                                        size="sm"
                                        sx={{
                                            '&::before': {
                                                border: 'none',
                                                left: '2.5px',
                                                right: '2.5px',
                                                bottom: 0,
                                                top: 'unset',
                                                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                                borderRadius: 0,
                                                borderBottomLeftRadius: '64px 20px',
                                                borderBottomRightRadius: '64px 20px',
                                            },
                                        }}
                                    />
                                </Box>
                            </PerfectScrollbar>
                            <Typography
                                level="body-xs"
                                color={"primary"}
                                variant={"plain"}
                                sx={{ml: 'auto'}}>
                                {description.length}/500
                            </Typography>
                        </Card>
                    </Box>
                    {/*Cover*/}
                    <Box display="flex" flexDirection={"column"} gap={1}>
                        <Typography level={"title-sm"}>
                            Cover
                        </Typography>
                        <AspectRatio onClick={handleSelectCover}
                                     className={'cursor-pointer'}>
                            <Card
                                color="primary"
                                variant="outlined"
                                size="sm"
                            >
                                <CardCover>
                                    {!coverImage || coverImage === "" ?
                                        <Box display="flex"
                                             gap={2}
                                             justifyContent="center"
                                             alignItems="center">
                                            <ImageOutlined/>
                                            <Typography
                                                color={"primary"}
                                                variant={"plain"}
                                                level={"body-sm"}>
                                                Select cover image
                                            </Typography>
                                        </Box> :
                                        <Box sx={{
                                            overflow: "hidden"
                                        }}>
                                            <ModalClose
                                                onClick={handleCleanCoverImage}
                                                color={"danger"} variant={"solid"}/>
                                            <img draggable={false} src={coverImage} alt=""/>
                                        </Box>

                                    }
                                </CardCover>
                            </Card>
                            <input
                                onChange={handleCoverImageChange}
                                ref={coverInputRef}
                                hidden
                                type={"file"}
                                accept={"image/*"}/>
                        </AspectRatio>
                        <CutImageModal/>
                    </Box>
                    {/*Category*/}
                    <Box display="flex" flexDirection={"column"} gap={1}>
                        <Typography level={"title-sm"}>
                            Category
                        </Typography>
                        <Select
                            action={selectionAction}
                            size="sm"
                            color={"primary"}
                            variant={"outlined"}
                            placeholder="Choose one category…"
                            value={selection}
                            onChange={(_e, newValue) => setSelection(newValue)}
                            {...(selection && {
                                endDecorator: (
                                    <IconButton
                                        variant="solid"
                                        color="danger"
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                        }}
                                        onClick={() => {
                                            setSelection(null);
                                            selectionAction.current?.focusVisible();
                                        }}
                                        sx={{
                                            maxWidth: "var(--IconButton-size, 2rem)",
                                            maxHeight: "var(--IconButton-size, 2rem)"
                                        }}
                                    >
                                        <CloseRounded/>
                                    </IconButton>
                                ),
                                indicator: null,
                            })}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', gap: '0.25rem'}}>
                                    <Chip size="sm" variant="solid" color="primary">
                                        {selected?.label}
                                    </Chip>
                                </Box>
                            )}
                            slotProps={{
                                listbox: {
                                    sx: {
                                        padding: 0,
                                        boxShadow: "lg"
                                    }
                                },
                            }}>
                            <PerfectScrollbar options={{suppressScrollX: true, useBothWheelAxes: false}}>
                                <Box maxHeight={150}>
                                    {categoryList.map((cat, index) => (
                                        <Option key={index}
                                                color={"primary"}
                                                variant={"plain"}
                                                tabIndex={-1}
                                                value={cat.id}
                                                label={cat.catName}>
                                            {cat.catName}
                                        </Option>
                                    ))}
                                </Box>
                            </PerfectScrollbar>
                        </Select>
                    </Box>
                </CardContent>
                <CardActions>
                    {isModify ?
                        <Button loading={checking} className={'capitalize'} disabled={disabled}
                                tabIndex={-1}
                                size={'sm'}
                                variant={'solid'}
                                color={'primary'}>
                            post
                        </Button> :
                        <div className={'w-full flex justify-end items-center gap-5'}>
                            <Button loading={checking} className={'capitalize'} disabled={disabled}
                                    tabIndex={-1}
                                    size={'sm'}
                                    variant={'solid'}
                                    color={'primary'}>
                                post
                            </Button>
                            <Button loading={checking} className={'capitalize'} disabled={disabled}
                                    tabIndex={-1}
                                    size={'sm'}
                                    variant={'solid'}
                                    color={'primary'}>
                                save as draft
                            </Button>
                        </div>
                    }
                </CardActions>
            </Card>
        </>
    );
};