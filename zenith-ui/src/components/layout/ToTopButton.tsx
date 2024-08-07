import {ExpandLess} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/joy";
import {smooth_scroll_to_top} from "@/assets/lib/utils/scroll.js";

export const ToTopButton = () => {
    return (
        <div tabIndex={-1} className={'fixed z-[999] bottom-5 right-5 m-auto'}>
            <Tooltip tabIndex={-1} title="Sroll to top" placement="left"
                     size="sm">
                <IconButton tabIndex={-1} onClick={smooth_scroll_to_top} color="primary" variant="soft" sx={{
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    border: "1px solid",
                    borderColor: "var(--variant-outlinedBorder, var(--joy-palette-primary-outlinedBorder, var(--joy-palette-primary-300, #97C3F0)))",
                    boxShadow: "lg",
                }}>
                    <ExpandLess/>
                </IconButton>
            </Tooltip>
        </div>
    )
}