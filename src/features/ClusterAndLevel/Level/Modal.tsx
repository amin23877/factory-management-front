import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";

import Button from "../../../app/Button";
import FieldForm from "./Form";
import FieldTable from "./Table";

import { IField } from "../../../api/field";

export const AddFieldModal = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedField, setSelectedField] = useState<IField>();

    return (
        <Box m={3}>
            <Tabs
                value={activeTab}
                onChange={(e, nv) => {
                    setActiveTab(nv);
                    setSelectedField(undefined);
                }}
            >
                <Tab label="List" />
                <Tab label="Form" />
            </Tabs>
            {activeTab === 0 ? (
                <div>
                    <Box display="grid" gridTemplateColumns=" 1fr" gridRowGap={12} gridColumnGap={12}>
                        <Button
                            kind="add"
                            onClick={() => {
                                setActiveTab(1);
                                setSelectedField(undefined);
                            }}
                            style={{ margin: "10px auto" }}
                        >
                            Add Dynamic Level
                        </Button>
                    </Box>
                    <FieldTable
                        onRowSelected={(row) => {
                            setSelectedField(row);
                            setActiveTab(1);
                        }}
                    />
                </div>
            ) : (
                <FieldForm
                    initial={selectedField}
                    setActive={() => {
                        setActiveTab(0);
                    }}
                />
            )}
        </Box>
    );
};
