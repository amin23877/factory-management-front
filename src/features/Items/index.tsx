import React, { useCallback, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PostAddRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "../Modals/Confirm";
import NoteModal from "../../common/NoteModal";
import DocumentModal from "../../common/DocumentModal";

import { AddItemModal } from "./ItemModals";
import ItemsDetails from "./Details";

import { deleteAnItem, IItem } from "../../api/items";

import List from "../../app/SideUtilityList";

// import FieldNFilter from "../ClusterAndLevel/Modal";
import LevelsModal from "../Level/Modal";

import ItemTable from "./Table";
import { BasePaper } from "../../app/Paper";

const Items = () => {
  const [selectedItem, setSelectedItem] = useState<IItem>();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedNote, setSelectedNote] = useState<any>();
  const [selectedDoc, setSelectedDoc] = useState<any>();

  const [addItemModal, setAddItemModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [editDocModal, setEditDocModal] = useState(false);
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [addDocModal, setAddDocModal] = useState(false);
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

  return (
    <>
      {selectedNote && selectedItem && selectedItem.id && (
        <NoteModal
          noteData={selectedNote}
          itemId={selectedItem.id as any}
          model="item"
          open={editNoteModal}
          onClose={() => setEditNoteModal(false)}
        />
      )}
      {selectedDoc && selectedItem && selectedItem.id && (
        <DocumentModal
          open={editDocModal}
          itemId={selectedItem.id as any}
          model="item"
          onClose={() => setEditDocModal(false)}
          docData={selectedDoc}
        />
      )}
      {selectedItem && selectedItem.id && (
        <NoteModal
          itemId={selectedItem.id as any}
          model="item"
          open={addNoteModal}
          onClose={() => setAddNoteModal(false)}
        />
      )}
      {selectedItem && selectedItem.id && (
        <DocumentModal
          open={addDocModal}
          onClose={() => setAddDocModal(false)}
          itemId={selectedItem.id as any}
          model="item"
        />
      )}
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
              onRowSelected={(r) => {
                setSelectedItem(r as any);
                setActiveTab(1);
              }}
            />
          )}
          {activeTab === 1 && selectedItem && (
            <ItemsDetails
              selectedRow={selectedItem}
              onDocSelected={(d) => {
                setSelectedDoc(d);
                setEditDocModal(true);
              }}
              onNoteSelected={(d) => {
                setSelectedNote(d);
                setEditNoteModal(true);
              }}
            />
          )}
        </Box>
      </BasePaper>
    </>
  );
};

export default Items;
