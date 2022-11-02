import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import {
  AddRounded,
  DeleteRounded,
  PostAddRounded,
  FormatListNumberedRounded,
  OutlinedFlagRounded,
  ListAltRounded,
  FindInPageRounded,
} from "@material-ui/icons";

import Confirm from "features/Modals/Confirm";
import { AddItemModal } from "features/Items/ItemModals";
import UnitDetails from "pages/Engineering/Units/Details";

import ClusterModal from "common/Cluster/Modal";

import DetailTab from "pages/Engineering/Devices/Details";
import AddTaskModal, { EditTaskModal } from "features/Engineering/Devices/TaskModal";
import FlagModal from "features/Engineering/Devices/FlagModal";

import List from "app/SideUtilityList";
import DataGrid from "app/NewDataGrid";
import { BasePaper } from "app/Paper";

import { deleteAnItem, IItem } from "api/items";
import { clusterType } from "api/cluster";
import AsyncCombo from "common/AsyncCombo";
import { IUnit } from "api/units";
import { formatTimestampToDate } from "logic/date";
import { get } from "api";
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from "react-router-dom";
import MyBackdrop from "app/Backdrop";

/*
const additionalLevels = [
  { name: "Battery Cabinet Quantity", label: "B.C.QTY" },
  { name: "Battery Cabinet", label: "B.C." },
  { name: "Battery Run-Time", label: "B. Run-Time" },
  { name: "Battery Run-Time", label: "B. Run-Time" },
  { name: "Enclosure Type", label: "Enclosure Type" },
  { name: "Input Voltage", label: "Input Voltage" },
  { name: "Inverter Cabinet Size", label: "I.C. Size" },
  { name: "Inverter Type", label: "Inverter Type" },
  { name: "Main Cabinet Quantity", label: "Main Cabinet QTY" },
  { name: "Output Type", label: "Output Type" },
  { name: "Output Voltage", label: "Output Voltage" },
  { name: "Power Rating", label: "Power Rating" },
].map((l) => ({
  name: l.name,
  header: l.label,
  minWidth: 120,
  render: ({ data }: any) => {
    if (data.levels && data.levels[l.name]) {
      return data.levels[l.name];
    } else {
      return "-";
    }
  },
}));
*/

const Devices = ({ sales }: { sales?: boolean }) => {
  const history = useHistory();
  const location = useLocation();

  const tabs = ["devices", "units", "details"];
  const { deviceId } = useParams<{ deviceId: string }>();

  const [selectedStep, setSelectedStep] = useState<any>();
  const [selectedFlag, setSelectedFlag] = useState<any>();
  const [selectedCluster, setSelectedCluster] = useState<clusterType>();
  const [additionalLevels, setAdditionalLevels] = useState<any[]>([]);

  const [addItemModal, setAddItemModal] = useState(false);
  const [addStepModal, setAddStepModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [editStepModal, setEditStepModal] = useState(false);
  const [editFlagModal, setEditFlagModal] = useState(false);

  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [levelModal, setLevelModal] = useState(false);

  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/").length === 6 ? 2 : tabs.indexOf(location.pathname.split("/")[4])
  );

  useEffect(() => {
    if (location.pathname.split("/")[4]) {
      if (location.pathname.split("/").length === 6) {
        setActiveTab(2);
      } else {
        setActiveTab(tabs.indexOf(location.pathname.split("/")[4]));
      }
    }
  }, [location]);

  const phone = useMediaQuery("(max-width:900px)");

  const unitColumns = [
    {
      name: "number",
      header: "Number",
      minWidth: 150,
    },
    {
      name: "name",
      header: "Name",
      minWidth: 200,
    },
    {
      name: "description",
      header: "Description",
      flex: 1,
    },
    {
      name: "Lead Time",
      render: ({ data }: any) => formatTimestampToDate(data?.so?.leadTime),
      minWidth: 120,
    },

    { name: "price", header: "Price", minWidth: 110, render: ({ data }: any) => data?.so?.price },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        if (selectedCluster) {
          const levels = await get(`/level`, { params: { clusterId: selectedCluster.id, pageSize: 20 } });
          const result = levels.result?.map((l: any) => ({
            name: l.name,
            header: l.name,
            minWidth: 120,
            render: ({ data }: any) => {
              if (data.levels && data.levels[l.name]) {
                return data.levels[l.name];
              } else {
                return "-";
              }
            },
          }));

          setAdditionalLevels(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [selectedCluster]);

  const gridColumns = useMemo<any[]>(() => {
    const res = [
      {
        name: "no",
        header: "Device Number",
        minWidth: 120,
      },
      { name: "name", header: "Name", flex: 1, minWidth: 200 },
      { name: "description", header: "Description", flex: 2, minWidth: 200 },
      { name: "bom", header: "BOM", type: "boolean", defaultFilterValue: undefined, defaultWidth: 80 },
      ...(selectedCluster && additionalLevels ? additionalLevels : []),
      { name: "leadTime", header: "Lead Time", minWidth: 120 },
      { name: "retailPrice", header: "Price", minWidth: 120, type: "number" },
    ];

    return res;
  }, [additionalLevels, selectedCluster]);

  const handleDelete = async () => {
    try {
      if (deviceId) {
        await deleteAnItem(deviceId);
        setDeleteItemModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasePaper>
      {/* {selectedStep && selectedItem && selectedItem.id && (
        <EditTaskModal
          device={selectedItem}
          tab={selectedStep.tab}
          task={selectedStep}
          itemId={selectedItem.id as any}
          open={editStepModal}
          onClose={() => setEditStepModal(false)}
        />
      )}
      {selectedItem && selectedItem.id && (
        <AddTaskModal
          device={selectedItem}
          open={addStepModal}
          itemId={selectedItem.id as any}
          onClose={() => setAddStepModal(false)}
        />
      )}
      {selectedFlag && selectedItem && selectedItem.id && (
        <FlagModal
          open={editFlagModal}
          itemId={selectedItem.id as any}
          onClose={() => setEditFlagModal(false)}
          flag={selectedFlag}
        />
      )}
      {selectedItem && selectedItem.id && (
        <FlagModal open={flagModalOpen} onClose={() => setFlagModalOpen(false)} itemId={selectedItem.id as any} />
      )}*/}
      <AddItemModal
        device
        open={addItemModal}
        onClose={() => setAddItemModal(false)}
        initialValues={{ class: "device" } as IItem}
      />
      <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
      <ClusterModal open={levelModal} onClose={() => setLevelModal(false)} />
      <Box display="flex" justifyContent="flex-end" alignItems="center" my={1}>
        <Tabs
          value={activeTab}
          textColor="primary"
          onChange={(e, nv) => {
            setActiveTab(nv);
            history.push({
              pathname: `/panel/${sales ? "sales" : "engineering"}/device/` + tabs[nv],
              search: window.location.search,
            });
          }}
        >
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> Devices
              </span>
            }
            wrapped
          />
          <Tab
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <ListAltRounded fontSize="small" style={{ marginRight: 5 }} /> Units
              </span>
            }
            wrapped
          />
          <Tab
            disabled={activeTab !== 2}
            icon={
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FindInPageRounded fontSize="small" style={{ marginRight: 5 }} /> Details
              </span>
            }
          />
        </Tabs>
        <div style={{ flexGrow: 1 }} />
        {!sales && (
          <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
            {activeTab === 0 && (
              <>
                <ListItem>
                  <IconButton title="Add Device" onClick={() => setAddItemModal(true)}>
                    <AddRounded />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton title="Levels" onClick={() => setLevelModal(true)}>
                    <PostAddRounded />
                  </IconButton>
                </ListItem>
              </>
            )}
            {activeTab === 2 && deviceId && (
              <>
                <ListItem>
                  <IconButton title="Add Task" onClick={() => setAddStepModal(true)}>
                    <FormatListNumberedRounded />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton title="Delete Device" onClick={() => deviceId && setDeleteItemModal(true)}>
                    <DeleteRounded />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton title="Add Flag" onClick={() => setFlagModalOpen(true)}>
                    <OutlinedFlagRounded />
                  </IconButton>
                </ListItem>
              </>
            )}
          </List>
        )}
      </Box>
      {activeTab === 0 && (
        <AsyncCombo
          label="Clusters"
          placeholder="All"
          url="/cluster"
          filterBy="clusterValue"
          defaultParams={{ class: "device" }}
          getOptionLabel={(o) => o?.clusterValue}
          getOptionSelected={(o, v) => o?.id === v?.id}
          value={selectedCluster}
          onChange={(e, nv) => setSelectedCluster(nv)}
          style={{ maxWidth: 300 }}
        />
      )}
      <Box display="flex" alignItems="flex-start" mt={1}>
        <Box flex={1}>
          <Suspense fallback={<MyBackdrop />}>
            <Switch>
              <Route exact path={`/panel/${sales ? "sales" : "engineering"}/device/`}>
                <Redirect to={`/panel/${sales ? "sales" : "engineering"}/device/devices`} />
              </Route>
              <Route exact path={`/panel/${sales ? "sales" : "engineering"}/device/devices`}>
                <DataGrid
                  setUrlFilters
                  style={phone ? { minHeight: "calc(100vh - 215px)" } : { minHeight: "calc(100vh - 215px)" }}
                  url="/item"
                  initParams={{ class: "device", clusterId: selectedCluster?.id || undefined }}
                  columns={gridColumns}
                  onRowSelected={(d: IItem) => {
                    history.push(
                      `/panel/${sales ? "sales" : "engineering"}/device/devices/${d.id}${window.location.search}`
                    );
                  }}
                />
              </Route>
              <Route exact path={`/panel/${sales ? "sales" : "engineering"}/device/units`}>
                <DataGrid
                  setUrlFilters
                  style={phone ? { minHeight: "calc(100vh - 215px)" } : { minHeight: "calc(100vh - 165px)" }}
                  url="/unit"
                  initParams={{ class: "device" }}
                  columns={unitColumns}
                  onRowSelected={(d) => {
                    history.push(
                      `/panel/${sales ? "sales" : "engineering"}/device/units/${d.id}${window.location.search}`
                    );
                  }}
                />
              </Route>
              <Route exact path={`/panel/${sales ? "sales" : "engineering"}/device/devices/:deviceId`}>
                {" "}
                <DetailTab
                  sales={sales}
                  onDone={() => {}}
                  onFlagSelected={(d) => {
                    setSelectedFlag(d);
                    setEditFlagModal(true);
                  }}
                />
              </Route>
              <Route exact path={`/panel/${sales ? "sales" : "engineering"}/device/units/:unitId`}>
                <UnitDetails />
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </Box>
    </BasePaper>
  );
};

export default Devices;
