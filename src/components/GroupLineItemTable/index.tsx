import React, { useState, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";

import Button from "app/Button";
// import useGroupedLineItems from "./useGroupedLineItems";
import AddDeviceModal from "./AddDeviceModal";
import AddOptionModal from "./AddOptionModal";
import AddServiceModal from "./AddServiceModal";
import Row from "./Group";
import EditGroupUnitModal from "./EditGroupUnitModal";

import Confirm from "common/Confirm";

// TODO: maybe some day use Drag and Drop and make groups draggable
// TODO: also you can make line items draggable that user can drag and drop an item to another group

const useStyles = makeStyles({
  root: {
    "& .MuiTableHead-root": {
      backgroundColor: "#2d2d2d",
    },
    "& .MuiTableHead-root .MuiTableCell-root ": {
      color: "white",
    },
  },
});

export default function GroupLineItemTable({
  groups,
  setGroups,
}: {
  groups: any[];
  setGroups: (groups: any[]) => void;
}) {
  // const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number>();

  const addGroup = useCallback(() => {
    setGroups([...groups, []]);
  }, [groups, setGroups]);

  const deleteGroup = useCallback(
    (index: number) => {
      setGroups(groups.filter((_, i) => i !== index));
    },
    [groups, setGroups]
  );

  const addLineItemToGroup = useCallback(
    (groupIndex: number, data: any) => {
      const temp = groups.concat();
      if (data.type === "device" && temp[groupIndex].some((l: any) => l.type === "device")) {
        return;
      }
      temp[groupIndex].push(data);

      setGroups(temp);
    },
    [groups, setGroups]
  );

  const editLineItem = useCallback(
    (groupIndex: number, lineItemIndex: number, data: any) => {
      const temp = groups.concat();
      temp[groupIndex][lineItemIndex] = data;

      setGroups(temp);
    },
    [groups, setGroups]
  );

  const deleteLineItem = useCallback(
    (groupIndex: number, lineItemIndex: number) => {
      const temp = groups.concat();
      if (temp[groupIndex][lineItemIndex].type === "device") {
        Confirm({
          text: "Delete device of group will delete the whole group",
          onConfirm: () => {
            deleteGroup(groupIndex);
          },
        });
      } else {
        temp[groupIndex] = temp[groupIndex].filter((_: any, i: number) => i !== lineItemIndex);
      }

      setGroups(temp);
    },
    [deleteGroup, groups, setGroups]
  );

  const changeGroupUnitId = useCallback(
    (groupIndex: number, UnitId?: string) => {
      const temp = groups.concat();
      temp[groupIndex] = temp[groupIndex].map((li: any) => ({ ...li, UnitId }));

      setGroups(temp);
    },
    [groups, setGroups]
  );

  const [addDeviceModal, setAddDeviceModal] = useState(false);
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [addOptionModal, setAddOptionModal] = useState(false);
  const [editUnitGroupModal, setEditUnitGroupModal] = useState(false);
  const classes = useStyles();

  const getSelectedGroupDeviceId = () => {
    if (selectedGroup !== undefined) {
      return groups[selectedGroup]?.find((li: any) => li.type === "device")?.ItemId;
    }

    return undefined;
  };

  return (
    <>
      <AddDeviceModal
        open={addDeviceModal}
        onClose={() => setAddDeviceModal(false)}
        onSubmit={(data) => {
          if (selectedGroup !== undefined) {
            addLineItemToGroup(selectedGroup, data);
            setAddDeviceModal(false);
          }
        }}
      />
      <AddServiceModal
        open={addServiceModal}
        onClose={() => setAddServiceModal(false)}
        deviceId={getSelectedGroupDeviceId()}
        onSubmit={(data) => {
          if (selectedGroup !== undefined) {
            addLineItemToGroup(selectedGroup, data);
            setAddServiceModal(false);
          }
        }}
      />
      <AddOptionModal
        open={addOptionModal}
        onClose={() => setAddOptionModal(false)}
        onSubmit={(data) => {
          if (selectedGroup !== undefined) {
            addLineItemToGroup(selectedGroup, data);
            setAddOptionModal(false);
          }
        }}
      />
      <EditGroupUnitModal
        open={editUnitGroupModal}
        onClose={() => setEditUnitGroupModal(false)}
        onSubmit={(unitId) => {
          if (selectedGroup !== undefined) {
            changeGroupUnitId(selectedGroup, unitId);
            setEditUnitGroupModal(false);
          }
        }}
      />

      <Paper>
        <Box m={2} p={2} display="flex">
          <Button variant="outlined" onClick={() => addGroup()}>
            Add Group
          </Button>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table size="small" className={classes.root}>
          <TableHead>
            <TableRow>
              <TableCell width={50} />
              <TableCell>Group Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Total</TableCell>
              <TableCell width={50}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((row, i) => (
              <Row
                key={i}
                row={row}
                index={i + 1}
                onDeleteGroup={() => deleteGroup(i)}
                onEditUnit={() => {
                  setSelectedGroup(i);
                  setEditUnitGroupModal(true);
                }}
                onAddDevice={() => {
                  setSelectedGroup(i);
                  setAddDeviceModal(true);
                }}
                onAddOption={() => {
                  setSelectedGroup(i);
                  setAddOptionModal(true);
                }}
                onAddService={() => {
                  console.log({ i });

                  setSelectedGroup(i);
                  setAddServiceModal(true);
                }}
                onDeleteLineItem={(lineIndex) => {
                  deleteLineItem(i, lineIndex);
                }}
                onEditLineItem={(lineIndex, data: any) => {
                  editLineItem(i, lineIndex, data);
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
