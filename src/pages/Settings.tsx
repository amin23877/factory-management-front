import React from "react";
import { Container } from "@material-ui/core";

// import Table from "features/Engineering/BOM/Table";
import UnderDev from "app/UnderDevelopment";

export default function Settings() {
  return (
    <Container>
      <UnderDev />
      {/* <div style={{ height: 400 }}>
        <Table
          cluster={{
            class: "device",
            clusterValue: "CMEL",
            createdAt: 1654099056837,
            description: "Strand-By Emergency Lighting Back-Up inverter 525W to 1050W",
            deviceName: "Cobra Micro Elite",
            id: "62978c7049ba2a507d1e6721",
            updatedAt: 1654099056837,
            __v: 0,
          }}
        />
      </div> */}
    </Container>
  );
}
