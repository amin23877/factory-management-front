import React, { useCallback, useMemo, useState } from "react";
import { Box, Paper, Tabs, Tab } from "@material-ui/core";
import {
  GridColDef,
  GridFilterModelParams,
  GridPageChangeParams,
  GridSortModelParams,
} from "@material-ui/data-grid";
import useSWR from "swr";

import BaseDataGrid from "../../../app/BaseDataGrid";
import Details from "./Details";

const Inventory = () => {
  const { data: items, mutate: mutateItems } = useSWR("/quote");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [activeTab, setActiveTab] = useState(0);

  const gridColumns = useMemo<GridColDef[]>(() => {
    const res: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 4 },
      { field: "date", headerName: "Date", flex: 2 },
      { field: "name", headerName: "Name", flex: 4 },
      { field: "description", headerName: "Description", flex: 4 },
      { field: "section", headerName: "Section", flex: 2 },
      {
        field: "engineeringApproved",
        headerName: "E.A.",
        flex: 1,
        type: "boolean",
      },
      { field: "enable", headerName: "Enable", flex: 1, type: "boolean" },
    ];
    return res;
  }, [items]);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" my={2}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => setActiveTab(nv)}
        >
          <Tab label="List" />
          <Tab label="Details" disabled={!selectedItem} />
        </Tabs>
        <div style={{ flexGrow: 1 }} />
      </Box>
      <Box display="flex" alignItems="flex-start" mt={1}>
        <Box flex={11} ml={2}>
          {activeTab === 0 && items && (
            <Paper>
              <Box height={550}>
                <BaseDataGrid
                  rows={items || []}
                  cols={gridColumns}
                  onRowSelected={(d) => {
                    setSelectedItem(d);
                    setActiveTab(1);
                  }}
                />
              </Box>
            </Paper>
          )}
          {activeTab === 1 && (
            <Details selectedRow={selectedItem} />
            // <DetailTab
            //   onDone={mutateItems}
            //   selectedRow={selectedItem}
            //   onDocSelected={(d) => {
            //     setSelectedDoc(d);
            //     setEditDocModal(true);
            //   }}
            //   onNoteSelected={(d) => {
            //     setSelectedNote(d);
            //     setEditNoteModal(true);
            //   }}
            //   onStepSelected={(d) => {
            //     setSelectedStep(d);
            //     setEditStepModal(true);
            //   }}
            // />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
