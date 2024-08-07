import {
    Button,
    ButtonGroup,
    DialogContent,
    DialogTitle,
    Divider,
    Drawer,
    ModalClose,
    Sheet, useColorScheme,
} from "@mui/joy";
import {useDispatch, useSelector} from "react-redux";
import {selectDrawerOpen, setOpenValue} from "@/assets/lib/data/reducer/layout/drawer_open_slice";
import {DarkMode, LightMode} from "@mui/icons-material";

export const NavDrawer = () => {
    const radioItems = [
        {
            decorator: <LightMode/>,
            value: "light"
        } as const,
        {
            decorator: <DarkMode/>,
            value: "dark"
        } as const
    ]

    const {mode, setMode} = useColorScheme();
    const open = useSelector(selectDrawerOpen);
    const dispatch = useDispatch();

    function handleModeChange(mode: "light" | "dark") {
        setMode(mode);
    }

    return (
        <>
            <Drawer
                open={open} onClose={() => dispatch(setOpenValue(false))}
                anchor="right"
                color="primary"
                invertedColors
                size="md"
                variant="plain"
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: {md: 3, sm: 0},
                            boxShadow: 'none',
                        },
                    },
                }}>
                <Sheet
                    color="primary"
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>Settings</DialogTitle>
                    <ModalClose tabIndex={-1}/>
                    <Divider sx={{mt: 'auto'}}/>
                    <DialogContent sx={{gap: 2}}>
                        <ButtonGroup color={"primary"} sx={{
                            width: '100%'
                        }}>
                            {radioItems.map((item, index) => (
                                <Button key={index}
                                        tabIndex={-1}
                                        startDecorator={item.decorator}
                                        size={"lg"}
                                        color={"primary"}
                                        variant={"outlined"}
                                        onClick={() => handleModeChange(item.value)}
                                        sx={{
                                            width: '50%',
                                            backgroundColor: mode === item.value ?
                                                "var(--variant-outlinedHoverBg, var(--joy-palette-primary-outlinedHoverBg, var(--joy-palette-primary-100, #E3EFFB)))" :
                                                ""
                                        }}>
                                    {item.value}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </DialogContent>
                </Sheet>
            </Drawer>
        </>
    );
};