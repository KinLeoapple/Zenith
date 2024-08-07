import {
    createBrowserRouter,

} from "react-router-dom";

import {Blog} from "@/components/blog/Blog.js";
import {DashBoard} from "@/components/dashboard/DashBoard.tsx";
import {Login} from "@/components/login/Login.tsx";
import {SignUp} from "@/components/signup/SignUp.tsx";
import {Home} from "@/components/home/Home.tsx";
import {Writer} from "@/components/writer/Writer.tsx";

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/blog",
        element: <Blog/>,
    },
    {
        path: "/blog/:id",
        element: <Blog/>,
    },
    {
        path: "/writeblog",
        element: <Writer/>
    },
    {
        path: "/writeblog/:id",
        element: <Writer/>
    },
    {
        path: "/dashboard",
        element: <DashBoard/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <SignUp/>,
    }
]);

export default routers;