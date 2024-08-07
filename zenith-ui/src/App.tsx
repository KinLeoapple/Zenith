import './App.css'
import {RouterProvider} from "react-router-dom";
import routers from "@/router.js";
import {useColorScheme} from "@mui/joy";
import {useEffect, useRef} from "react";
import {BG, BG_DARK} from "@/assets/lib/data/static.js";
import PerfectScrollbar from "react-perfect-scrollbar";
import {useSelector} from "react-redux";
import {selectLocation} from "@/assets/lib/data/reducer/layout/location_slice.js";

function App() {
    const themeMode = useColorScheme();
    const location = useSelector(selectLocation);
    const scrollbarRef = useRef(null);

    useEffect(() => {
        document.body.classList.remove(BG_DARK);
        document.body.classList.remove(BG);
        document.body.classList.add(themeMode.mode === 'dark' ? BG_DARK : BG);
    }, [themeMode]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        scrollbarRef.current.updateScroll()
    }, [location]);

    return (
        <PerfectScrollbar ref={scrollbarRef}>
            <div className={`min-w-full max-w-full min-h-full max-h-full ${themeMode.mode === 'dark' ? BG_DARK : BG}`}>
                <RouterProvider router={routers}/>
            </div>
        </PerfectScrollbar>
    )
}

export default App
