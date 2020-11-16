import React from "react";
import { Select, SelectProps, MenuItem, InputBase, InputBaseProps, withStyles, fade } from "@material-ui/core";

export const BaseSelect = withStyles({
    root: {
        borderRadius: 20,
    },
})((props: SelectProps) => <Select variant="outlined" {...props} />);

export const BaseTextInput = withStyles((theme) => ({
    root: {
        backgroundColor: fade(theme.palette.common.black, 0.05),
        padding: "4px 1em",
        borderRadius: 10,
        width: "100%",
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
    },
}))((props: InputBaseProps) => <InputBase {...props} />);
