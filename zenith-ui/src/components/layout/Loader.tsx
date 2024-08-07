import "@/assets/css/loader.css";
import {useColorScheme} from "@mui/joy";
import {useEffect, useState} from "react";
import {BG, BG_DARK, MAX_LOADER_WAITING} from "@/assets/lib/data/static.ts";

export const Loader = () => {
    const themeMode = useColorScheme();
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setDisplay(true);
        }, MAX_LOADER_WAITING * 1000);
    }, []);

    useEffect(() => {
        const loader = document.querySelector(".loader");
        if (loader)
            (loader.querySelectorAll(".dot") as NodeListOf<HTMLElement>).forEach(el => {
                el.style.border = `2px solid ${themeMode.mode === 'dark' ? BG_DARK : BG}`;
            });
    }, [themeMode]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${display ? 'opacity-100' : 'opacity-0'}`}>
            <div className="loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}