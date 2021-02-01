import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Button, Tabs, Tab } from "@material-ui/core";
import { RowData, ColDef } from "@material-ui/data-grid";
import { AddRounded, DeleteRounded, CategoryRounded } from "@material-ui/icons";

import { AddItemModal, DeleteItem } from "../features/Modals/ItemModals";
import CatTypeFamilyModal from "../features/Modals/CategoryModals";
import ItemsDetails from "../features/ItemsDetails";

import { getItems } from "../api/items";
import { AddItemInitialValues } from "../api/items";

import { MyTabs, MyTab } from "../app/Tabs";
import BaseDataGrid from "../app/BaseDataGrid";

const Inventory = () => {
    const [rows, setRows] = useState<RowData[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedItem, setSelectedItem] = useState({ ...AddItemInitialValues, id: "" });
    const [detailDis, setDetailDis] = useState(true);

    const [addItemModal, setAddItemModal] = useState(false);
    const [deleteItemModal, setDeleteItemModal] = useState(false);
    const [catModal, setCatModal] = useState(false);

    useEffect(() => {
        getItems()
            .then((d) => {
                console.log(d);

                setRows(d);
            })
            .catch((e) => console.log(e));
    }, [addItemModal]);

    const cols: ColDef[] = [
        { field: "no", headerName: "Item no" },
        { field: "name", headerName: "Item name" },
        { field: "description", headerName: "desc" },
        { field: "cost", headerName: "Cost" },
    ];

    return (
        <Container style={{ maxWidth: 1240 }}>
            <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
            <DeleteItem open={deleteItemModal} onClose={() => setDeleteItemModal(false)} item={selectedItem} />
            <CatTypeFamilyModal open={catModal} onClose={() => setCatModal(false)} />

            <Grid container>
                <Grid item xs={1} style={{ margin: "1em 0" }}>
                    <Box px={1} display="flex" flexDirection="column" my={2}>
                        <Button title="Add item" onClick={() => setAddItemModal(true)} variant="outlined">
                            <AddRounded />
                        </Button>
                        <Button
                            title="Delete item"
                            onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}
                            variant="outlined"
                            style={{ margin: "1em 0" }}
                        >
                            <DeleteRounded />
                        </Button>
                        <Button title="Categories" onClick={() => setCatModal(true)} variant="outlined">
                            <CategoryRounded />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={11}>
                    <Box display="flex" justifyContent="flex-end">
                        <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} textColor="secondary">
                            <MyTab color="primary" label="Overview" />
                            <MyTab label="Details" disabled={detailDis} />
                        </MyTabs>
                    </Box>
                    {activeTab === 0 && (
                        <BaseDataGrid
                            cols={cols}
                            rows={rows}
                            onRowSelected={(r) => {
                                setSelectedItem(r);
                                setDetailDis(false);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && <ItemsDetails selectedRow={selectedItem} />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Inventory;
