import React, { useState, useEffect } from "react";
import { useTheme, Box, Typography, makeStyles } from "@material-ui/core";

import RCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const useStyles = makeStyles((theme) => ({
    calendarTile: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.warning.main,
        borderRadius: 15,
    },
    calendar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.warning.main}`,
        borderRadius: 15,
    },
}));

export const Calendar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [date, setDate] = useState({ h: "", m: "" });

    useEffect(() => {
        const inter = setInterval(() => {
            const now = new Date();
            setDate({ h: now.getHours().toString(), m: now.getMinutes().toString() });
        }, 5000);

        return () => clearInterval(inter);
    }, []);

    return (
        <Box style={{ width: "100%" }}>
            <Typography style={{ color: theme.palette.warning.main }} variant="h4">
                {date.h + ":" + date.m}
            </Typography>
            <RCalendar className={classes.calendar} showNavigation={false} tileClassName={classes.calendarTile} />
        </Box>
    );
};
