import React, { useState } from "react";
import { Box, Popover } from "@material-ui/core";
import Button from "app/Button";
import { AddEmployeeModal } from "features/Modals/EmployeeModal";
import { EditProfile } from "./EditProfile";
import { useSelector } from "react-redux";
import { selectSession } from "features/Session/sessionsSlice";

export default function NotificationMenu({
  open,
  anchorEl,
  onClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const [changePass, setChangePass] = useState(false);
  const [editProf, setEditProf] = useState(false);
  const session = useSelector(selectSession);

  return (
    <>
      <EditProfile open={editProf} onClose={() => setEditProf(false)} />
      <AddEmployeeModal
        open={changePass}
        onClose={() => setChangePass(false)}
        initTab={2}
        initialVals={session?.session}
      />
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
              setChangePass(true);
              onClose();
            }}
          >
            Change Password
          </Button>
          <Button
            onClick={() => {
              setEditProf(true);
              onClose();
            }}
            fullWidth
          >
            Edit Profile
          </Button>
        </Box>
      </Popover>
    </>
  );
}
