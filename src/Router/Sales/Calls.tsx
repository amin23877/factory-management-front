import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab, ListItem, IconButton } from "@material-ui/core";
import { ListAltRounded, FindInPageRounded, MenuRounded, DeleteRounded, AddRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "../../features/Modals/Confirm";
import OneFieldModal from "components/OneFieldModal";

import { BasePaper } from "app/Paper";
import List from "app/SideUtilityList";
import DataGrid from "app/NewDataGrid";

import Details from "pages/Sales/Call/Details";
import AddCallModal from "features/Sales/Call/CallModal";

import { deleteCall } from "api/calls";
import { addCallsTag, deleteCallsTag, editCallsTag } from "api/callsTags";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function Calls() {
  const history = useHistory();
  const location = useLocation();
  const { callId } = useParams<{ callId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);
  const [addCall, setAddCall] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [CTagModal, setCTagModal] = useState(false);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const handleDelete = async () => {
    try {
      if (callId) {
        const resp = await deleteCall(callId);
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
        getUrl="/callTags"
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
        text={`Are you sure, You are going to delete a call`}
      />
      <BasePaper>
        <Box my={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/sales/calls",
                search: window.location.search,
              });
            }}
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
              disabled={activeTab !== 1}
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
            {activeTab === 1 && (
              <ListItem>
                <IconButton onClick={() => setConfirm(true)}>
                  <DeleteRounded />
                </IconButton>
              </ListItem>
            )}
          </List>
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/sales/calls">
              <DataGrid
                onRowSelected={(d) => {
                  history.push(`/panel/sales/calls/${d.id}${window.location.search}`);
                }}
                url="/calls"
                columns={columns}
                setUrlFilters
              />
            </Route>
            <Route exact path="/panel/sales/calls/:callId">
              <Details />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </Box>
  );
}
