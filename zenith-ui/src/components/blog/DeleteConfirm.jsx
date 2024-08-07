import {Box, Button, Modal, ModalDialog, Typography} from "@mui/joy";
import {useEffect, useState} from "react";
import {delete_blog} from "@/assets/lib/api/api.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectBlogDelete, setBlogDeleteValue} from "@/assets/lib/data/reducer/blog/blog_delete_slice.js";

export const DeleteConfirm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogDelete = useSelector(selectBlogDelete);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (blogDelete === 0) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [blogDelete]);

    function deleteBlog() {
        delete_blog(localStorage.getItem("token"), blogDelete).then(r => {
            if (r !== null) {
                if (r.deleted) {
                    navigate("/blog", {replace: true});
                }
            }
        });
    }

    function continueAction() {
        setOpen(false);
        deleteBlog();
    }

    function cancelAction() {
        setOpen(false);
        dispatch(setBlogDeleteValue(0));
    }

    return (
        <>
            <Modal keepMounted open={open} onClose={cancelAction}>
                <ModalDialog
                    color="primary"
                    variant="outlined"
                    sx={(theme) => ({
                        [theme.breakpoints.only('xs')]: {
                            top: 'unset',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                            transform: 'none',
                            maxWidth: 'unset',
                        },
                    })}
                >
                    <Typography id="nested-modal-title" level="h4">
                        Are you absolutely sure?
                    </Typography>
                    <Typography id="nested-modal-description" textColor="text.tertiary">
                        This action cannot be undone. This will permanently delete
                        and remove your data.
                    </Typography>
                    <Box
                        sx={{
                            mt: 1,
                            display: 'flex',
                            gap: 1,
                            flexDirection: { xs: 'column', sm: 'row-reverse' },
                        }}
                    >
                        <Button tabIndex={-1} variant="solid" color="primary" onClick={continueAction}>
                            Continue
                        </Button>
                        <Button
                            tabIndex={-1}
                            variant="outlined"
                            color="neutral"
                            onClick={cancelAction}
                        >
                            Cancel
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    )
}