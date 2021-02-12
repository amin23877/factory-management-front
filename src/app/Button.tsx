import React from "react";
import { Button, ButtonProps, makeStyles } from "@material-ui/core";
import { AddRounded, EditRounded, DeleteRounded } from "@material-ui/icons";

import { Gradients } from "../theme";

interface IButton extends ButtonProps {
    kind?: "add" | "edit" | "delete";
}
export default function MyButton({ kind, ...props }: IButton) {
    const useStyles = makeStyles({
        btnStyle: {
            background: kind ? (kind === "add" ? Gradients.success : kind === "edit" ? Gradients.warning : Gradients.error) : "default",
        },
    });
    let icons = {
        add: <AddRounded />,
        edit: <EditRounded />,
        delete: <DeleteRounded />,
    };

    const classes = useStyles();

    return (
        <Button
            className={classes.btnStyle}
            startIcon={kind ? icons[kind] : props.startIcon}
            variant={kind ? "contained" : props.variant}
            color={kind ? "primary" : props.color}
            {...props}
        >
            {props.children}
        </Button>
    );
}
