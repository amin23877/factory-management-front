import React, { Suspense, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Confirm from "features/Modals/Confirm";

import { BasePaper } from "app/Paper";
import DataGrid from "app/NewDataGrid";
import List from "app/SideUtilityList";

import Details from "pages/Sales/PO/Details";
import AddPOModal from "features/Sales/PO/AddPoModal";

import { deleteCustomerPo } from "api/customerPo";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function POPanel() {
  const history = useHistory();
  const location = useLocation();
  const { poId } = useParams<{ poId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  const [addPo, setAddPo] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

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
      if (poId) {
        const resp = await deleteCustomerPo(poId);
        if (resp) {
          history.push("/panel/sales/customerPOs");
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
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/sales/customerPOs",
                search: window.location.search,
              });
            }}
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
              disabled={activeTab !== 1}
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
            {activeTab === 1 && (
              <ListItem>
                <IconButton title="Delete PO" onClick={() => setConfirm(true)}>
                  <DeleteRounded />
                </IconButton>
              </ListItem>
            )}
          </List>
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/sales/customerPOs">
              <DataGrid
                setUrlFilters
                refresh={refresh}
                url="/customerPo"
                columns={poCols}
                onRowSelected={(d) => history.push(`/panel/sales/customerPOs/${d.id}${window.location.search}`)}
              />
            </Route>
            <Route exact path="/panel/sales/customerPOs/:poId">
              <Details />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </Box>
  );
}
