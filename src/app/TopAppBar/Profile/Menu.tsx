import React, { useState } from "react";
import { Box, Popover } from "@material-ui/core";
import Button from "app/Button";
import { AddEmployeeModal } from "features/Modals/EmployeeModal";

export default function NotificationMenu({
  open,
  anchorEl,
  onClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const [editProfile, setEditProfile] = useState(false);

  return (
    <>
      <AddEmployeeModal open={editProfile} onClose={() => setEditProfile(false)} initTab={2} />
      <Popover
        id="notification-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2} width={200} overflow="auto">
          <Button
            onClick={() => {
              setEditProfile(true);
              onClose();
            }}
          >
            Change Password
          </Button>
        </Box>
      </Popover>
    </>
  );
}
