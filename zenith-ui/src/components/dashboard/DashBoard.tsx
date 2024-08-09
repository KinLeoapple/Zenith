import {useSelector} from "react-redux";
import {selectLoginState} from "@/assets/lib/data/reducer/login_state_slice.js";
import {useEffect} from "react";

export const DashBoard = () => {
    const isLogin = useSelector(selectLoginState);

    useEffect(() => {
        if (!isLogin)
            window.location.replace("/login");
    }, [isLogin]);

    return (
        <></>
    )
}