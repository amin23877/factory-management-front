import React, { useState } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { ListAltRounded, FindInPageRounded } from "@material-ui/icons";

import AddRep from "./AddRep";
import Details from "./Details";
import { BasePaper } from "app/Paper";
import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";

import { repType } from "api/rep";

const columns = [
  {
    name: "number",
    width: 90,
    header: "ID",
  },
  {
    name: "name",
    minWidth: 120,
    header: "Name",
  },
  {
    name: "state",
    width: 90,
    header: "State",
  },
  {
    name: "city",
    width: 90,
    header: "City",
  },
  {
    name: "zip",
    header: "Zip Code",
    width: 90,
  },
  {
    name: "productLine",
    minWidth: 120,
    header: "Product Line",
  },
  {
    name: "contact",
    header: "Main Contact",
    minWidth: 130,
    render: ({ data }: any) => data?.contact?.firstName,
    hide: true,
  },

  {
    name: "phone",
    header: "Phone",
    minWidth: 150,
  },
  {
    name: "email",
    header: "Email",
    minWidth: 150,
    hide: true,
  },
  {
    name: "type",
    header: "Type",
    width: 100,
  },
  {
    name: "status",
    width: 100,
    header: "Status",
  },
];

export default function RepIndex() {
  const phone = useMediaQuery("(max-width:900px)");
  const [activeTab, setActiveTab] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [addRep, setAddRep] = useState(false);
  const [selectedRep, setSelectedRep] = useState<repType>();

  return (
    <>
      <AddRep open={addRep} onClose={() => setAddRep(false)} onDone={() => setRefresh((p) => p + 1)} />
      <BasePaper>
        <Box mb={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            textColor="primary"
            variant="scrollable"
            scrollButtons={phone ? "on" : "auto"}
            style={phone ? { width: "calc(100vw - 50px)" } : {}}
          >
            <Tab
              icon={
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ListAltRounded style={{ marginRight: "5px" }} /> List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={!selectedRep}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
          <div style={{ flex: 1 }}></div>
          <Button kind="add" onClick={() => setAddRep(true)}>
            Add
          </Button>
        </Box>
        {activeTab === 0 && (
          <NewDataGrid
            refresh={refresh}
            onRowSelected={(d) => {
              setSelectedRep(d);
              setActiveTab(1);
            }}
            url="/rep"
            columns={columns}
          />
        )}
        {activeTab === 1 && selectedRep && <Details selectedRep={selectedRep} />}
      </BasePaper>
    </>
  );
}
