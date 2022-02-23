import React from "react";
import { Button, Container } from "@material-ui/core";

import UnderDev from "../app/UnderDevelopment";

import { sendNotificationTest } from "api/notification";

export default function Settings() {
  return (
    <Container>
      <Button
        variant="contained"
        onClick={() => {
          sendNotificationTest()
            .then((d) => console.log(d))
            .catch((e) => console.log(e));
        }}
      >
        Send test notification
      </Button>
      {/* <UnderDev /> */}
    </Container>
  );
}
