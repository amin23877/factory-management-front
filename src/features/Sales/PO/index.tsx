import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Confirm from "../../Modals/Confirm";

import { BasePaper } from "app/Paper";
import DataGrid from "app/NewDataGrid";
import List from "app/SideUtilityList";

import Details from "./Details";
import AddPOModal from "./AddPoModal";

import { deleteCustomerPo, customerPoType } from "api/customerPo";

export default function POPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPO, setSelectedPO] = useState<customerPoType>();
  const [addPo, setAddPo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const poCols = [
    {
      name: "date",
      header: "Date",
      minWidth: 110,
      type: "date",
    },
    { name: "number", headerName: "ID", minWidth: 90 },
    { name: "SoID", headerName: "SO ID", flex: 1 },
    { name: "Client", render: ({ data }: any) => data?.ClientId?.name, flex: 1 },
    {
      name: "Rep",
      render: ({ data }: any) => data?.ContactId?.name,
      flex: 1,
    },
    { name: "state", headerName: "State", width: 110 },
    {
      name: "Project",
      render: ({ data }: any) => data?.ProjectId?.name,
      flex: 1,
    },
    { name: "status", headerName: "Status", minWidth: 110 },
  ];

  const handleDelete = async () => {
    try {
      if (selectedPO && selectedPO.id) {
        const resp = await deleteCustomerPo(selectedPO.id);
        if (resp) {
          setActiveTab(0);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setConfirm(false);
    }
  };

  return (
    <Box>
      <AddPOModal open={addPo} onClose={() => setAddPo(false)} onDone={() => setRefresh((p) => p + 1)} />
      <Confirm
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        text={`Are you sure, You are going to delete this Customer PO`}
      />
      <BasePaper>
        <Box my={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => setActiveTab(nv)}
            style={{ marginRight: "auto" }}
          >
            <Tab
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <ListAltRounded style={{ marginRight: "5px" }} /> List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={!selectedPO}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
          <List>
            <ListItem>
              <IconButton title="Add PO" onClick={() => setAddPo(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton title="Delete PO" disabled={!selectedPO} onClick={() => setConfirm(true)}>
                <DeleteRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        {activeTab === 0 && (
          <DataGrid
            refresh={refresh}
            url="/customerPo"
            columns={poCols}
            onRowSelected={(d) => {
              setSelectedPO(d);
              setActiveTab(1);
            }}
          />
        )}
        {activeTab === 1 && selectedPO && <Details poData={selectedPO} onDone={() => {}} />}
      </BasePaper>
    </Box>
  );
}
