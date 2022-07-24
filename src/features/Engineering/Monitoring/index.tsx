import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import DataGrid from "../../../app/NewDataGrid";
import Details from "./Details";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { BasePaper } from "../../../app/Paper";

const Monitoring = () => {
  const [selectedItem, setSelectedItem] = useState<any>({ id: "", assertion: "", vars: [], date: new Date() });
  const [activeTab, setActiveTab] = useState(0);

  const gridColumns = useMemo(
    () => [
      { name: "id", header: "Rule ID", minWidth: 150 },
      {
        name: "date",
        header: "Date",
        minWidth: 110,
        type: "date",
      },
      { name: "name", header: "Name", minWidth: 150 },
      { name: "description", header: "Description", minWidth: 150, flex: 1 },
      { name: "section", header: "Section", minWidth: 110 },
      {
        name: "engAP",
        header: "Eng.A.",
        type: "boolean",
      },
      { name: "enable", header: "Enable", type: "boolean" },
    ],
    []
  );

  return (
    <BasePaper>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded style={{ marginRight: "5px" }} /> List
              </span>
            }
            wrapped
          />
          <Tab
            disabled={!selectedItem}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded style={{ marginRight: "5px" }} /> Details
              </span>
            }
          />
        </Tabs>
        <div style={{ flexGrow: 1 }} />
      </Box>
      <Box display="flex" alignItems="flex-start">
        <Box flex={11}>
          <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
            <DataGrid
              url="/monitor"
              columns={gridColumns}
              onRowSelected={(d) => {
                setSelectedItem(d);
                setActiveTab(1);
              }}
            />
          </div>
          {activeTab === 1 && <Details selectedRow={selectedItem} />}
        </Box>
      </Box>
    </BasePaper>
  );
};

export default Monitoring;
