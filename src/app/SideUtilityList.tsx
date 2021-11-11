import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";

export default withStyles((theme) => ({
    root: {
        position: "sticky",
        top: 70,

        display: "inline-flex",
        flexDirection: "row",
        backgroundColor: "#ffff",
        boxShadow: theme.shadows["4"],
        borderRadius: 50,
        padding: "8px 4px",

        "& .MuiListItem-gutters": {
            padding: "4px 0",
        },
    },
}))(List);
