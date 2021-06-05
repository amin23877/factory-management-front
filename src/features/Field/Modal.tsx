import React, { useState } from "react";
import { Box, Divider, Tab, Tabs } from "@material-ui/core";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import FieldForm from "./Form";
import FieldTable from "./Table";

import { basePost } from "../../api";
import { IField } from "../../api/field";
import { mutate } from "swr";

export const AddFieldModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

    const [activeTab, setActiveTab] = useState(0);
    const [selectedField, setSelectedField] = useState<IField>();


    return (
        <Dialog open={open} onClose={onClose} maxWidth={activeTab === 0 ? "md" : "sm"} fullWidth title={"Add Field Modal"}>
            <Box m={3}>
                <Tabs value={activeTab} onChange={(e, nv) => { setActiveTab(nv); setSelectedField(undefined) }}>
                    <Tab label="List" />
                    <Tab label="Form" />
                </Tabs>
                {activeTab === 0 ?
                    <div>
                        <Box display="grid" gridTemplateColumns=" 1fr" gridRowGap={12} gridColumnGap={12}>
                            <Button kind="add"
                                onClick={() => {
                                    setActiveTab(1)
                                    setSelectedField(undefined)
                                }}
                                style={{ margin: '10px auto' }}>
                                Add Dynamic Filed
                                    </Button>
                        </Box>
                        <FieldTable onRowSelected={(row) => {
                            setSelectedField(row)
                            console.log(row)
                            setActiveTab(1);
                        }} />
                    </div>
                    :
                    <FieldForm
                        initial={selectedField}
                    />


                }
            </Box>
        </Dialog>
    );
};
