import React, { useCallback, useState } from "react";

import { IRequiredPOLineItem } from "api/purchasePO";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import NumericEditor from "@inovua/reactdatagrid-community/NumericEditor";
import BoolEditor from "@inovua/reactdatagrid-community/BoolEditor";

const columns = [
  { name: "id", header: "Id", defaultVisible: false, minWidth: 100, type: "number" },
  {
    name: "itemId",
    header: "Item NO.",
    defaultFlex: 1,
    minWidth: 200,
    maxWidth: 300,
    editable: false,
    render: ({ data }: any) => data?.ItemId?.no,
  },
  { name: "qty", header: "QTY", minWidth: 100, type: "number", editor: NumericEditor },
  {
    name: "cost",
    header: "Cost",
    minWidth: 150,
    type: "number",
    editor: NumericEditor,
    render: ({ data }: any) => data?.ItemId?.totalCost,
  },
  {
    name: "tax",
    header: "Tax",
    width: 100,
    render: ({ value }: { value: any }) => (value ? "yes" : "no"),
    editor: BoolEditor,
  },
  { name: "notes", header: "Note", defaultFlex: 1, minWidth: 200 },
];

export default function TableForm({ selectedItems }: { selectedItems: IRequiredPOLineItem[] }) {
  const [dataSource, setDataSource] = useState(selectedItems);

  const onEditComplete = useCallback(
    ({ value, columnId, rowIndex }) => {
      const data = [...dataSource];
      data[rowIndex] = Object.assign({}, data[rowIndex], { [columnId]: value });
      setDataSource(data);
    },
    [dataSource]
  );

  return (
    <>
      <ReactDataGrid
        idProperty="id"
        style={{ minHeight: "calc(100vh - 300px)" }}
        onEditComplete={onEditComplete}
        editable={true}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  );
}
