import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import Dialog from "../../app/Dialog";

import { GeneralForm } from "../../app/Forms";
import { delete_, fetcher, patch, post } from "../../api";

export default function CatTypeFamilyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Dialog open={open} onClose={onClose} title={`Manage Category - Satatus - Priority`}>
      {/* <Box>
                <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Category" />
                    <Tab label="Status" />
                    <Tab label="Priority" />
                </Tabs>
                {activeTab === 0 && (
                    <GeneralForm
                        type="Category"
                        addRecord={(data) => post("/activitycategory", { name: data })}
                        deleteRecord={(data) => delete_("/activitycategory/" + data)}
                        getRecord={() => fetcher("/activitycategory")}
                        updateRecord={(id, data) => patch("/activitycategory/" + id, { name: data })}
                    />
                )}
                {activeTab === 1 && (
                    <GeneralForm
                        type="Status"
                        addRecord={(data) => post("/activitystatus", { name: data })}
                        deleteRecord={(data) => delete_("/activitystatus/" + data)}
                        getRecord={() => fetcher("/activitystatus")}
                        updateRecord={(id, data) => patch("/activitystatus/" + id, { name: data })}
                    />
                )}
                {activeTab === 2 && (
                    <GeneralForm
                        type="Priority"
                        addRecord={(data) => post("/activitypriority", { name: data })}
                        deleteRecord={(data) => delete_("/activitypriority/" + data)}
                        getRecord={() => fetcher("/activitypriority")}
                        updateRecord={(id, data) => patch("/activitypriority/" + id, { name: data })}
                    />
                )}
            </Box> */}
    </Dialog>
  );
}
