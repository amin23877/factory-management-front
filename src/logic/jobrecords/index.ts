import { groupBy } from "logic/utils";

export function sortJobRecordsByParent({ deviceNumber, jobRecords }: { deviceNumber: string; jobRecords: any[] }) {
  // const deviceNo = "SEMIC-300W-120-120-90";
  const grouped = Array.from(groupBy(jobRecords, (i) => i.parentRec || deviceNumber));

  const mainComponentsIndex = grouped.findIndex((g) => g[0] === deviceNumber);
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
        all = [...all.slice(0, parentIndex + 1), ...g[1], ...all.slice(parentIndex + 1)];
      }
    }
  }

  return all;
}
