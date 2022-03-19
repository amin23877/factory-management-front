import React, { useCallback, useEffect, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PostAddRounded } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";

import Confirm from "features/Modals/Confirm";

import { AddItemModal } from "features/Items/ItemModals";
import ItemsDetails from "features/Items//Details";

import { deleteAnItem, IItem } from "api/items";

import List from "app/SideUtilityList";

// import FieldNFilter from "../ClusterAndLevel/Modal";
import LevelsModal from "features/Level/Modal";

import ItemTable from "features/Items//Table";
import { BasePaper } from "app/Paper";

function ItemsDetailsPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: defaultItem } = useSWR<IItem>(itemId ? `/item/${itemId}` : null);
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [itemSelection, setItemSelection] = useState();

  const [activeTab, setActiveTab] = useState(0);

  const [addItemModal, setAddItemModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [levelsModal, setLevelsModal] = useState(false);

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

  useEffect(() => {
    if (defaultItem && selectedItem === null) {
      setSelectedItem(defaultItem);
      setActiveTab(1);
    }
  }, [defaultItem, selectedItem]);

  if (!itemId) {
    return <></>;
  }

  return (
    <>
      <AddItemModal open={addItemModal} onClose={() => setAddItemModal(false)} />
      <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
      <LevelsModal open={levelsModal} onClose={() => setLevelsModal(false)} />

      <BasePaper style={{ height: "100%" }}>
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
          <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            <ListItem>
              <IconButton title="Add item" onClick={() => setAddItemModal(true)}>
                <AddRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton
                title="Delete item"
                disabled={!selectedItem}
                onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}
              >
                <DeleteRounded />
              </IconButton>
            </ListItem>
            <ListItem>
              <IconButton title="Cluster and level" onClick={() => setLevelsModal(true)}>
                <PostAddRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        <Box display="flex" flex={1}>
          {activeTab === 0 && (
            <ItemTable
              onSelectionChange={({ selected }) => setItemSelection(selected)}
              onRowSelected={(r) => {
                setSelectedItem(r as any);
                setActiveTab(1);
              }}
            />
          )}
          {activeTab === 1 && selectedItem && (
            <ItemsDetails
              setIndexActiveTab={(t) => setActiveTab(t)}
              setSelectedItem={(item) => setSelectedItem(item)}
              selectedRow={selectedItem}
            />
          )}
        </Box>
      </BasePaper>
    </>
  );
}

export default ItemsDetailsPage;
