import { Grid } from "@material-ui/core";
import React from "react";

import { EditForm } from "./Forms";
import { IFieldService } from "../../api/fieldService";
import BaseDataGrid from "../../app/BaseDataGrid";

export default function FieldServiceDetails({ selectedFieldService, onDone }: { selectedFieldService: IFieldService; onDone: () => void }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <EditForm initialValues={selectedFieldService} onDone={onDone} />
            </Grid>
            <Grid item xs={12} md={9}>
                <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />
            </Grid>
        </Grid>
    );
}
