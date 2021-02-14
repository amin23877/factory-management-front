import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { ColDef } from "@material-ui/data-grid";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import AddRounded from "@material-ui/icons/AddRounded";
import CategoryRounded from "@material-ui/icons/CategoryRounded";

import Snack from "../app/Snack";
import Button from "../app/Button";
import BaseDateGrid from "../app/BaseDataGrid";
import { MyTabs, MyTab } from "../app/Tabs";

import Confirm from "../features/Modals/Confirm";
import EditForm from "../features/Activity/EditForm";
import CatStatusPrioModal from "../features/Activity/CatStatusPrioModal";
import AddActivityModal from "../features/Activity/AddActivityModal";

import { getActivities, IActivity, deleteActivity } from "../api/activity";

export default function Activity() {
    const [activeTab, setActiveTab] = useState(0);
    const [addActivity, setAddActivity] = useState(false);
    const [catStatPrio, setCatStatPrio] = useState(false);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity>();

    const [confirm, setConfirm] = useState(false);
    const [snack, setSnack] = useState(false);
    const [msg, setMsg] = useState("");

    const cols: ColDef[] = [{ field: "name" }, { field: "subject" }, { field: "location" }];

    const refreshActivities = async () => {
        try {
            const resp = await getActivities();
            setActivities(resp);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshActivities();
    }, []);

    const handleDelete = async () => {
        try {
            if (selectedActivity && selectedActivity.id) {
                const resp = await deleteActivity(selectedActivity.id);
                if (resp) {
                    setActiveTab(0);
                    setSelectedActivity(undefined);
                    refreshActivities();
                    setConfirm(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Snack open={snack} onClose={() => setSnack(false)}>
                {msg}
            </Snack>
            <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
            <AddActivityModal open={addActivity} onClose={() => setAddActivity(false)} onDone={refreshActivities} />
            <CatStatusPrioModal open={catStatPrio} onClose={() => setCatStatPrio(false)} />

            <Box my={1} display="flex" justifyContent="flex-end" alignItems="center">
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                    <MyTab label="List" />
                    <MyTab label="Details" />
                </MyTabs>
            </Box>
            <Box display="flex" alignItems="flex-start" mt={1}>
                <Box flex={1} height="200px" display="flex" flexDirection="column" mr={1}>
                    <Button variant="outlined" onClick={() => setAddActivity(true)}>
                        <AddRounded />
                    </Button>
                    <Button variant="outlined" disabled={!selectedActivity} onClick={() => setConfirm(true)} style={{ margin: "0.5em 0" }}>
                        <DeleteRounded />
                    </Button>
                    <Button variant="outlined" style={{ margin: "0.5em 0" }} onClick={() => setCatStatPrio(true)}>
                        <CategoryRounded />
                    </Button>
                </Box>
                <Box flex={11}>
                    {activeTab === 0 && (
                        <BaseDateGrid
                            cols={cols}
                            rows={activities}
                            onRowSelected={(d) => {
                                setSelectedActivity(d);
                                setActiveTab(1);
                            }}
                        />
                    )}
                    {activeTab === 1 && selectedActivity && (
                        <EditForm
                            onDone={() => {
                                setMsg("Updated...");
                                setSnack(true);
                                refreshActivities();
                            }}
                            selectedActivity={selectedActivity}
                        />
                    )}
                </Box>
            </Box>
        </Container>
    );
}
