import {
    Grid,
} from "@mui/joy";
import {useCallback, useEffect, useState} from "react";
import {client_height, client_width} from "@/assets/lib/utils/client_size.js";
import {EditorSideBar} from "@/components/writer/EditorSideBar.tsx";
import {EditorTextArea} from "@/components/writer/EditorTextArea.tsx";
import {useDispatch} from "react-redux";
import {setEditorSizeValue} from "@/assets/lib/data/reducer/writer/editor_size_slice";

export const Editor = () => {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    const [width, setWidth] = useState(countWidth());
    const [height, setHeight] = useState(countHeight());

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            const width = countWidth();
            const height = countHeight();
            dispatch(setEditorSizeValue({ width, height }));
            window.removeEventListener('resize', onResize);
            window.addEventListener('resize', onResize);
        }
    }, []);

    const onResize = useCallback(() => {
        const width = countWidth();
        const height = countHeight();
        setWidth(width);
        setHeight(height);
        dispatch(setEditorSizeValue({ width, height }));
    }, []);

    function countWidth() {
        // let num = client_width() / 3 * 2;
        const num = client_width();
        if (num < 772) {
            return 772;
        }
        return num;
    }

    function countHeight() {
        // return width / 16 * 9;
        return client_height() - 96;
    }

    return (
        <div className={'ml-5 mr-5'} style={{
            width: `${width}px`
        }}>
            <Grid container spacing={2} columns={4} sx={{
                flexGrow: 1,
                minHeight: `${height}px`,
                maxHeight: `${height}px`,
            }}>
                <Grid xs={1}>
                    <EditorSideBar/>
                </Grid>
                <Grid xs={3}>
                    <EditorTextArea/>
                </Grid>
            </Grid>
        </div>
    )
}