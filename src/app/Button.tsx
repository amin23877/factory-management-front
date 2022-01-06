import React from "react";
import { Button, ButtonProps, makeStyles, useMediaQuery } from "@material-ui/core";
import { AddRounded, EditRounded, DeleteRounded } from "@material-ui/icons";

import { Gradients } from "../theme";

interface IButton extends ButtonProps {
    kind?: "add" | "edit" | "delete";
}
export default function MyButton({ kind, ...props }: IButton) {
    const phone = useMediaQuery("(max-width:900px)");

    const useStyles = makeStyles(
        phone
            ? {
                  btnStyle: {
                      background: kind
                          ? kind === "add"
                              ? Gradients.success
                              : kind === "edit"
                              ? Gradients.warning
                              : Gradients.error
                          : "default",
                      borderRadius: "0.5em",
                      boxShadow: "none",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                  },
              }
            : {
                  btnStyle: {
                      background: kind
                          ? kind === "add"
                              ? Gradients.success
                              : kind === "edit"
                              ? Gradients.warning
                              : Gradients.error
                          : "default",
                      borderRadius: "0.5em",
                      boxShadow: "none",
                      paddingRight: "25px",
                      paddingLeft: "25px",
                  },
              }
    );
    let icons = {
        add: <AddRounded />,
        edit: <EditRounded />,
        delete: <DeleteRounded />,
    };

    const classes = useStyles();

    return (
        <Button
            className={classes.btnStyle}
            startIcon={!phone ? (kind ? icons[kind] : props.startIcon) : null}
            variant={kind ? "contained" : props.variant}
            color={kind ? "primary" : props.color}
            {...props}
        >
            {props.children}
        </Button>
    );
}
