import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Button from "app/Button";
import useGroupedLineItems from "./useGroupedLineItems";
import AddDeviceModal from "./AddDeviceModal";
import AddOptionModal from "./AddOptionModal";
import AddServiceModal from "./AddServiceModal";
import Row from "./Group";
import EditGroupUnitModal from "./EditGroupUnitModal";

// TODO: maybe some day use Drag and Drop and make groups draggable
// TODO: also you can make line items draggable that user can drag and drop an item to another group

export default function GroupLineItemTable() {
  const {
    groups,
    selectedGroup,
    setSelectedGroup,
    addGroup,
    deleteGroup,
    addLineItemToGroup,
    editLineItem,
    deleteLineItem,
    changeGroupUnitId,
  } = useGroupedLineItems();
  const [addDeviceModal, setAddDeviceModal] = useState(false);
  const [addServiceModal, setAddServiceModal] = useState(false);
  const [addOptionModal, setAddOptionModal] = useState(false);
  const [editUnitGroupModal, setEditUnitGroupModal] = useState(false);

  return (
    <>
      <AddDeviceModal
        open={addDeviceModal}
        onClose={() => setAddDeviceModal(false)}
        onSubmit={(data) => {
          if (selectedGroup !== undefined) {
            console.log({ AddDeviceModal: data });

            addLineItemToGroup(selectedGroup, data);
            setAddDeviceModal(false);
          }
        }}
      />
      <AddServiceModal
        open={addServiceModal}
        onClose={() => setAddServiceModal(false)}
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
          <Button variant="outlined" onClick={() => console.log({ groups })}>
            Submit
          </Button>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
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
