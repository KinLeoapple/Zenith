import {Close} from "@mui/icons-material";
import {Button} from "@mui/joy";
import {setBlogValue} from "@/assets/lib/data/reducer/blog/blog_slice.js";
import {setContentValue} from "@/assets/lib/data/reducer/blog/blog_content_slice.js";
import {newSearchBlogKeyword, setSearchBlogKeyword} from "@/assets/lib/data/reducer/blog/search_keyword_slice.js";
import {setShowResultValue} from "@/assets/lib/data/reducer/blog/show_search_result_slice.js";
import {useDispatch} from "react-redux";

export const GoBackButton = () => {
    const dispatch = useDispatch();

    function goBack() {
        dispatch(setBlogValue(0));
        dispatch(setContentValue(""));
        dispatch(setSearchBlogKeyword(newSearchBlogKeyword("")));
        dispatch(setShowResultValue(false));
    }

    return (
        <>
            <Button tabIndex={-1} onClick={goBack} color="neutral" variant="solid" sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                zIndex: 1,
                position: "absolute",
                marginTop: "-15px",
                marginLeft: "calc(100% - 35px)",
                boxShadow: "lg",
                border: "1px solid",
                borderColor: "var(--variant-outlinedBorder, var(--joy-palette-primary-outlinedBorder, var(--joy-palette-primary-300, #97C3F0)))",
                background: "var(--joy-palette-background-surface)",
                color: "rgba(var(--joy-palette-danger-mainChannel) / 1)",
                transition: "all .2s",
                "&:hover": {
                    color: "white",
                    background: "rgba(var(--joy-palette-danger-mainChannel) / 1)",
                }
            }}>
                <Close style={{
                    width: "30px",
                    height: "30px",
                }}/>
            </Button>
        </>
    )
}