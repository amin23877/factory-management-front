import { formatDate } from "../utils";

export const extractEngAppData = (data: any[]) => {
  let res: any[] = [];
  let cnt = 0;
  res = data.reduce((_, curVal) => {
    return { [formatDate(curVal.date, "yy-MMMM-dd")]: ++cnt };
  }, {});

  res = Object.keys(res).map((k) => ({
    date: k,
    units: res[k as any],
  }));

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
