import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@material-ui/pickers";
import { GridFilterInputValueProps } from "@material-ui/data-grid";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const useStyles = makeStyles({
    root: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        paddingLeft: 20,
    },
});

export function DateInput(props: GridFilterInputValueProps) {
    const classes = useStyles();
    const { item, applyValue } = props;

    const handleFilterChange = (date: MaterialUiPickersDate) => {
        if (date) {
            applyValue({ ...item, value: date.toISOString() });
        }
    };

    return (
        <div className={classes.root}>
            <DatePicker name="custom-date-filter" value={item?.value} onChange={handleFilterChange} />
        </div>
    );
}
