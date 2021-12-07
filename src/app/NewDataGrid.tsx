import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    Checkbox,
    useMediaQuery,
    IconButton,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { CheckRounded, ClearRounded, MenuRounded, MoreVertRounded } from "@material-ui/icons";
import moment from "moment";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import BoolFilter from "@inovua/reactdatagrid-community/BoolFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

import { get } from "../api";

import { formatTimestampToDate } from "../logic/date";
import { ParameterType } from "../logic/utils";

window.moment = moment;

const useStyle = makeStyles({
    root: {
        "& .InovuaReactDataGrid__column-header": {
            background: "#202731",
            color: "#fff",
        },
    },
});

const getOperator = (op: string) => {
    switch (op) {
        case "contains":
            return "contain";
        case "startsWith":
            return "startsWith";
        case "endsWith":
            return "endsWith";
        case "lt":
            return "max";
        case "gt":
            return "min";
        case "before":
            return "max";
        case "after":
            return "min";
        default:
            return "";
    }
};

const gridStyle = { minHeight: "calc(100vh - 200px)" };
const mobileGridStyle = { minHeight: "calc(100vh - 250px)" };
const green = {
    color: "#12AE25",
    width: "100%",
    display: "flex",
    justifyContent: "center ",
    alignItems: "center",
};
const red = { color: "#F53636", width: "100%", display: "flex", justifyContent: "center ", alignItems: "center" };
const filterTypes = {
    boolean: {
        type: "boolean",
        emptyValue: false,
        operators: [
            {
                name: "neq",
                fn: ({ value, filterValue }: any) => value !== filterValue,
            },
            {
                name: "eq",
                fn: ({ value, filterValue }: any) => value === filterValue,
            },
        ],
    },
    string: {
        type: "string",
        emptyValue: "",
        operators: [
            {
                name: "startsWith",
                fn: ({ value, filterValue }: any) => {
                    return !filterValue ? true : Boolean(value.startsWith(filterValue));
                },
            },
            {
                name: "contains",
                fn: ({ value, filterValue }: any) => {
                    return !filterValue ? true : value.indexOf(filterValue) !== -1;
                },
            },
            {
                name: "eq",
                fn: ({ value, filterValue }: any) => value === filterValue,
            },
        ],
    },
    number: {
        type: "number",
        emptyValue: null,
        operators: [
            {
                name: "eq",
                fn: ({ value, filterValue }: any) => value === filterValue,
            },
            {
                name: "lt",
                fn: ({ value, filterValue }: any) => value < filterValue,
            },
            {
                name: "gt",
                fn: ({ value, filterValue }: any) => value > filterValue,
            },
        ],
    },
    date: {
        type: "date",
        emptyValue: null,
        operators: [
            {
                name: "eq",
                fn: ({ value, filterValue }: any) => value === filterValue,
            },
            {
                name: "before",
                fn: ({ value, filterValue }: any) => value < filterValue,
            },
            {
                name: "after",
                fn: ({ value, filterValue }: any) => value > filterValue,
            },
        ],
    },
};

function NewDataGrid({
    onRowSelected,
    columns,
    style,
    url,
    initParams,
}: {
    onRowSelected: (row: any) => void;
    columns: any[];
    style?: any;
    url: string;
    initParams?: ParameterType;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [columnsState, setColumnsState] = useState<any[]>(columns.map((c) => ({ ...c, visible: true })));
    const classes = useStyle();
    const phone = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        setColumnsState(columns.map((c) => ({ ...c, visible: true })));
    }, [columns]);

    const cols = useMemo(() => {
        let res: any[] = columnsState;
        if (res) {
            res = res.map((r) => {
                if (r.type === "boolean") {
                    r = {
                        ...r,
                        minWidth: 50,
                        maxWidth: 80,
                        filterEditor: BoolFilter,
                        render: ({ data }: any) =>
                            data[r.name] ? (
                                <div style={green}>
                                    <CheckRounded />
                                </div>
                            ) : (
                                <div style={red}>
                                    <ClearRounded />
                                </div>
                            ),
                    };
                }
                if (r.type === "number") {
                    r = {
                        ...r,
                        filterEditor: NumberFilter,
                    };
                }
                if (r.type === "date") {
                    r = {
                        ...r,
                        dateFormat: "x",
                        filterEditor: DateFilter,
                        render: ({ value, cellProps: { dateFormat } }: { value: any; cellProps: any }) =>
                            formatTimestampToDate(value),
                    };
                }
                return r;
            });
        }
        return res;
    }, [columnsState]);

    const defaultFilterValue = useMemo(() => {
        let res = columns.map(({ name, type }) => ({
            name,
            operator: type ? "eq" : "startsWith",
            type: type ? type : "string",
            value: type === "date" ? "" : undefined,
        }));

        return res;
    }, [columns]);

    const fetchData = useCallback(
        async ({
            filterValue,
            limit,
            sortInfo,
            skip,
        }): Promise<{
            data: any[];
            count: number;
        }> => {
            let params: any = { ...initParams };
            for (const fv of filterValue) {
                if (fv.value) {
                    params[getOperator(fv.operator) + fv.name] = fv.value;
                }
            }
            if (limit) {
                params.pageSize = limit;
            }
            if (skip) {
                params.page = skip / limit + 1;
            }
            if (sortInfo) {
                params.sort = sortInfo.name;
                params.order = sortInfo.dir === 1 ? "ASC" : "DESC";
            }

            try {
                const d = await get(url, { params });
                return { data: d.result, count: d.total };
            } catch (e) {
                console.log(e);
                return { data: [], count: 0 };
            }
        },
        [initParams, url]
    );

    const handleToggleVisible = (index: number, visible: boolean) => {
        setColumnsState((prev) => {
            let temp = prev.concat();
            temp[index].visible = visible;

            return temp;
        });
    };

    const getTotalVisibleColumns = (arr: any[]) => {
        const res = arr.reduce((total, { visible }) => {
            if (visible) {
                return total + 1;
            }
            return total;
        }, 0);

        return res;
    };

    const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setColumnsState((prev) => {
            return prev.concat().map((c) => ({ ...c, visible: e.target.checked }));
        });
    };

    return (
        <Box width="100%" flex={1} position="relative">
            <Button
                title="Culomns"
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 5,
                    padding: "7px 0px",
                    minWidth: "15px",
                    display: "flex",
                    alignItems: "center",
                }}
                variant="contained"
                color="primary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <MoreVertRounded />
            </Button>
            {/* <IconButton
                style={{ position: "absolute", top: 0, right: 0, zIndex: 5 }}
                color="primary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <MenuRounded />
            </IconButton> */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} keepMounted>
                <Box style={{ width: 200, maxHeight: 300, overflowY: "auto" }}>
                    <List dense>
                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                    checked={getTotalVisibleColumns(columnsState) === columnsState.length}
                                    onChange={handleToggleAll}
                                />
                            </ListItemIcon>
                            <ListItemText>All</ListItemText>
                        </ListItem>
                        {columnsState &&
                            columnsState.map(({ name, header, visible }: any, i: number) => (
                                <ListItem key={i}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={visible}
                                            onChange={(e) => handleToggleVisible(i, e.target.checked)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>{header || name}</ListItemText>
                                </ListItem>
                            ))}
                    </List>
                </Box>
            </Menu>
            <ReactDataGrid
                idProperty="id"
                rowHeight={20}
                columns={cols}
                dataSource={fetchData}
                style={style ? style : phone ? mobileGridStyle : gridStyle}
                defaultFilterValue={defaultFilterValue}
                onRowClick={({ data }) => onRowSelected(data)}
                showColumnMenuTool={false}
                pagination
                defaultLimit={100}
                className={classes.root}
                filterTypes={filterTypes}
            />
        </Box>
    );
}

export default NewDataGrid;
