import React from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    right: {
        textAlign: "right",
        direction: "rtl",
    },
    left: {
        textAlign: "left",
        direction: "ltr",
    },
});

export default function ChatList({ user }: { user: any }) {
    const classes = useStyles();

    return (
        <div>
            <Typography style={{ textAlign: "center" }} variant="h6">
                {user}
            </Typography>
            <List>
                <ListItem className={classes.right}>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText>test</ListItemText>
                </ListItem>
                <ListItem className={classes.left}>
                    <ListItemAvatar>
                        <Avatar />
                    </ListItemAvatar>
                    <ListItemText>test</ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
