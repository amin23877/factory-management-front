import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PostAddRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "../../features/Modals/Confirm";
// import ConfirmDialog from "common/Confirm";

import { AddItemModal } from "../../features/Items/ItemModals";
import ItemsDetails from "../../pages/Inventory/Items/Details";

import { deleteAnItem } from "api/items";

import List from "app/SideUtilityList";
import { BasePaper } from "app/Paper";
// import Button from "app/Button";

// import LevelsModal from "common/Level/Modal";
import ClusterModal from "common/Cluster/Modal";
import { useLock } from "common/Lock";

import ItemTable from "../../features/Items/Table";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

const Items = () => {
  const history = useHistory();
  const location = useLocation();
  const { itemId } = useParams<{ itemId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  const [addItemModal, setAddItemModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [clusterModal, setClusterModal] = useState(false);
  const { lock } = useLock();

  const handleDelete = useCallback(async () => {
    try {
      if (itemId) {
        await deleteAnItem(itemId);
        mutate("/item");

        setDeleteItemModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [itemId]);

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  return (
    <>
      <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
      <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
      {/* <LevelsModal open={levelsModal} onClose={() => setLevelsModal(false)} /> */}
      <ClusterModal open={clusterModal} onClose={() => setClusterModal(false)} />

      <BasePaper style={{ height: "100%" }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => {
              setActiveTab(nv);
              history.push({
                pathname: "/panel/inventory/items",
                search: window.location.search,
              });
            }}
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
          <div style={{ flexGrow: 1 }} />
          <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            <ListItem>
              <IconButton title="Add item" onClick={() => setAddItemModal(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            {activeTab === 1 && (
              <ListItem>
                <IconButton title="Delete item" disabled={lock} onClick={() => setDeleteItemModal(true)}>
                  <DeleteRounded />
                </IconButton>
              </ListItem>
            )}
            <ListItem>
              <IconButton title="Cluster and level" onClick={() => setClusterModal(true)}>
                <PostAddRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box display="flex" flex={1}>
          <Suspense fallback={<MyBackdrop />}>
            <Switch>
              <Route exact path="/panel/inventory/items">
                <ItemTable
                  onRowSelected={(r) => {
                    history.push(`/panel/inventory/items/${r.id}${window.location.search}`);
                  }}
                />
              </Route>
              <Route exact path="/panel/inventory/items/:itemId">
                {" "}
                <ItemsDetails />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </BasePaper>
    </>
  );
};

export default Items;
