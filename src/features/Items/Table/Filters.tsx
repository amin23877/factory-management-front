import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";

export const FilterByWord = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ padding: "0.5em 1em" }}>
            <Typography>Filter by word</Typography>
            <TextField label="Search..." fullWidth style={{ margin: "5px 0" }} />

            <FormControlLabel label="Filter 1" control={<CheckBox />} />
            <FormControlLabel label="Filter 1" control={<CheckBox />} />
            <FormControlLabel label="Filter 1" control={<CheckBox />} />
        </Box>
    );
};

export const FilterByValue = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ padding: "0.5em 1em" }}>
            <Typography>Filter by value</Typography>
            <Slider />
        </Box>
    );
};
