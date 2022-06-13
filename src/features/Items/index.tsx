import React, { useCallback, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PostAddRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "../Modals/Confirm";
import ConfirmDialog from "common/Confirm";

import { AddItemModal } from "./ItemModals";
import ItemsDetails from "./Details";

import { deleteAnItem, IItem, convertToService } from "api/items";

import List from "app/SideUtilityList";
import { BasePaper } from "app/Paper";
import Button from "app/Button";

// import LevelsModal from "common/Level/Modal";
import ClusterModal from "common/Cluster/Modal";
import { useLock } from "common/Lock";

import ItemTable from "./Table";

const Items = () => {
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [itemSelection, setItemSelection] = useState();
  const [refresh, setRefresh] = useState<number>(0);

  const [activeTab, setActiveTab] = useState(0);

  const [addItemModal, setAddItemModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [clusterModal, setClusterModal] = useState(false);
  const { lock } = useLock();

  const handleDelete = useCallback(async () => {
    try {
      if (selectedItem && selectedItem.id) {
        await deleteAnItem(selectedItem.id);
        mutate("/item");

        setDeleteItemModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedItem]);

  const handleConvertItems = async () => {
    try {
      if (itemSelection && Object.keys(itemSelection || {}).length > 0) {
        ConfirmDialog({
          text: `You are going to convert ${Object.keys(itemSelection || {}).length} items to service`,
          onConfirm: async () => {
            try {
              for (const id of Object.keys(itemSelection || {})) {
                await convertToService(id);
              }
            } catch (error) {
              console.log(error);
            } finally {
              setRefresh((p) => p + 1);
            }
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              setItemSelection(undefined);
              setActiveTab(nv);
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
              disabled={!selectedItem}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded style={{ marginRight: "5px" }} /> Details
                </span>
              }
            />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          {/* {itemSelection && Object.keys(itemSelection || {}).length > 0 && (
            <Button disabled={lock} kind="add" onClick={handleConvertItems} style={{ margin: "0 8px" }}>
              Convert Selection to Service
            </Button>
          )} */}
          <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            <ListItem>
              <IconButton title="Add item" onClick={() => setAddItemModal(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton
                title="Delete item"
                disabled={lock || !selectedItem}
                onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}
              >
                <DeleteRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton title="Cluster and level" onClick={() => setClusterModal(true)}>
                <PostAddRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box display="flex" flex={1}>
          {activeTab === 0 && (
            <ItemTable
              refresh={refresh}
              onSelectionChange={({ selected }) => {
                setItemSelection(selected);
              }}
              onRowSelected={(r) => {
                setSelectedItem(r as any);
                setItemSelection(undefined);
                setActiveTab(1);
              }}
            />
          )}
          {activeTab === 1 && selectedItem && (
            <ItemsDetails
              setSelectedItem={(r) => setSelectedItem(r)}
              setIndexActiveTab={(t) => {
                setItemSelection(undefined);
                setActiveTab(t);
              }}
              selectedRow={selectedItem}
            />
          )}
        </Box>
      </BasePaper>
    </>
  );
};

export default Items;
