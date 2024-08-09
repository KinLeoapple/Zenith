import {Button} from "@mui/joy";
import {Add} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {selectLoginState} from "@/assets/lib/data/reducer/login_state_slice";
import {selectUserBasicInfo} from "@/assets/lib/data/reducer/user_basic_info_slice";

export const CreateBlogButton = () => {
    const params = useParams();
    const loginState = useSelector(selectLoginState);
    const userBasicInfo = useSelector(selectUserBasicInfo);
    const userId = useRef<number | string>();
    const [isDisplay, setIsDisplay] = useState(false);

    useEffect(() => {
        if (location.pathname.split("/")[1] === "blog") {
            if (loginState) {
                userId.current = params.id ? params.id : userBasicInfo.id;
                if (userId.current === undefined || userId.current === null) {
                    setIsDisplay(false);
                } else {
                    setIsDisplay(userId.current === userBasicInfo.id);
                }
            } else {
                window.location.replace("/login");
            }
        }
    }, []);

    function newBlog(e:  React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation();
        window.location.replace("/writeblog");
    }

    return (
        <>{isDisplay &&
            <Button fullWidth={true} color={"primary"} variant={"soft"}
                    className={'capitalize'}
                    onClick={newBlog}
                    sx={{
                        boxShadow: "md"
                    }}
                    startDecorator={<Add/>}>
                new blog
            </Button>}
        </>
    );
};