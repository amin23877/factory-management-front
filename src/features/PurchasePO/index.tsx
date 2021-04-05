import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, PrintRounded, PostAddRounded } from "@material-ui/icons";
import { ColDef } from "@material-ui/data-grid";

import List from "../../app/SideUtilityList";
import BaseDataGrid from "../../app/BaseDataGrid";

import AddPOModal from "./AddPurchasePO";
import AddLineItem from "../LineItem";
import Details from "./Details";

import Confirm from "../Modals/Confirm";

import { getPurchasePOs, deletePurchasePO, IPurchasePO, getPurchasePOLines, IPurchasePOLine } from "../../api/purchasePO";

function Index() {
    const [activeTab, setActiveTab] = useState(0);
    const [addPO, setAddPO] = useState(false);
    const [addLineItem, setAddLineItem] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [pos, setPOs] = useState([]);
    const [lines, setLines] = useState([]);

    const [selectedLine, setSelectedLine] = useState<IPurchasePOLine>();
    const [selPO, setSelPO] = useState<IPurchasePO>();

    const cols: ColDef[] = [
        { field: "number", headerName: "Number" },
        { field: "requester", headerName: "Requester" },
        { field: "VendorId" },
        { field: "ContactId" },
        { field: "EmployeeId" },
    ];

    const refreshLines = async () => {
        try {
            if (selPO && selPO.id) {
                const resp = await getPurchasePOLines(selPO.id);
                resp && setLines(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshPOs = async () => {
        try {
            const resp = await getPurchasePOs();
            resp && setPOs(resp);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            if (selPO && selPO.id) {
                const resp = await deletePurchasePO(selPO.id);
                if (resp) {
                    refreshPOs();
                    setConfirm(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        refreshPOs();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            refreshLines();
        }
    }, [activeTab]);

    return (
        <Box display="grid" gridTemplateColumns="1fr 11fr">
            <AddPOModal open={addPO} onClose={() => setAddPO(false)} onDone={refreshPOs} />
            {selPO && selPO.id && (
                <AddLineItem
                    selectedLine={selectedLine}
                    open={addLineItem}
                    onClose={() => setAddLineItem(false)}
                    onDone={refreshLines}
                    record="purchasePO"
                    recordId={selPO.id}
                />
            )}
            {selPO && (
                <Confirm
                    open={confirm}
                    onClose={() => setConfirm(false)}
                    onConfirm={handleDelete}
                    text={`Are you sure? You are going to delete purchase PO ${selPO?.number}`}
                />
            )}

            <Box>
                <List>
                    <ListItem>
                        <IconButton
                            onClick={() => {
                                setSelPO(undefined);
                                setAddPO(true);
                            }}
                        >
                            <AddRounded />
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={() => setConfirm(true)}>
                            <DeleteRounded />
                        </IconButton>
                    </ListItem>
                    {activeTab === 1 && (
                        <ListItem>
                            <IconButton
                                onClick={() => {
                                    setSelectedLine(undefined);
                                    setAddLineItem(true);
                                }}
                                title="Add new line item"
                            >
                                <PostAddRounded />
                            </IconButton>
                        </ListItem>
                    )}
                    <ListItem>
                        <IconButton>
                            <PrintRounded />
                        </IconButton>
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Tabs style={{ marginBottom: "1em" }} value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="List" />
                    <Tab label="Details" disabled={!selPO} />
                </Tabs>
                {activeTab === 0 && (
                    <BaseDataGrid
                        cols={cols}
                        rows={pos}
                        onRowSelected={(d) => {
                            setSelPO(d);
                            setActiveTab(1);
                        }}
                    />
                )}
                {activeTab === 1 && selPO && (
                    <Details
                        initialValues={selPO}
                        onDone={refreshPOs}
                        lines={lines}
                        onLineSelected={(d) => {
                            setSelectedLine(d);
                            setAddLineItem(true);
                        }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default Index;
