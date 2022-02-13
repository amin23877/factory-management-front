import React, { useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AddRounded, DeleteRounded, FindInPageRounded, ListAltRounded, PrintRounded } from "@material-ui/icons";

import List from "../../../app/SideUtilityList";
import DataGrid from "../../../app/NewDataGrid";
import NoteModal from "../../../common/NoteModal";
import DocumentsModal from "../../../common/DocumentModal";
import AddPQuoteModal from "./AddPQuoteModal";
import Details from "./Details";

import { deletePurchaseQuote, IPurchaseQuote } from "../../../api/purchaseQuote";
import Confirm from "../../Modals/Confirm";
import { getAllModelNotes } from "../../../api/note";
import { getAllModelDocuments } from "../../../api/document";
import { BasePaper } from "../../../app/Paper";

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [addPQ, setAddPQ] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // const [pqs, setPqs] = useState([]);

  const [noteModal, setNoteModal] = useState(false);
  const [docModal, setDocModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [docs, setDocs] = useState([]);

  const [selNote, setSelNote] = useState<any>();
  const [selDoc, setSelDoc] = useState<any>();
  // TODO: Delete default selectedPurchaseQuote after one pquote added - for dev purposes
  const [selPQ, setSelPQ] = useState<IPurchaseQuote | undefined>({
    id: "",
    requester: "",
    ContactId: "",
    VendorId: "",
  });
  // Date	Quote Number	Vendor	SO 	Staff	Contact

  const cols = [
    {
      name: "date",
      header: "Date",
      type: "date",
      minWidth: 90,
    },
    { name: "senderNumber", headerName: "ID", minWidth: 90 },
    { name: "Vendor", minWidth: 90, render: ({ data }: any) => data?.VendorId?.name, flex: 1 },
    { name: "SO", minWidth: 90, render: ({ data }: any) => data?.SOId?.number, flex: 1 },
    { name: "Staff", minWidth: 90, render: ({ data }: any) => data?.EmployeeId?.username, flex: 1 },
    { name: "contactName", headerName: "Contact", minWidth: 90 },
  ];

  // const refreshPQs = async () => {
  //     try {
  //         const resp = await getPurchaseQuotes();
  //         resp && setPqs(resp);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  const handleDelete = async () => {
    try {
      if (selPQ && selPQ.id) {
        const resp = await deletePurchaseQuote(selPQ.id);
        if (resp) {
          // refreshPQs();
          setConfirm(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const refreshNotes = async () => {
    try {
      if (selPQ && selPQ.id) {
        const resp = await getAllModelNotes("purchaseQuote", selPQ.id);
        resp && !resp.error && setNotes(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshDocs = async () => {
    try {
      if (selPQ && selPQ.id) {
        const resp = await getAllModelDocuments("purchaseQuote", selPQ.id);
        resp && !resp.error && setDocs(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      refreshNotes();
      refreshDocs();
    }
  }, [activeTab]);

  useEffect(() => {
    // refreshPQs();
  }, []);

  return (
    <>
      <AddPQuoteModal open={addPQ} onClose={() => setAddPQ(false)} onDone={() => {}} />
      {selPQ && (
        <Confirm
          open={confirm}
          onClose={() => setConfirm(false)}
          onConfirm={handleDelete}
          text={`Are you sure? You are going to delete purchase quote ${selPQ?.number}`}
        />
      )}
      {selPQ && selPQ.id && (
        <NoteModal
          itemId={selPQ.id}
          model="purchaseQuote"
          open={noteModal}
          onClose={() => setNoteModal(false)}
          noteData={selNote}
          onDone={refreshNotes}
        />
      )}
      {selPQ && selPQ.id && (
        <DocumentsModal
          itemId={selPQ.id}
          model="purchaseQuote"
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
                style={{ marginBottom: "1em" }}
                textColor="primary"
                value={activeTab}
                onChange={(e, nv) => setActiveTab(nv)}
              >
                <Tab
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
                  disabled={!selPQ}
                  icon={
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                    </span>
                  }
                />
              </Tabs>
              <div style={{ flex: 1 }}> </div>
              <Box>
                <List>
                  <ListItem>
                    <IconButton
                      onClick={() => {
                        setActiveTab(0);
                        setSelPQ(undefined);
                        setAddPQ(true);
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
                url="/purchaseQuote"
                onRowSelected={(d) => {
                  setSelPQ(d);
                  setActiveTab(1);
                }}
              />
            )}
            {activeTab === 1 && selPQ && (
              <Details
                initialValues={selPQ}
                onDone={() => {}}
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
              />
            )}
          </Box>
        </Box>
      </BasePaper>
    </>
  );
}

export default Index;
