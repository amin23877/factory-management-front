import React, { useState } from "react";
import { Dialog, DialogTitle, Box, Tabs, Tab } from "@material-ui/core";

import { GeneralForm } from "../../app/Forms";
import { createCategory, deleteCategory, updateCategory, getCategories } from "../../api/category";
import { createType, deleteType, getTypes, updateType } from "../../api/types";
import { createFamily, deleteFamily, getFamilies, updateFamily } from "../../api/family";

export default function CatTypeFamilyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Manage <em>Categories - Types - Families</em>
            </DialogTitle>
            <Box>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <Tab label="Category" />
                    <Tab label="Type" />
                    <Tab label="Family" />
                </Tabs>
                {activeTab === 0 && (
                    <GeneralForm
                        type="Category"
                        addRecord={createCategory}
                        deleteRecord={deleteCategory}
                        getRecord={getCategories}
                        updateRecord={updateCategory}
                    />
                )}
                {activeTab === 1 && (
                    <GeneralForm
                        type="Type"
                        addRecord={createType}
                        deleteRecord={deleteType}
                        getRecord={getTypes}
                        updateRecord={updateType}
                    />
                )}
                {activeTab === 2 && (
                    <GeneralForm
                        type="Family"
                        addRecord={createFamily}
                        deleteRecord={deleteFamily}
                        getRecord={getFamilies}
                        updateRecord={updateFamily}
                    />
                )}
            </Box>
        </Dialog>
    );
}
