import { formatDate } from "../utils";

export const extractEngAppData = (data: any[]) => {
  const init = data.reduce((prev, cur) => {
    return { ...prev, [formatDate(cur.createdAt, "yy-MMMM-dd")]: 0 };
  }, {});

  const generated = data.reduce((prev, cur) => {
    return { ...prev, [formatDate(cur.createdAt, "yy-MMMM-dd")]: prev[formatDate(cur.createdAt, "yy-MMMM-dd")] + 1 };
  }, init);

  const res = Object.keys(generated).map((k: any) => ({ date: k, units: generated[k] }));

  return res;
};

export const extractFshData = (data: any[]) => {
  let res: any[] = [];
  let cnt = 0;
  res = data.reduce((_, curVal) => {
    return { [formatDate(curVal.fsh.date, "yy-MMMM-dd")]: ++cnt };
  }, {});

  res = Object.keys(res).map((k) => ({
    date: k,
    units: res[k as any],
  }));

  return res;
};
