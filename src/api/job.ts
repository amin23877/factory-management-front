export type jobType = {
  _id: string;
  items: number;
  no: string;
  date: string;
  name: string;
  ItemId: string;
  cost: number;
  UnitId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type jobRecordType = {
  _id: string;
  recId: string;
  JOBId: string;
  ItemId: string;
  ItemNo: string;
  ItemName: string;
  parentNo: string;
  parentName: string;
  usage: number;
  parent?: string;
};
