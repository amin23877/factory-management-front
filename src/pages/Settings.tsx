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
    const deviceNo = "SEMIC-300W-120-120-90";
    const grouped = Array.from(groupBy(jobRecords, (i) => i.parentRec || deviceNo));

    const mainComponentsIndex = grouped.findIndex((g) => g[0] === deviceNo);
    const mainComponentsGroup = mainComponentsIndex > -1 ? grouped[mainComponentsIndex] : [];
    const mainComponents = mainComponentsGroup[1] || [];
    let all: any[] = [];

    for (const c of mainComponents) {
      all.push(c);

      const childrenIndex = grouped.findIndex((g) => g[0] === c._id);
      const children = childrenIndex > -1 ? grouped[childrenIndex] : null;
      if (children && children[1].length > 0) {
        all.push(...children[1]);
        grouped.splice(childrenIndex, 1);
      }
    }
    grouped.splice(mainComponentsIndex, 1);

    if (grouped.length > 0) {
      for (const g of grouped) {
        const parentIndex = all.findIndex((i) => i._id === g[0]);

        if (parentIndex > -1) {
          all = [...all.slice(0, parentIndex), ...g[1], ...all.slice(parentIndex)];
        }
      }
    }

    console.log({ all });
  }, []);

  return (
    <Container>
      <UnderDev />
    </Container>
  );
}
