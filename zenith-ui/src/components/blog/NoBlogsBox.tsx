import {Box, Typography} from "@mui/joy";
import {Pets} from "@mui/icons-material";

export const NoBlogsBox = () => {


    return (
        <>
            <Box display="flex" height="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                <Typography variant={"plain"} color={"primary"} sx={{
                    fontSize: "2rem",
                    marginLeft: 4,
                    transform: "rotate(45deg)",
                }}>
                    <Pets/>
                </Typography>
                <Typography variant={"plain"} color={"primary"} sx={{
                    marginRight: 4,
                    fontSize: "3rem",
                }}>
                    <Pets/>
                </Typography>
                <Typography className={'capitalize'} sx={{
                    marginTop: 4,
                }}>
                    <span style={{
                        fontSize: "2rem"
                    }}>s</span>
                    <span style={{
                        fontSize: "1.3rem"
                    }}>eems no blogs here...</span>
                </Typography>
            </Box>
        </>
    );
};