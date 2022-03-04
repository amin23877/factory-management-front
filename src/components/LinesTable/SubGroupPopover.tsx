import { Popover, Box } from "@material-ui/core";
import React from "react";

const style = {
  padding: "10px 20px",
  borderBottom: "1px solid whiteSmoke",
  color: "white",
};

export function SubGroupPopover({
  open,
  anchorEl,
  clickedItem,
  index,
  setAnchorEl,
  onClose,
  setEdit,
  onDelete,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  clickedItem: any;
  index: number;
  onClose: () => void;
  setEdit: (clickedItem: any) => void;
  onDelete: (clickedItem: any) => void;
  setAnchorEl: (a: any | null) => void;
}) {
  return (
    <Popover
      id="subgroup-popover"
      open={open}
      anchorEl={anchorEl}
      onClose={() => {
        setAnchorEl(null);
      }}
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
            onClose();
            onDelete(index);
          }}
        >
          Delete
        </span>
      </Box>
    </Popover>
  );
}
