import React, { useState } from "react";
import { Box, Tab, Tabs } from "@material-ui/core";

import Dialog from "../../app/Dialog";
import Button from "../../app/Button";
import FilterForm, { ApplyFilterForm } from "./Forms";
import { IFilter } from "../../api/filter";
import FilterTable from "./Table";

export default function FiltersModal() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState<IFilter>();

    return (
        <Box p={1} display="flex" flexDirection="column">
            <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                <Tab label="List" />
                <Tab label="Form" />
            </Tabs>
            {activeTab === 0 && (
                <>
                    <Button
                        kind="add"
                        style={{ margin: "1em 0" }}
                        onClick={() => {
                            setSelectedFilter(undefined);
                            setActiveTab(1);
                        }}
                    >
                        Add new
                    </Button>
                    <FilterTable
                        onFilterSelected={(f) => {
                            setSelectedFilter(f);
                            setActiveTab(1);
                        }}
                    />
                </>
            )}
            {activeTab === 1 && <FilterForm initialValues={selectedFilter} />}
        </Box>
    );
}

export const ApplyFilterModal = ({
    open,
    onClose,
    setter,
}: {
    open: boolean;
    onClose: () => void;
    setter: (a: any) => void;
}) => {
    return (
        <Dialog open={open} onClose={onClose} title="Filters" maxWidth="sm">
            <Box p={2} display="flex" alignItems="flex-start">
                <ApplyFilterForm applyFilter={setter} />
            </Box>
        </Dialog>
    );
};
