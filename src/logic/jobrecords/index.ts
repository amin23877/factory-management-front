import { groupBy } from "logic/utils";

export function sortJobRecordsByParent({ deviceNumber, jobRecords }: { deviceNumber: string; jobRecords: any[] }) {
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

function visit({ children = [], ...object }: any, parents: string[]): any {
  if (children.length === 0) {
    return;
  }

  parents.push(object._id);
  return visit(object.children, parents);
}

export function generateParentNumbersRecursive(object: any) {
  const parents: string[] = [];
  visit(object, parents);

  return parents;
}

export function findParentsRecursive({ children = [], ...object }: any, id: string) {
  var result;
  if (object._id === id) return object;
  return (
    children.some((o: any) => (result = findParentsRecursive(o, id))) &&
    Object.assign({}, object, { children: [result] })
  );
}

function recursiveFind({
  deviceNumber,
  jobRecords,
  id,
  onSuccess,
}: {
  deviceNumber: string;
  jobRecords: any[];
  id: string;
  onSuccess: (result: any) => void;
}) {
  const result = jobRecords.find((j) => j._id === id);

  if (result) {
    onSuccess(result);
  } else {
    for (const c of jobRecords) {
      recursiveFind({ deviceNumber, jobRecords: c.children || [], id, onSuccess });
    }
  }
}

export function createJobRecordsTree({
  deviceNumber,
  jobRecords,
  expanded,
}: {
  deviceNumber: string;
  jobRecords: any[];
  expanded: string[];
}) {
  const grouped = Array.from(groupBy(jobRecords, (i) => i.parentRec || deviceNumber));

  const mainComponentsIndex = grouped.findIndex((g) => g[0] === deviceNumber);
  const mainComponentsGroup = mainComponentsIndex > -1 ? grouped[mainComponentsIndex] : [];
  const mainComponents = mainComponentsGroup[1] || [];
  let tree: any[] = [];
  let list: any[] = [];

  for (const c of mainComponents) {
    const childrenIndex = grouped.findIndex((g) => g[0] === c._id);
    const children = childrenIndex > -1 ? grouped[childrenIndex] : null;
    if (children && children[1].length > 0) {
      tree.push({ ...c, children: children[1] });
      grouped.splice(childrenIndex, 1);
    }
  }
  grouped.splice(mainComponentsIndex, 1);

  if (grouped.length > 0) {
    for (const g of grouped) {
      recursiveFind({
        deviceNumber,
        jobRecords: tree,
        id: g[0],
        onSuccess: (f: any) => {
          if (f.children) {
            f.children.push(...g[1]);
          } else {
            f.children = g[1];
          }
        },
      });
    }
  }

  list.push(...tree);
  if (expanded.length > 0) {
    for (const c of expanded) {
      const index = list.findIndex((j) => j._id === c);
      recursiveFind({
        deviceNumber,
        jobRecords: tree,
        id: c,
        onSuccess: (result: any) => {
          const children = result.children || [];
          list = [...list.slice(0, index + 1), ...children, ...list.slice(index + 1)];
        },
      });
    }
  }

  return { tree, list };
}
