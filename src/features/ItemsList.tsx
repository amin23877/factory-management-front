import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { FindInPageRounded, SearchRounded, AddRounded, DeleteRounded, CategoryRounded } from "@material-ui/icons";
import { DataGrid, RowData, ColDef } from "@material-ui/data-grid";

import { AddItemModal, DeleteItem } from "./Modals/ItemModals";
import { CategoryModal } from "./Modals/CategoryModals";

import { getItems } from "../api/items";
import { BasePaper } from "../app/Paper";
import { BaseTextInput } from "../app/Inputs";

function ItemsList({ onRowSelected }: { onRowSelected: (row: any) => void }) {
    const [rows, setRows] = useState([] as RowData[]);
    const [selItem, setSelItem] = useState<any>({});

    const [addItemModal, setAddItemModal] = useState(false);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [catModal, setCatModal] = useState(false);

    const cols: ColDef[] = [
        { field: "no", headerName: "Item no" },
        { field: "name", headerName: "Item name" },
        { field: "description", headerName: "desc" },
        { field: "category", valueGetter: (c) => c.data.Category.name, headerName: "cetegory" },
        { field: "type", valueGetter: (c) => c.data.Type.name, headerName: "type" },
        { field: "subtype", valueGetter: (c) => c.data.Subtype.name, headerName: "SubType" },
        { field: "active", headerName: "Active" },
        { field: "cost", headerName: "Cost" },
    ];

    useEffect(() => {
        getItems()
            .then((d) => {
                setRows(d);
            })
            .catch((e) => console.log(e));
    }, [addItemModal]);

    return (
        <Box my={2}>
            <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
            <DeleteItem open={deleteItemModal} onClose={() => setDeleteItemModal(false)} item={selItem} />
            <CategoryModal open={catModal} onClose={() => setCatModal(false)} />

            <Box display="flex" my={2}>
                <Button title="Add item" onClick={() => setAddItemModal(true)} variant="contained" color="primary">
                    <AddRounded />
                </Button>
                <Button
                    title="Delete item"
                    onClick={() => selItem && selItem.id && setDeleteItemModal(true)}
                    style={{ margin: "0 1em" }}
                    variant="contained"
                    color="primary"
                >
                    <DeleteRounded />
                </Button>
                <Button title="Categories" onClick={() => setCatModal(true)} variant="contained" color="primary">
                    <CategoryRounded />
                </Button>
            </Box>
            <BasePaper>
                <Box display="flex">
                    <Button color="primary" variant="contained">
                        <FindInPageRounded />
                        Filter
                    </Button>
                    <div style={{ flexGrow: 1 }} />
                    <Box display="flex">
                        <BaseTextInput placeholder="Search here..." />
                        <Button color="primary" variant="contained">
                            <SearchRounded />
                            Find
                        </Button>
                    </Box>
                </Box>
                <Box display="flex">
                    <div style={{ height: 450, width: "100%" }}>
                        <DataGrid
                            onRowSelected={(r) => {
                                onRowSelected(r.data);
                                setSelItem(r.data);
                            }}
                            columns={cols}
                            rows={rows}
                        />
                    </div>
                </Box>
            </BasePaper>
        </Box>
    );
}

export default ItemsList;
