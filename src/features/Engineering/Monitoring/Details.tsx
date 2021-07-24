import React, { useMemo, useState } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import Button from "../../../app/Button";
import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { General } from "./Forms";

function ItemsDetails({ selectedRow }: { selectedRow: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const { data: rules, mutate: mutateItems } = useSWR("/quote");

  const gridColumns = useMemo<GridColDef[]>(() => {
    const res: GridColDef[] = [
      { field: "date", headerName: "Date", flex: 2 },
      { field: "name", headerName: "Name", flex: 4 },
      { field: "number", headerName: "Number", flex: 3 },
      { field: "unit", headerName: "Unit Serial No.", flex: 3 },
      { field: "description", headerName: "SO", flex: 3 },
      { field: "section", headerName: "PO", flex: 3 },
      { field: "enable", headerName: "Pass/Fail", flex: 1, type: "boolean" },
    ];
    return res;
  }, [rules]);

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    // try {
    //   const resp = await updateAnItem(selectedRow.id, data);
    //   if (resp) {
    //     setSubmitting(false);
    //     setShowSnack(true);
    //     setSnackMsg("Item updated !");
    //     onDone && onDone();
    //   }
    // } catch (error) {
    //   setShowSnack(true);
    //   setSnackMsg(`Error: ${error.error}`);
    // }
    console.log(data);
  };

  return (
    <Box>
      <BasePaper>
        <General />
      </BasePaper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BasePaper>
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              textColor="primary"
              variant="scrollable"
            >
              <Tab label="Rule History" />
            </Tabs>
            <Box p={3}>
              {activeTab === 0 && (
                <BaseDataGrid cols={gridColumns} rows={rules || []} />
              )}
            </Box>
          </BasePaper>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ItemsDetails;
