import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import Dialog from "../../app/Dialog";

import { GeneralForm } from "../../app/Forms";
import { baseDelete, fetcher, basePatch, basePost } from "../../api";

export default function CatTypeFamilyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose} title={`Manage Category - Satatus - Priority`}>
            <Box>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Category" />
                    <Tab label="Status" />
                    <Tab label="Priority" />
                </Tabs>
                {activeTab === 0 && (
                    <GeneralForm
                        type="Category"
                        addRecord={(data) => basePost("/activitycategory", { name: data })}
                        deleteRecord={(data) => baseDelete("/activitycategory/" + data)}
                        getRecord={() => fetcher("/activitycategory")}
                        updateRecord={(id, data) => basePatch("/activitycategory/" + id, { name: data })}
                    />
                )}
                {activeTab === 1 && (
                    <GeneralForm
                        type="Status"
                        addRecord={(data) => basePost("/activitystatus", { name: data })}
                        deleteRecord={(data) => baseDelete("/activitystatus/" + data)}
                        getRecord={() => fetcher("/activitystatus")}
                        updateRecord={(id, data) => basePatch("/activitystatus/" + id, { name: data })}
                    />
                )}
                {activeTab === 2 && (
                    <GeneralForm
                        type="Priority"
                        addRecord={(data) => basePost("/activitypriority", { name: data })}
                        deleteRecord={(data) => baseDelete("/activitypriority/" + data)}
                        getRecord={() => fetcher("/activitypriority")}
                        updateRecord={(id, data) => basePatch("/activitypriority/" + id, { name: data })}
                    />
                )}
            </Box>
        </Dialog>
    );
}
