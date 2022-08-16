import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, ListItem, Tabs, Tab, LinearProgress, useMediaQuery } from "@material-ui/core";
import {
  AddRounded,
  DeleteRounded,
  PostAddRounded,
  FormatListNumberedRounded,
  OutlinedFlagRounded,
  ListAltRounded,
  FindInPageRounded,
} from "@material-ui/icons";
import useSWR from "swr";
import { useParams } from "react-router-dom";

import Confirm from "features/Modals/Confirm";

import LevelModal from "common/Level/Modal";
import { AddItemModal } from "features/Items/ItemModals";

import DetailTab from "pages/Engineering/devices/Details";
import AddTaskModal, { EditTaskModal } from "features/Engineering/Devices/TaskModal";
import FlagModal from "features/Engineering/Devices/FlagModal";

import List from "app/SideUtilityList";
import { BasePaper } from "app/Paper";

import { deleteAnItem, IItem } from "api/items";

import { splitLevelName } from "logic/levels";

import DataGrid from "app/NewDataGrid";
import { ILevel } from "api/level";

const Devices = ({ sales }: { sales?: boolean }) => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const { data: defaultDevice } = useSWR(deviceId ? `/item/${deviceId}` : null);
  const { data: levels } = useSWR<{ result: ILevel[]; total: number }>("/level");

  const phone = useMediaQuery("(max-width:900px)");
  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [finish, setFinish] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedStep, setSelectedStep] = useState<any>();
  const [selectedFlag, setSelectedFlag] = useState<any>();

  const [addItemModal, setAddItemModal] = useState(false);
  const [addStepModal, setAddStepModal] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [editStepModal, setEditStepModal] = useState(false);
  const [editFlagModal, setEditFlagModal] = useState(false);

  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [levelModal, setLevelModal] = useState(false);

  const gridColumns = useMemo(() => {
    let res = [
      { name: "no", header: "Device Number", minWidth: 120 },
      { name: "name", header: "Name", flex: 1, minWidth: 200 },
      { name: "description", header: "Description", flex: 2, minWidth: 200 },
      { name: "lead", header: "Lead Time", minWidth: 120 },
      { name: "retailPrice", header: "Price", minWidth: 120, type: "number" },
    ];

    if (!sales) {
      if (levels && levels.result) {
        levels?.result?.map((f: any) =>
          res.splice(3, 0, { name: f.name, header: splitLevelName(f.name), minWidth: 120 })
        );
        setFinish(true);
      }
    }

    return res;
  }, [levels, sales]);

  const handleDelete = useCallback(async () => {
    try {
      if (selectedItem && selectedItem.id) {
        await deleteAnItem(selectedItem.id);
        setDeleteItemModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (defaultDevice && selectedItem === null) {
      setSelectedItem(defaultDevice);
      setActiveTab(1);
    }
  }, [defaultDevice, selectedItem]);

  if (!deviceId) {
    return <></>;
  }

  return (
    <BasePaper>
      {selectedStep && selectedItem && selectedItem.id && (
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
      )}
      <AddItemModal
        device
        open={addItemModal}
        onClose={() => setAddItemModal(false)}
        initialValues={{ class: "device" } as IItem}
      />
      <Confirm open={deleteItemModal} onClose={() => setDeleteItemModal(false)} onConfirm={handleDelete} />
      <LevelModal open={levelModal} onClose={() => setLevelModal(false)} />

      <Box display="flex" justifyContent="flex-end" alignItems="center" my={1}>
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
                  <IconButton title="Cluster and level" onClick={() => setLevelModal(true)}>
                    <PostAddRounded />
                  </IconButton>
                </ListItem>
              </>
            )}
            {activeTab === 1 && (
              <>
                <ListItem>
                  <IconButton title="Add Task" onClick={() => setAddStepModal(true)}>
                    <FormatListNumberedRounded />
                  </IconButton>
                </ListItem>
                <ListItem>
                  <IconButton
                    title="Delete Device"
                    onClick={() => selectedItem && selectedItem?.id && setDeleteItemModal(true)}
                  >
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

      <Box display="flex" alignItems="flex-start" mt={1}>
        <Box flex={1}>
          {activeTab === 0 && (
            <>
              <Box>
                {finish || sales ? (
                  <DataGrid
                    style={phone ? { minHeight: "calc(100vh - 215px)" } : { minHeight: "calc(100vh - 165px)" }}
                    url="/item"
                    initParams={{ class: "device", fru: false }}
                    onRowSelected={(r) => {
                      setSelectedItem(r as any);
                      setActiveTab(1);
                    }}
                    columns={gridColumns}
                  />
                ) : (
                  <LinearProgress />
                )}
              </Box>
            </>
          )}
          {activeTab === 1 && (
            <DetailTab
              sales={sales}
              onDone={() => {}}
              onStepSelected={(d) => {
                setSelectedStep(d);
                setEditStepModal(true);
              }}
              onFlagSelected={(d) => {
                setSelectedFlag(d);
                setEditFlagModal(true);
              }}
            />
          )}
        </Box>
      </Box>
    </BasePaper>
  );
};

export default Devices;
