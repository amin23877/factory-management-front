import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

import UnderDev from "app/UnderDevelopment";
import jobRecords from "mock/jobrecords.json";
import { groupBy } from "logic/utils";

const isEqual = (a: any, b: any) => {
  const aNumber = a?.ItemId?.no || a?.ItemNo || "";
  const bNumber = b?.ItemId?.no || b?.ItemNo || "";

  return aNumber === bNumber;
};

const isChild = (jb: any, p: any) => {
  const jbNumber = jb.parent?.no || jb.parentNo || "";
  const pNumber = p?.ItemId?.no || p?.ItemNo || "";

  return jbNumber === pNumber;
};

const getItemNumber = (jb: any) => jb?.ItemId?.no || jb?.ItemNo;
const getParentNumber = (jb: any) => jb?.parent?.no || jb?.parentNo;

export default function Settings() {
  useEffect(() => {
    const unitNumber = "DE1-10KW-120-120-120";
    const sorted: any[] = [];
    const jbCopy = jobRecords.concat();

    for (const jb of jbCopy) {
      // const sortedIndex = sorted.findIndex(i => isEqual(i, jb))
      const parentIndex = sorted.findIndex((i) => getItemNumber(i) === getParentNumber(jb));
      if (parentIndex > -1) {
        sorted.splice(parentIndex, 0, jb);
      } else {
        sorted.push(jb);
      }
    }
    console.log({
      sorted: sorted.map((s) => ({ itemNo: s.ItemId?.no || s.ItemNo, parentNo: s.parent?.no || s.parentNo })),
    });
  }, []);
  // useEffect(() => {
  //   const unitNumber = "DE1-10KW-120-120-120";
  //   const grouped = Array.from(groupBy(jobRecords, (j) => j.parent?.no || j?.parentNo || "No Parent"));

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

  //   console.log({ grouped, jobRecords, all });
  // }, []);

  return (
    <Container>
      <UnderDev />
    </Container>
  );
}
