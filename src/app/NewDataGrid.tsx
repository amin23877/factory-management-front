import ReactDataGrid from "@inovua/reactdatagrid-community";
import { makeStyles } from "@material-ui/styles";

const gridStyle = { minHeight: "calc(100vh - 180px)" };

const useStyle = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});
export default function BaseDataGrid({ columns, dataSource, defaultFilterValue, style, className }) {
    const classes = useStyle();
    return (
        <ReactDataGrid
            columns={columns}
            dataSource={async ({ filterValue, limit, sortInfo, skip }) => ({ data: [], count: 0 })}
            defaultFilterValue={defaultFilterValue}
            style={gridStyle}
            className={classes.root}
        />
    );
}
