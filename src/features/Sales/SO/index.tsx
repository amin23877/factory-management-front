import React, { useState } from "react";
import { mutate } from "swr";

import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "app/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { FindInPageRounded, ListAltRounded } from "@material-ui/icons";

import Confirm from "../../Modals/Confirm";

import LineItemModal from "../../LineItem";
import LineServiceModal from "../../LineService";
import EditTab from "./EditTab";
import AddSOModal from "./AddSo";

import { deleteSO, ISO } from "api/so";
import { ILineItem } from "api/lineItem";
import { ILineService } from "api/lineService";
import { BasePaper } from "app/Paper";
import Datagrid from "./Datagrid";

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

      <Box mb={1} display="flex" alignItems="center">
        {activeTab === 0 && (
          <Button
            onClick={() => setAddSo(true)}
            style={{
              backgroundColor: "#1a73e8",
              color: "#fff",
              margin: "0 0.5em",
              padding: " 6px 15px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <AddRoundedIcon />
            Add SO
          </Button>
        )}
        {activeTab === 1 && (
          <>
            <Button disabled={!selectedSO} onClick={() => setConfirm(true)} kind="delete">
              Delete SO
            </Button>
            <Button
              kind="add"
              onClick={() => {
                setSelectedLI(undefined);
                setLineItemModal(true);
              }}
              style={{ margin: "0 0.5em" }}
            >
              Add Line item
            </Button>
            <Button
              onClick={() => {
                setSelectedLS(undefined);
                setLineServiceModal(true);
              }}
              kind="add"
            >
              Add Line service
            </Button>
          </>
        )}
        <div style={{ flexGrow: 1 }} />
      </Box>
      <BasePaper style={{ paddingTop: "0px" }}>
        <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)} style={{ marginBottom: 10 }}>
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
