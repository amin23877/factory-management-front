import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import { ListAltRounded, FindInPageRounded, MenuRounded, DeleteRounded, AddRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "../../Modals/Confirm";
import OneFieldModal from "components/OneFieldModal";

import { BasePaper } from "app/Paper";
import List from "app/SideUtilityList";
import DataGrid from "app/NewDataGrid";

import Details from "./Details";
import AddCallModal from "./CallModal";

import { deleteCall } from "api/calls";
import { addCallsTag, deleteCallsTag, editCallsTag } from "api/callsTags";

export default function Calls() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCall, setSelectedCall] = useState<any>();
  const [addCall, setAddCall] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [CTagModal, setCTagModal] = useState(false);

  const handleDelete = async () => {
    try {
      if (selectedCall && selectedCall?.id) {
        const resp = await deleteCall(selectedCall?.id as any);
        if (resp) {
          mutate("/calls");
          setActiveTab(0);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setConfirm(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "date",
        header: "Date",
        minWidth: 110,
        type: "date",
      },
      { name: "number", header: "Ticket ID", minWidth: 100 },
      { name: "subject", header: "Subject", minWidth: 100 },
      { name: "company", header: "Company", minWidth: 100 },
      { name: "contactName", header: "Name", minWidth: 100 },
      { name: "contactNumber", header: "Contact No.", minWidth: 110 },
      { name: "contactEmail", header: "Email", minWidth: 150 },
      { name: "state", header: "State", minWidth: 100 },
      { name: "zip", header: "Zip Code", minWidth: 100 },
      {
        name: "Assigned To",
        render: ({ data }: any) => data.AssignedTo?.username,
        minWidth: 110,
      },
      {
        name: "Created By",
        render: ({ data }: any) => data.CreatedBy?.username,
        minWidth: 110,
      },
      {
        name: "Tag",
        render: ({ data }: any) => data.Tags[0]?.name,
        minWidth: 100,
      },
    ],
    []
  );

  return (
    <Box>
      <OneFieldModal
        title="Add/Edit Calls Tags"
        getUrl="/callsTags"
        open={CTagModal}
        onClose={() => setCTagModal(false)}
        postRecord={addCallsTag}
        updateRecord={editCallsTag}
        deleteRecord={deleteCallsTag}
      />
      <AddCallModal open={addCall} onClose={() => setAddCall(false)} />
      <Confirm
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        text={`Are you sure, You are going to delete PO with number ${selectedCall?.number}`}
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
                  <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={!selectedCall}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                </span>
              }
            />
          </Tabs>
          <List>
            <ListItem>
              <IconButton onClick={() => setAddCall(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton onClick={() => setCTagModal(true)}>
                <MenuRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton disabled={!selectedCall} onClick={() => setConfirm(true)}>
                <DeleteRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <div style={activeTab !== 0 ? { display: "none" } : { flex: 1 }}>
          <DataGrid
            onRowSelected={(d) => {
              setSelectedCall(d);
              setActiveTab(1);
            }}
            url="/calls"
            columns={columns}
          />
        </div>
        {activeTab === 1 && selectedCall && <Details callsData={selectedCall} />}
      </BasePaper>
    </Box>
  );
}
