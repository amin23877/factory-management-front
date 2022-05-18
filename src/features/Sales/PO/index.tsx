import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import { deleteCustomerPo, customerPoType } from "api/customerPo";

import Confirm from "../../Modals/Confirm";
import Button from "app/Button";

import Details from "./Details";
import AddPOModal from "./AddPoModal";
import { BasePaper } from "app/Paper";

import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import DataGrid from "app/NewDataGrid";

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
        // text={`Are you sure, You are going to delete PO with number ${selectedPO?.number}`}
        text={`Are you sure, You are going to delete this Customer PO`}
      />

      <Box mb={1} display="flex" alignItems="center">
        <Button
          onClick={() => setAddPo(true)}
          style={{
            backgroundColor: "#1a73e8",
            color: "#fff",
            margin: "0 0.5em",
            padding: " 6px 15px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <AddRoundedIcon />
          Add PO
        </Button>
        <Button kind="delete" disabled={!selectedPO} onClick={() => setConfirm(true)} style={{ margin: "0 0.5em" }}>
          Delete PO
        </Button>
      </Box>
      <BasePaper>
        <Tabs value={activeTab} style={{ marginBottom: 10 }} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
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
