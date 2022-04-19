import React, { useEffect } from "react";
import { Container } from "@material-ui/core";

// import UnderDev from "app/UnderDevelopment";
import jobRecords from "mock/jobrecords.json";
import { groupBy } from "logic/utils";

export default function Settings() {
  useEffect(() => {
    const unitNumber = "CMEL-875W-120-120-90";
    const mainComponents = jobRecords.filter((j) => j.parent?.no === unitNumber);
    const withoutParent = jobRecords.filter((j) => !j?.parent);
    let all: any[] = [];
    for (const c of mainComponents) {
      all.push(c, ...jobRecords.filter((j) => j.parent?.no === c?.ItemId?.no));
    }
    all.push(...withoutParent);
    console.log({ all, mainComponents, jobRecords });

    console.log(Array.from(groupBy(jobRecords, (j) => j.parent?.no || "No Parent")));
  }, []);
  // useEffect(() => {
  //   const parents = jobRecords.filter((j) => !j.parent || j.parent === null);
  //   const children = parents.map((p) => jobRecords.filter((j) => j.parent?._id === p?.ItemId?._id));
  //   let parentWithChildren:any;
  //     for(const parent of parents){
  //       for(const record of jobRecords){
  //         if(parentWithChildren[parent!!.ItemId!!.no]){
  //           parentWithChildren[parent!!.ItemId!!.no].push(record);
  //         }

  //       }
  //     }
  //   console.log({ jobRecords, children, parents });
  // }, []);

  return <Container>{/* <UnderDev /> */}</Container>;
}
