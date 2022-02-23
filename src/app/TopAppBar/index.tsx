import React from "react";
import { Button, IconButton, Box } from "@material-ui/core";
import { ArrowDropDownRounded, HelpOutline, TvRounded, ChatRounded } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import UPCToggle from "../../components/UPC";
import NotificationButton from "./Notification/Button";

export const TopAppBar = ({
  isChatOpen,
  onOpenChatClicked,
}: {
  onOpenChatClicked: () => void;
  isChatOpen: boolean;
}) => {
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box flex={1} display="flex" alignItems="center">
      <div style={{ flexGrow: 1 }}></div>
      {phone && <div style={{ flexGrow: 1 }}></div>}

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
