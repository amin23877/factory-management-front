import React, { useMemo, useState } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import { BasePaper } from "../../../app/Paper";

import { General } from "./Forms";

function ItemsDetails({ selectedRow }: { selectedRow: any }) {
  const [activeTab, setActiveTab] = useState(0);
  const [moreInfoTab, setMoreInfoTab] = useState(0);
  const { data: rules, mutate: mutateItems } = useSWR("/quote");

  const gridColumns = useMemo<GridColDef[]>(() => {
    const res: GridColDef[] = [
      { field: "date", headerName: "Date", width: 150 },
      { field: "name", headerName: "Name", flex: 3 },
      { field: "number", headerName: "Number", flex: 2 },
      { field: "unit", headerName: "Unit Serial No.", flex: 2 },
      { field: "description", headerName: "SO", flex: 2 },
      { field: "section", headerName: "PO", flex: 2 },
      { field: "enable", headerName: "Pass/Fail", type: "boolean", width: 100 },
    ];
    return res;
  }, [rules]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={5} xs={12}>
          <BasePaper>
            <General />
          </BasePaper>
        </Grid>
        <Grid item md={7} xs={12}>
          <BasePaper
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs
              style={{ marginBottom: 16 }}
              value={moreInfoTab}
              variant="scrollable"
              textColor="primary"
              onChange={(e, v) => setMoreInfoTab(v)}
            >
              <Tab label="Equation factors modifications" />
            </Tabs>
            {moreInfoTab === 0 && <div></div>}
          </BasePaper>
        </Grid>
      </Grid>
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
