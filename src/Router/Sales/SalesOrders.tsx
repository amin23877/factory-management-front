import React, { Suspense, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "features/Modals/Confirm";

import LineItemModal from "features/LineItem";
import LineServiceModal from "features/LineService";
import EditTab from "pages/Sales/SO/Details";
import AddSOModal from "features/Sales/SO/AddSo";

import List from "app/SideUtilityList";

import { deleteSO } from "api/so";
import { ILineItem } from "api/lineItem";
import { ILineService } from "api/lineService";
import { BasePaper } from "app/Paper";
import Datagrid from "features/Sales/SO/Datagrid";
import { IconButton, ListItem } from "@material-ui/core";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function SalesOrderPanel() {
  const history = useHistory();
  const location = useLocation();
  const { soId } = useParams<{ soId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  const [confirm, setConfirm] = useState(false);
  const [addSo, setAddSo] = useState(false);
  const [lineItemModal, setLineItemModal] = useState(false);
  const [lineServiceModal, setLineServiceModal] = useState(false);

  const [selectedLI, setSelectedLI] = useState<ILineItem>();
  const [selectedLS, setSelectedLS] = useState<ILineService>();

  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const handleDelete = async () => {
    try {
      if (soId) {
        const resp = await deleteSO(soId);
        if (resp) {
          mutate("/so");
          setConfirm(false);
          history.push(`/panel/sales/salesOrders${window.location.search}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {activeTab === 1 && soId && (
        <LineItemModal
          open={lineItemModal}
          onClose={() => setLineItemModal(false)}
          record="so"
          recordId={soId}
          selectedLine={selectedLI}
          mutateField="SOId"
        />
      )}
      {activeTab === 1 && soId && (
        <LineServiceModal
          open={lineServiceModal}
          onClose={() => setLineServiceModal(false)}
          record="so"
          recordId={soId}
          selectedLine={selectedLS}
          mutateField="SOId"
        />
      )}
      {addSo && (
        <AddSOModal
          open={addSo}
          onClose={() => setAddSo(false)}
          onDone={(createdSO) => {
            mutate("/so");
            setRefresh((prev) => prev + 1);
            setActiveTab(0);
          }}
        />
      )}
      <Confirm
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        text={`Are you sure, You want to delete this selected So ?`}
      />
      <BasePaper>
        <Box my={1} display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/sales/salesOrders",
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
              <IconButton title="Add SO" onClick={() => setAddSo(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            {activeTab === 1 && (
              <ListItem>
                <IconButton title="Delete SO" onClick={() => setConfirm(true)}>
                  <DeleteRounded />
                </IconButton>
              </ListItem>
            )}
          </List>
        </Box>
        <Suspense fallback={<MyBackdrop />}>
          <Switch>
            <Route exact path="/panel/sales/salesOrders">
              <Datagrid
                refresh={refresh}
                onRowSelected={(d) => {
                  history.push(`/panel/sales/salesOrders/${d.id}${window.location.search}`);
                }}
                setUrlFilters
              />
            </Route>
            <Route exact path="/panel/sales/salesOrders/:soId">
              <EditTab
                onLineServiceSelected={(d) => {
                  setSelectedLS(d);
                }}
                onLineItemSelected={(d) => {
                  setSelectedLI(d);
                }}
              />
            </Route>
          </Switch>
        </Suspense>
      </BasePaper>
    </>
  );
}
