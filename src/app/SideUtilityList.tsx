import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core";

export default withStyles((theme) => ({
    root: { display: "inline-flex", flexDirection: "column", backgroundColor: "#ffff", boxShadow: theme.shadows["4"], borderRadius: 50 },
}))(List);
