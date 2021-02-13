import React from "react";
import Box from "@material-ui/core/Box";
import { IActivity } from "../../api/activity";

import EditActivityForm from "./Forms";
import { BasePaper } from "../../app/Paper";

export default function EditForm({ selectedActivity, onDone }: { selectedActivity: IActivity; onDone: () => void }) {
    return (
        <Box>
            <BasePaper>
                <EditActivityForm init={selectedActivity} onDone={onDone} />
            </BasePaper>
        </Box>
    );
}
