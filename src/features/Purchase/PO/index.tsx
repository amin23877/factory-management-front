import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  AddRounded,
  DeleteRounded,
  PrintRounded,
  LocalOfferRounded,
  PostAddRounded,
  ListAltRounded,
  FindInPageRounded,
} from "@material-ui/icons";
// import { GridColDef } from "@material-ui/data-grid";

import List from "../../../app/SideUtilityList";
// import BaseDataGrid from "../../../app/BaseDataGrid";

import { BasePaper } from "../../../app/Paper";
import DataGrid from "../../../app/NewDataGrid";

import AddPOModal from "./AddPurchasePO";
import AddLineItem from "../../LineItem";
import Details from "./Details";

import Confirm from "../../Modals/Confirm";
import NoteModal from "../../../common/NoteModal";
import DocumentModal from "../../../common/DocumentModal";
import PurchasePOTypeModal from "./PurchasePoType";
import { deletePurchasePO, IPurchasePO, getPurchasePOLines } from "../../../api/purchasePO";
import { getAllModelNotes } from "../../../api/note";
import { getAllModelDocuments } from "../../../api/document";
import { ILineItem } from "../../../api/lineItem";

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [addPO, setAddPO] = useState(false);
  const [addLineItem, setAddLineItem] = useState(false);
  const [addType, setAddType] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // const [pos, setPOs] = useState([]);
  const [lines, setLines] = useState([]);
  const [noteModal, setNoteModal] = useState(false);
  const [docModal, setDocModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [docs, setDocs] = useState([]);

  const [selNote, setSelNote] = useState<any>();
  const [selDoc, setSelDoc] = useState<any>();

  const [selectedLine, setSelectedLine] = useState<ILineItem>();
  const [selPO, setSelPO] = useState<IPurchasePO | undefined>({
    ContactId: "",
    EmployeeId: "",
    VendorId: "",
    number: "123",
    requester: "",
    status: "test",
  });
  const [compPo, setCompPo] = useState<any>();

  const cols = [
    {
      name: "date",
      header: "Date",
      width: 100,
      type: "date",
    },
    { name: "number", header: "ID", width: 110 },
    { name: "Vendor", width: 110, render: ({ data }: any) => data?.VendorId?.name }, // change this
    { name: "TrackNumber", header: "Trac. No.", width: 120 },
    {
      name: "acknowledgeDate",
      header: "Ack. Date",
      width: 110,
      type: "date",
    },
    { name: "estimatedShipDate", header: "Est. Ship", width: 110, type: "date" },
    { name: "actualShipDate", header: "act. Ship", width: 110, type: "date" },
    { name: "SO", width: 110, render: ({ data }: any) => data?.SOId?.number },
    { name: "requiredBy", header: "Required By", width: 110, type: "date" },
    { name: "Staff", width: 110, render: ({ data }: any) => data?.EmployeeId?.username },
    { name: "status", header: "Status", width: 100 },
    { name: "totalCost", header: "Total Cost", width: 100, type: "number" },
    { name: "approved", header: "Appr.", width: 80, type: "boolean" },
    { name: "Appr. By", width: 110, render: ({ data }: any) => data?.ApprovedBy?.username },
    { name: "QuickBooks Info", header: "QuickBooks Info", width: 120 },
  ];

  const refreshNotes = async () => {
    try {
      if (selPO && selPO.id) {
        const resp = await getAllModelNotes("purchasePO", selPO.id);
        resp && !resp.error && setNotes(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshDocs = async () => {
    try {
      if (selPO && selPO.id) {
        const resp = await getAllModelDocuments("purchasePO", selPO.id as any);
        resp && !resp.error && setDocs(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshLines = async () => {
    try {
      if (selPO && selPO.id) {
        const resp = await getPurchasePOLines(selPO.id);
        if (typeof resp === "object") {
          setLines(resp);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const refreshPOs = async () => {
  //     try {
  //         const resp = await getPurchasePOs();
  //         resp && setPOs(resp);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  const handleDelete = async () => {
    try {
      if (selPO && selPO.id) {
        const resp = await deletePurchasePO(selPO.id);
        if (resp) {
          // refreshPOs();
          setConfirm(false);
          setActiveTab(0);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //     refreshPOs();
  // }, []);

  useEffect(() => {
    if (activeTab === 1) {
      refreshLines();
      refreshNotes();
      refreshDocs();
    }
  }, [activeTab]);

  return (
    <>
      <AddPOModal
        initialData={compPo}
        open={addPO}
        onClose={() => setAddPO(false)}
        onDone={() => {
          // refreshPOs();
          setActiveTab(0);
          setLines([]);
        }}
      />
      <PurchasePOTypeModal open={addType} onClose={() => setAddType(false)} />
      {selPO && selPO.id && (
        <AddLineItem
          selectedLine={selectedLine}
          open={addLineItem}
          onClose={() => setAddLineItem(false)}
          record="purchasePo"
          mutateField="PurchasePOId"
          recordId={selPO.id}
        />
      )}
      {selPO && (
        <Confirm
          open={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={handleDelete}
          text={`Are you sure? You are going to delete purchase PO ${selPO?.number}`}
        />
      )}
      {selPO && selPO.id && (
        <NoteModal
          itemId={selPO.id}
          model="purchasePO"
          open={noteModal}
          onClose={() => setNoteModal(false)}
          noteData={selNote}
          onDone={refreshNotes}
        />
      )}
      {selPO && selPO.id && (
        <DocumentModal
          itemId={selPO.id}
          model="purchasePO"
          open={docModal}
          onClose={() => setDocModal(false)}
          docData={selDoc}
          onDone={refreshDocs}
        />
      )}

      <BasePaper>
        <Box display="flex">
          <Box flex={1} flexGrow={1}>
            <Box display="flex">
              <Tabs
                textColor="primary"
                style={{ marginBottom: "1em" }}
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
              >
                <Tab
                  // label="List"
                  icon={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                    </span>
                  }
                  wrapped
                />
                <Tab
                  // label="Details"
                  disabled={!selPO}
                  icon={
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                    </span>
                  }
                />
              </Tabs>
              <div style={{ flex: 1 }}></div>
              <Box>
                <List>
                  <ListItem>
                    <IconButton
                      onClick={() => {
                        setSelPO(undefined);
                        setAddPO(true);
                      }}
                    >
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton onClick={() => setConfirm(true)}>
                      <DeleteRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton onClick={() => setAddType(true)} title="Add PO Types">
                      <LocalOfferRounded />
                    </IconButton>
                  </ListItem>
                  {activeTab === 1 && (
                    <>
                      <ListItem>
                        <IconButton
                          onClick={() => {
                            setCompPo({ ...selPO, lines });
                            setAddPO(true);
                          }}
                          title="Add new PO based on this PO"
                        >
                          <PostAddRounded />
                        </IconButton>
                      </ListItem>
                    </>
                  )}
                  <ListItem>
                    <IconButton>
                      <PrintRounded />
                    </IconButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
            {activeTab === 0 && (
              <DataGrid
                style={{ minHeight: "calc(100vh - 160px)" }}
                columns={cols}
                url="/purchasepo"
                onRowSelected={(d) => {
                  setSelPO(d);
                  setActiveTab(1);
                }}
              />
            )}
            {activeTab === 1 && selPO && (
              <Details
                initialValues={selPO}
                onDone={() => {}}
                lines={lines}
                notes={notes}
                docs={docs}
                onNoteSelected={(d) => {
                  setSelNote(d);
                  setNoteModal(true);
                }}
                onDocumentSelected={(d) => {
                  setSelDoc(d);
                  setDocModal(true);
                }}
                onLineSelected={(d) => {
                  setSelectedLine(d);
                  setAddLineItem(true);
                }}
              />
            )}
          </Box>
        </Box>
      </BasePaper>
    </>
  );
}

export default Index;
