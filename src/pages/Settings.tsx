import React, { useState } from "react";
import { Container } from "@material-ui/core";
import AsyncCombo from "common/AsyncCombo";

// import UnderDev from "app/UnderDevelopment";

export default function Settings() {
  const [value, setValue] = useState<string>();

  return (
    <Container>
      {/* <UnderDev /> */}
      <AsyncCombo
        url="/item"
        filterBy="no"
        value={value}
        getOptionLabel={(i) => i?.no || "No-Number"}
        getOptionSelected={(o, v) => o.id === v.id}
        onChange={(e, nv) => setValue(nv.id)}
      />
    </Container>
  );
}
