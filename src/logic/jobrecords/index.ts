import { groupBy } from "logic/utils";

export function sortJobRecordsByParent({ deviceNumber, jobRecords }: { deviceNumber: string; jobRecords: any[] }) {
  // const deviceNumber = "DE1-10KW-120-120-120";
  const grouped = Array.from(groupBy(jobRecords, (j) => j.parent?.no || j?.parentNo || "No Parent"));

  const mainComponentsGroup = grouped.find((g) => g[0] === deviceNumber);
  const mainComponents = mainComponentsGroup ? mainComponentsGroup[1] : [];

  const withoutParentGroup = grouped.find((g) => g[0] === "No-Parent");
  const withoutParent = withoutParentGroup ? withoutParentGroup[1] : [];

  let all: any[] = [];
  for (const c of mainComponents) {
    all.push(c, ...jobRecords.filter((j) => j.parent?.no === c?.ItemId?.no));
  }
  all.push(...withoutParent);

  let seen = false;
  for (const g of grouped) {
    seen = false;
    for (const j of all) {
      if (j?.parent?.no === g[0]) {
        seen = true;
      }
    }
    if (!seen) {
      all = all.concat(g[1]);
    }
  }

  return { grouped, all };
}
