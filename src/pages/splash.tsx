import React from "react";
import { Typography, Box, useTheme } from "@material-ui/core";
import { FlashOnRounded } from "@material-ui/icons";

import "../styles/splash.css";

export default function SplashScreen() {
    const theme = useTheme();

    return (
        <Box
            bgcolor={theme.palette.secondary.main}
            style={{ width: "100vw", height: "100vh", padding: "0 1em" }}
            display="flex"
            justifyContent="space-between"
        >
            <Box id="flash-r"></Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                <FlashOnRounded
                    id="main-logo"
                    fontSize="large"
                    style={{ color: theme.palette.warning.main, fontSize: theme.typography.h1.fontSize }}
                />
            </Box>
            <Box id="flash-l"></Box>
        </Box>
    );
}
