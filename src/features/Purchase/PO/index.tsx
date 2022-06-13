import React, { useMemo, useState } from "react";
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

import List from "app/SideUtilityList";

import { BasePaper } from "app/Paper";
import DataGrid from "app/NewDataGrid";

import AddPOModal from "./AddPurchasePO";
import Details from "./Details";

import PurchasePOTypeModal from "./PurchasePoType";
import { deletePurchasePO, IPurchasePO } from "api/purchasePO";
import { ILineItem } from "api/lineItem";
import Confirm from "features/Modals/Confirm";
import { useLock } from "common/Lock";

function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const [addPO, setAddPO] = useState(false);
  const [addType, setAddType] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [lines, setLines] = useState<ILineItem[]>([]);
  const [refresh, setRefresh] = useState(0);

  const [selectedPO, setSelectedPO] = useState<IPurchasePO>();
  const [compPo, setCompPo] = useState<any>();
  const { lock, setLock } = useLock();

  const cols = useMemo(
    () => [
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
    ],
    []
  );

  const handleDelete = async () => {
    try {
      if (selectedPO && selectedPO.id) {
        const resp = await deletePurchasePO(selectedPO.id);
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

  return (
    <>
      <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
      {addPO && (
        <AddPOModal
          initialData={compPo}
          open={addPO}
          onClose={() => setAddPO(false)}
          onDone={() => {
            setActiveTab(0);
            setLines([]);
            setRefresh((p) => p + 1);
          }}
        />
      )}
      <PurchasePOTypeModal open={addType} onClose={() => setAddType(false)} />

      <BasePaper>
        <Box display="flex">
          <Box flex={1} flexGrow={1}>
            <Box display="flex">
              <Tabs
                textColor="primary"
                style={{ marginBottom: "1em" }}
                value={activeTab}
                onChange={(e, nv) => {
                  setActiveTab(nv);
                  setLock(true);
                }}
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
                  disabled={!selectedPO}
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
                        setSelectedPO(undefined);
                        setAddPO(true);
                      }}
                    >
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton onClick={() => setConfirm(true)} disabled={lock}>
                      <DeleteRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem>
                    <IconButton onClick={() => setAddType(true)} title="Add PO Types" disabled={lock}>
                      <LocalOfferRounded />
                    </IconButton>
                  </ListItem>
                  {activeTab === 1 && (
                    <>
                      <ListItem>
                        <IconButton
                          onClick={() => {
                            setCompPo({ ...selectedPO, lines });
                            setAddPO(true);
                          }}
                          title="Add new PO based on this PO"
                          disabled={lock}
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
                refresh={refresh}
                style={{ minHeight: "calc(100vh - 160px)" }}
                columns={cols}
                url="/po"
                onRowSelected={(d) => {
                  setSelectedPO(d);
                  setActiveTab(1);
                }}
              />
            )}
            {activeTab === 1 && selectedPO && <Details selectedPO={selectedPO} />}
          </Box>
        </Box>
      </BasePaper>
    </>
  );
}

export default Index;
