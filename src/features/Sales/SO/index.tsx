import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded } from "@material-ui/icons";
import { mutate } from "swr";

import Confirm from "../../Modals/Confirm";

import LineItemModal from "../../LineItem";
import LineServiceModal from "../../LineService";
import EditTab from "./EditTab";
import AddSOModal from "./AddSo";

import List from "app/SideUtilityList";

import { deleteSO, ISO } from "api/so";
import { ILineItem } from "api/lineItem";
import { ILineService } from "api/lineService";
import { BasePaper } from "app/Paper";
import Datagrid from "./Datagrid";
import { IconButton, ListItem } from "@material-ui/core";

export default function SalesOrderPanel() {
  const [activeTab, setActiveTab] = useState(0);

  const [confirm, setConfirm] = useState(false);
  const [addSo, setAddSo] = useState(false);
  const [lineItemModal, setLineItemModal] = useState(false);
  const [lineServiceModal, setLineServiceModal] = useState(false);

  const [selectedLI, setSelectedLI] = useState<ILineItem>();
  const [selectedLS, setSelectedLS] = useState<ILineService>();
  const [selectedSO, setSelectedSO] = useState<ISO>();

  const [refresh, setRefresh] = useState<number>(0);

  const handleDelete = async () => {
    try {
      if (selectedSO && selectedSO.id) {
        const resp = await deleteSO(selectedSO.id);
        if (resp) {
          setActiveTab(0);
          setSelectedSO(undefined);
          mutate("/so");
          setConfirm(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedSO && selectedSO.id && (
        <LineItemModal
          open={lineItemModal}
          onClose={() => setLineItemModal(false)}
          record="so"
          recordId={selectedSO.id}
          selectedLine={selectedLI}
          mutateField="SOId"
        />
      )}
      {selectedSO && selectedSO.id && (
        <LineServiceModal
          open={lineServiceModal}
          onClose={() => setLineServiceModal(false)}
          record="so"
          recordId={selectedSO.id}
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
            setSelectedSO(createdSO);
            setActiveTab(1);
          }}
        />
      )}
      <Confirm
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
        text={`Are you sure, You are going to delete SO with number ${selectedSO?.number}`}
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
              disabled={!selectedSO}
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
            <ListItem>
              <IconButton title="Delete SO" disabled={!selectedSO} onClick={() => setConfirm(true)}>
                <DeleteRounded />
              </IconButton>
            </ListItem>
          </List>
        </Box>
        {activeTab === 0 && (
          <Datagrid
            refresh={refresh}
            onRowSelected={(d) => {
              setSelectedSO(d);
              setActiveTab(1);
            }}
          />
        )}
        {activeTab === 1 && selectedSO && (
          <EditTab
            selectedSo={selectedSO}
            onLineServiceSelected={(d) => {
              setSelectedLS(d);
              // setLineServiceModal(true);
            }}
            onLineItemSelected={(d) => {
              setSelectedLI(d);
              // setLineItemModal(true);
            }}
          />
        )}
      </BasePaper>
    </>
  );
}
