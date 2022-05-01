import React from "react";
import { Button, IconButton, Box } from "@material-ui/core";
import { ArrowDropDownRounded, HelpOutline, TvRounded, ChatRounded, ExitToAppRounded } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from "react-redux";

import { logout } from "features/Session/sessionsSlice";

import UPCToggle from "../../components/UPC";
import NotificationButton from "./Notification/Button";

export const TopAppBar = ({
  isChatOpen,
  onOpenChatClicked,
}: {
  onOpenChatClicked: () => void;
  isChatOpen: boolean;
}) => {
  const dispatch = useDispatch();
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box flex={1} display="flex" alignItems="center">
      <div style={{ flexGrow: 1 }}></div>
      {phone && <div style={{ flexGrow: 1 }}></div>}

      <IconButton onClick={() => dispatch(logout())} size="small" title="Help" color="inherit">
        <ExitToAppRounded style={{ marginRight: 3 }} />
      </IconButton>
      <UPCToggle />
      {!phone && (
        <IconButton size="small" title="Help" color="inherit">
          <HelpOutline style={{ marginRight: 3 }} />
        </IconButton>
      )}
      <NotificationButton />
      {!phone && (
        <Button size="small" color="inherit">
          <TvRounded style={{ marginRight: 3 }} />
          Phazify
          <ArrowDropDownRounded />
        </Button>
      )}
      {!isChatOpen && (
        <IconButton size="small" color="inherit" onClick={onOpenChatClicked}>
          <ChatRounded style={{ marginRight: 3 }} />
        </IconButton>
      )}
    </Box>
  );
};
