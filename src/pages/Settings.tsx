import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import UnderDev from "app/UnderDevelopment";
// import jobRecords from "mock/jobrecords.json";
// import { groupBy } from "logic/utils";

export default function Settings() {
  // useEffect(() => {
  //   const unitNumber = "CMEL-525W-120-120-90";
  //   const grouped = Array.from(groupBy(jobRecords, (j) => j.parent?.no || "No Parent"));

  //   const mainComponentsGroup = grouped.find((g) => g[0] === unitNumber);
  //   const mainComponents = mainComponentsGroup ? mainComponentsGroup[1] : [];

  //   const withoutParentGroup = grouped.find((g) => g[0] === "No-Parent");
  //   const withoutParent = withoutParentGroup ? withoutParentGroup[1] : [];

  //   let all: any[] = [];
  //   for (const c of mainComponents) {
  //     all.push(c, ...jobRecords.filter((j) => j.parent?.no === c?.ItemId?.no));
  //   }
  //   all.push(...withoutParent);

  //   let seen = false;
  //   for (const g of grouped) {
  //     seen = false;
  //     for (const j of all) {
  //       if (j?.parent?.no === g[0]) {
  //         seen = true;
  //       }
  //     }
  //     if (!seen) {
  //       all = all.concat(g[1]);
  //     }
  //   }

  //   console.log({ grouped, jobRecords });
  // }, []);

  // useEffect(() => {
  //   const found = jobRecords.find((j) => j.ItemId?.no === "OE3-8KW-208Y/120-208Y/120-90");
  //   console.log({ found });
  // }, []);

  return (
    <Container>
      <UnderDev />
    </Container>
  );
}
