import React, { useState } from "react";

import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import AddRounded from "@material-ui/icons/AddRounded";
import DeleteRounded from "@material-ui/icons/DeleteRounded";
import PrintRounded from "@material-ui/icons/PrintRounded";
import CategoryRounded from "@material-ui/icons/CategoryRounded";

import List from "../../app/SideUtilityList";

import AddServiceModal from "../../features/FieldService/AddServiceModal";
import FieldServiceDetails from "../../features/FieldService/Details";

import { IFieldService } from "../../api/fieldService";
import { createServiceClass, deleteServiceClass, updateServiceClass } from "../../api/serviceClass";
import { createServiceCategory, deleteServiceCategory, updateServiceCategory } from "../../api/serviceCategories";

import OneFieldModal from "../../components/OneFieldModal";
import { BasePaper } from "../../app/Paper";
import { FindInPageRounded, ListAltRounded, LocalOfferRounded } from "@material-ui/icons";
import DataGrid from "../../app/NewDataGrid";

export default function ServiceIndex() {
  const [activeTab, setActiveTab] = useState(0);
  const [addService, setAddService] = useState(false);
  const [serviceClassModal, setServiceClassModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  const [selectedFS, setSelectedFS] = useState<IFieldService | null>(null);

  const cols = [
    { name: "no", header: "ID", minWidth: 200 },
    { name: "name", header: "Name", flex: 1 },
    {
      name: "type",
      header: "Type",
      minWidth: 200,
    },
    {
      name: "class",
      header: "Class",
      minWidth: 200,
    },
    { name: "price", header: "Price", type: "number", width: 150 },
  ];

  return (
    <Box display="flex" height="100%" flex={1}>
      <BasePaper style={{ flex: 1 }}>
        <AddServiceModal open={addService} onClose={() => setAddService(false)} onDone={() => {}} />
        <OneFieldModal
          title="Add/Edit Service Classes"
          getUrl="/serviceClass"
          open={serviceClassModal}
          onClose={() => setServiceClassModal(false)}
          postRecord={createServiceClass}
          updateRecord={updateServiceClass}
          deleteRecord={deleteServiceClass}
        />
        <OneFieldModal
          title="Add/Edit Service Categories"
          getUrl="/serviceCategory"
          open={categoryModal}
          onClose={() => setCategoryModal(false)}
          postRecord={createServiceCategory}
          updateRecord={updateServiceCategory}
          deleteRecord={deleteServiceCategory}
        />

        <Box display="flex" alignItems="center">
          <Tabs
            value={activeTab}
            textColor="primary"
            onChange={(e, nv) => setActiveTab(nv)}
            style={{ marginBottom: 10 }}
          >
            <Tab
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> List
                </span>
              }
              wrapped
            />
            <Tab
              disabled={!selectedFS}
              icon={
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
                </span>
              }
            />
          </Tabs>
          <Box marginLeft="auto">
            <List>
              <ListItem title="Add New Service">
                <IconButton
                  onClick={() => {
                    setAddService(true);
                    setSelectedFS(null);
                    setActiveTab(0);
                  }}
                >
                  <AddRounded />
                </IconButton>
              </ListItem>
              {activeTab === 0 && (
                <>
                  <ListItem title="Classes">
                    <IconButton
                      onClick={() => {
                        setServiceClassModal(true);
                      }}
                    >
                      <LocalOfferRounded />
                    </IconButton>
                  </ListItem>
                  <ListItem title="Categories">
                    <IconButton
                      onClick={() => {
                        setCategoryModal(true);
                      }}
                    >
                      <CategoryRounded />
                    </IconButton>
                  </ListItem>
                </>
              )}
              {activeTab === 1 && (
                <ListItem title="Delete">
                  <IconButton>
                    <DeleteRounded />
                  </IconButton>
                </ListItem>
              )}
              <ListItem title="Print">
                <IconButton>
                  <PrintRounded />
                </IconButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box display="flex">
          {activeTab === 0 && (
            <DataGrid
              columns={cols}
              url="/service"
              onRowSelected={(fs) => {
                setSelectedFS(fs);
                setActiveTab(1);
              }}
            />
          )}
          {activeTab === 1 && selectedFS && (
            <FieldServiceDetails
              selectedFieldService={selectedFS}
              setIndexActiveTab={(t) => setActiveTab(t)}
              setSelectedFieldService={(fs) => setSelectedFS(fs)}
            />
          )}
        </Box>
      </BasePaper>
    </Box>
  );
}
