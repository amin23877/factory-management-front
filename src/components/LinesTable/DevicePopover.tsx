import { Popover, Box } from "@material-ui/core";
import React from "react";

const style = {
  padding: "10px 20px",
  borderBottom: "1px solid whiteSmoke",
  color: "white",
};

export function DevicePopover({
  open,
  anchorEl,
  clickedItem,
  index,
  onDelete,
  onClose,
  setAddService,
  setAddOption,
  setEdit,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  index: number;
  clickedItem: any;
  onClose: () => void;
  onDelete: (clickedItem: any) => void;
  setAddService: (clickedItem: any) => void;
  setAddOption: (clickedItem: any) => void;
  setEdit: (clickedItem: any) => void;
}) {
  return (
    <Popover
      id="device-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        style={{
          background: "#373a4d",
          cursor: "pointer",
        }}
      >
        <span
          style={style}
          onClick={(e) => {
            setAddService(clickedItem.ItemId);
            onClose();
          }}
        >
          Add Service
        </span>
        <span
          style={style}
          onClick={(e) => {
            setAddOption(clickedItem.ItemId);
            onClose();
          }}
        >
          Add Option
        </span>
        <span
          style={style}
          onClick={() => {
            onClose();
            setEdit(clickedItem);
          }}
        >
          Edit
        </span>
        <span
          style={{ ...style, border: "none" }}
          onClick={() => {
            onDelete(index);
            onClose();
          }}
        >
          Delete
        </span>
      </Box>
    </Popover>
  );
}
