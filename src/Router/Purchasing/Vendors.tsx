import React, { Suspense, useEffect, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";

import {
  AddRounded,
  DeleteRounded,
  PrintRounded,
  PostAdd,
  LocalOfferRounded,
  ListAltRounded,
  FindInPageRounded,
} from "@material-ui/icons";

import List from "app/SideUtilityList";
import Toast from "app/Toast";

import Details from "pages/Purchasing/Vendor/Details";
import VendorModal from "features/Purchase/Vendor/AddVendor";
import Vending from "features/Purchase/Vendor/Vending/Modal";
import Confirm from "features/Modals/Confirm";

import { deleteVendor } from "api/vendor";
import VendorTypeModal from "features/Purchase/Vendor/VendorType";
import DataGrid from "app/NewDataGrid";
import { mutate } from "swr";
import { BasePaper } from "app/Paper";
import { useLock } from "common/Lock";
import { Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

export default function Vendors({ tech }: { tech: boolean }) {
  const history = useHistory();
  const location = useLocation();
  const { vendorId } = useParams<{ vendorId: string }>();

  const [activeTab, setActiveTab] = useState(location.pathname.split("/").length === 5 ? 1 : 0);

  const [addVendor, setAddVendor] = useState(false);
  const [addType, setAddType] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [vendingModal, setVendingModal] = useState(false);
  const { lock } = useLock();

  useEffect(() => {
    if (location.pathname.split("/").length === 5) {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [location]);

  const handleDelete = async () => {
    try {
      if (vendorId) {
        await deleteVendor(vendorId);

        mutate(`/vendor?tech=${tech}`);
        setConfirm(false);
        setActiveTab(0);
        Toast("Record deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cols = [
    { name: "number", header: "ID", width: 90 },
    { name: "name", header: "Name", width: 120 },
    { name: "address", header: "Address", flex: 1 },
    { name: "city", header: "City", minWidth: 90 },
    { name: "state", header: "State", width: 90 },
    { name: "zip", header: "Zip Code", width: 90 },
    // { name: "mcLastName", minWidth: 110, header: "Contact" },
    // { name: "mcPhone", minWidth: 110, header: "Phone" },
    // { name: "mcEmail", minWidth: 110, header: "Email" },
    { name: "active", header: "Active", minWidth: 90, type: "boolean" },
  ];

  return (
    <>
      <VendorModal
        tech={Boolean(tech)}
        open={addVendor}
        onClose={() => setAddVendor(false)}
        onDone={() => mutate(`/vendor?tech=${tech}`)}
      />
      <Confirm
        text={`Are you sure? You are going to delete a vendor `}
        open={confirm}
        onClose={() => setConfirm(false)}
        onConfirm={handleDelete}
      />
      {vendorId && <Vending open={vendingModal} onClose={() => setVendingModal(false)} vendorId={vendorId} />}
      <VendorTypeModal open={addType} onClose={() => setAddType(false)} />

      <BasePaper>
        <Box display="flex">
          <Box flex={1} flexGrow={1}>
            <Box display="flex">
              <Tabs
                style={{ marginBottom: 10 }}
                value={activeTab}
                onChange={(e, nv) => {
                  setActiveTab(nv);
                  history.push({
                    pathname: "/panel/purchase/vendor",
                    search: window.location.search,
                  });
                }}
                textColor="primary"
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
                  disabled={activeTab !== 1}
                  icon={
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                    </span>
                  }
                />
              </Tabs>
              <div style={{ flexGrow: 1 }} />
              <Box>
                <List>
                  <ListItem>
                    <IconButton onClick={() => setAddVendor(true)} title="Add Vendor">
                      <AddRounded />
                    </IconButton>
                  </ListItem>
                  {activeTab === 1 && (
                    <ListItem>
                      <IconButton disabled={lock} onClick={() => setConfirm(true)} title="delete Vendor">
                        <DeleteRounded />
                      </IconButton>
                    </ListItem>
                  )}
                  <ListItem>
                    <IconButton onClick={() => setAddType(true)} title="Add VendorType" disabled={lock}>
                      <LocalOfferRounded />
                    </IconButton>
                  </ListItem>
                  {activeTab === 1 && (
                    <ListItem>
                      <IconButton disabled={lock} onClick={() => setVendingModal(true)} title="Add Item">
                        <PostAdd />
                      </IconButton>
                    </ListItem>
                  )}
                  <ListItem>
                    <IconButton>
                      <PrintRounded />
                    </IconButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Suspense fallback={<MyBackdrop />}>
              <Switch>
                <Route exact path="/panel/purchase/vendor">
                  <DataGrid
                    style={{ minHeight: "calc(100vh - 160px)" }}
                    url="/vendor"
                    columns={cols}
                    initParams={tech ? { tech: true } : {}}
                    onRowSelected={(d) => {
                      history.push(`/panel/purchase/vendor/${d.id}${window.location.search}`);
                    }}
                  />
                </Route>
                <Route exact path="/panel/purchase/vendor/:vendorId">
                  <Details />
                </Route>
              </Switch>
            </Suspense>
          </Box>
        </Box>
      </BasePaper>
    </>
  );
}
