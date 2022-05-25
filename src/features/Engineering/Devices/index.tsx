import React, { useCallback, useMemo, useState } from "react";
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

import Confirm from "../../Modals/Confirm";
import { AddItemModal } from "../../Items/ItemModals";

import LevelModal from "common/Level/Modal";

import DetailTab from "./Details";
import AddTaskModal, { EditTaskModal } from "./TaskModal";
import FlagModal from "./FlagModal";

import List from "app/SideUtilityList";
import { BasePaper } from "app/Paper";

import { deleteAnItem, IItem } from "api/items";

import { splitLevelName } from "logic/levels";

import DataGrid from "app/NewDataGrid";
import { ILevel } from "api/level";

const Devices = ({ sales }: { sales?: boolean }) => {
  // something
  const { data: levels } = useSWR<{ result: ILevel[]; total: number }>("/level");

  const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
  const [finish, setFinish] = useState(true);

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

  const [gridColumns, setGridColumns] = useState<any[]>([
    {
      name: "no",
      header: "Device Number",
      minWidth: 120,
    },
    { name: "name", header: "Name", flex: 1, minWidth: 200 },
    { name: "description", header: "Description", flex: 2, minWidth: 200 },
    {
      name: "Battery Cabinet Quantity",
      header: "B.C.QTY",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Battery Cabinet Quantity" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Battery Cabinet",
      header: "B.C.",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Battery Cabinet" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Battery Run-Time",
      header: "B. Run Time",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Battery Run-Time" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Enclosure Type",
      header: "Enclosure Type",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Enclosure Type" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Input Voltage",
      header: "Input Voltage",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Input Voltage" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Inverter Cabinet Size",
      header: "I.C. Size",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Inverter Cabinet Size" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Inverter Type",
      header: "Inverter Type",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Inverter Type" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Main Cabinet Quantity",
      header: "Main Cabinet QTY",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Main Cabinet Quantity" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Output Type",
      header: "Output Type",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Output Type" + "__" + keys[0].split("__")[1]];
      },
    },
    {
      name: "Output Voltage",
      header: "Output Voltage",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Output Voltage" + "__" + keys[0].split("__")[1]];

      },
    },
    {
      name: "Power Rating",
      header: "Power Rating",
      minWidth: 120,
      render: ({ data }: any) => {
        let keys = Object.keys(data?.levels);
        return data.levels["Power Rating" + "__" + keys[0].split("__")[1]];

      },
    },
    { name: "leadTime", header: "Lead Time", minWidth: 120 },
    { name: "retailPrice", header: "Price", minWidth: 120, type: "number" },
  ]);
  const [counter, setCounter] = useState(0);

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
  const phone = useMediaQuery("(max-width:900px)");

  const handleDataFetched = (data: any) => {
    // console.log("handleDataFetched");
    // if (counter === 0 && data && data.result) {
    //   const levelsSet = new Set<string>();
    //   let levels: string[] = [];
    //   data.result.forEach((item: any) => {
    //     Object.keys(item?.levels || [])?.forEach((level: any) => {
    //       levelsSet.add(level);
    //     });
    //   });
    //   levels = Array.from(levelsSet);
    //   const levelColumns = levels
    //     .filter((l) => !gridColumns.find((c) => c.name === l))
    //     .map((l) => {
    //       return { name: l, defaultWidth: 150 };
    //     });
    //   const res = [...gridColumns.slice(0, 4), ...levelColumns, ...gridColumns.slice(4)];
    //   setGridColumns(res);
    //   setCounter((p) => p + 1);
    // }
  };

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
        initialValues={{ device: true } as IItem}
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
                  <IconButton title="Levels" onClick={() => setLevelModal(true)}>
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
                    initParams={{ device: true, fru: false }}
                    onDataFetched={handleDataFetched}
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
              selectedRow={selectedItem}
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
