import React, { useCallback, useMemo, useState } from "react";
import { useMediaQuery, makeStyles, Tooltip, Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import {
  AddRounded,
  LockRounded,
  LockOpenRounded,
  ClearRounded,
  SearchRounded,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@material-ui/icons";
import useSWR from "swr";

import { IUnit } from "api/units";
import { createJobRecordsTree, findChildren } from "logic/jobrecords";
import { openRequestedSinglePopup } from "logic/window";
import AddModal from "./AddModal";
import Toast from "app/Toast";
import Confirm from "common/Confirm";
import { updateJobRecord, deleteJobRecord } from "api/jobrecord";
// import { groupBy } from "logic/utils";

// import BaseDataGrid from "app/BaseDataGrid";
// import { GridColumns } from "@material-ui/data-grid";

const useStyle = makeStyles({
  root: {
    "& .InovuaReactDataGrid__column-header": {
      background: "#202731",
      color: "#fff",
    },
    "& .nested": {
      backgroundColor: "#d7d7d7 !important",
      "&:hover": {
        backgroundColor: "#c0c0c0 !important",
      },
      "&.InovuaReactDataGrid__row:not(.InovuaReactDataGrid__row--virtualize-columns)>.InovuaReactDataGrid__row-cell-wrap:hover":
        {
          backgroundColor: "#c0c0c0 !important",
        },
    },
    "& .blue": {
      backgroundColor: "#a5c2f7 !important",
      "&:hover": {
        backgroundColor: "#85b0ff !important",
      },
      "&.InovuaReactDataGrid__row:not(.InovuaReactDataGrid__row--virtualize-columns)>.InovuaReactDataGrid__row-cell-wrap:hover":
        {
          backgroundColor: "#85b0ff !important",
        },
    },
    "& .orange": {
      backgroundColor: "#ffc888 !important",
      "&:hover": {
        backgroundColor: "#ffbe73 !important",
      },
      "&.InovuaReactDataGrid__row:not(.InovuaReactDataGrid__row--virtualize-columns)>.InovuaReactDataGrid__row-cell-wrap:hover":
        {
          backgroundColor: "#ffbe73 !important",
        },
    },
  },
});

const getRowClassName = ({ jobRecords, row, unit }: { jobRecords: any[]; row: any; unit: IUnit }) => {
  if (row.parentRec?._id) {
    const parent = jobRecords.find((j) => j._id === row.parentRec?._id);
    if (parent && (parent.parent?.no === unit.ItemId.no || parent.parentNo === unit.ItemId.no)) {
      return "blue";
    } else {
      return "orange";
    }
  }
  return "";
};

const filterValues = [
  // { name: "Parent", render: ({ data }: any) => data?.parent?.no || data?.parentNo, width: 180, hidden: true },
  { name: "Line", type: "string", value: "", operator: "startsWith" },
  {
    name: "Component",
    type: "string",
    value: "",
    operator: "startsWith",
  },
  { name: "Component Name", type: "string", value: "", operator: "startsWith" },
  { name: "Component Location", type: "string", value: "", operator: "startsWith" },
  { name: "UM", type: "string", value: "", operator: "startsWith" },
  { name: "QTY", type: "string", value: "", operator: "startsWith" },
  { name: "Note", type: "string", value: "", operator: "startsWith" },
];

function ExpandButton({
  data,
  expandedComponents,
  toggleComponent,
}: {
  data: any;
  expandedComponents: string[];
  toggleComponent: any;
}) {
  if (data.children && data.children.length > 0) {
    return expandedComponents.find((c) => c === data._id) ? (
      <div onClick={() => toggleComponent(data)}>
        <KeyboardArrowUp style={{ fontSize: "1.8rem", color: "#426792", cursor: "pointer" }} />
      </div>
    ) : (
      <div onClick={() => toggleComponent(data)}>
        <KeyboardArrowDown style={{ fontSize: "1.8rem", color: "#426792", cursor: "pointer" }} />
      </div>
    );
  }
  return <></>;
}

export default function JobRecordsTable({ unit }: { unit: IUnit }) {
  const phone = useMediaQuery("(max-width:400px)");
  const history = useHistory();
  const classes = useStyle();
  const { data: jobrecords, mutate: mutateJobRecords } = useSWR(`/unit/${unit.id}/jobrecords`);
  const [expandedComponents, setExpandedComponents] = useState<string[]>([]);
  const [addModal, setAddModal] = useState(false);
  const [lock, setLock] = useState(true);
  const [parent, setParent] = useState<{ _id: string; Component: string }>();

  const jobRecordsSorted = useMemo(
    () =>
      createJobRecordsTree({
        deviceNumber: unit.ItemId.no,
        jobRecords: jobrecords || [],
        expanded: expandedComponents,
      })?.list.map((data) => ({
        Line: data?.line,
        Component: data?.ItemId?.no || data?.ItemNo,
        "Component Name": data?.ItemId?.name || data?.ItemName,
        "Component Location": data?.ItemId?.location,
        UM: data?.ItemId?.unitOfMeasure,
        QTY: data?.usage,
        Note: data?.note,
        ...data,
      })) || [],
    [expandedComponents, jobrecords, unit.ItemId.no]
  );

  const handleRowSelect = useCallback(
    (r: any) => {
      const url = `/panel/inventory/${r?.ItemId?._id}`;
      if (r.ItemId && phone) {
        history.push(url);
      } else if (r.ItemId && !phone) {
        openRequestedSinglePopup({ url });
      }
      return;
    },
    [history, phone]
  );

  const toggleComponent = useCallback((jobRecord: any) => {
    const numbers = findChildren(jobRecord);

    setExpandedComponents((prev) => {
      if (prev.find((p) => p === jobRecord._id)) {
        return prev.filter((p) => !numbers.includes(p));
      } else {
        return [...prev, jobRecord._id];
      }
    });
  }, []);

  const handleUpdate = async ({ id, value, usage }: { id: string; value: number; usage: number }) => {
    try {
      if (Number(usage) === Number(value) || isNaN(value) || isNaN(usage)) {
        Toast("Please enter a valid number", "error");
        return;
      }

      await updateJobRecord(id, { usage: value });
      Toast(`Job Record Updated`, "success");
    } catch (error) {
      console.log(error);
    } finally {
      mutateJobRecords();
    }
  };

  const handleDelete = useCallback(
    (id: string) => {
      Confirm({
        text: "If you delete this record, all of it's children will be removed too",
        onConfirm: async () => {
          try {
            await deleteJobRecord(id);
          } catch (error) {
            console.log(error);
          } finally {
            mutateJobRecords();
          }
        },
      });
    },
    [mutateJobRecords]
  );

  const jobrecordsCols = useMemo(
    () => [
      {
        name: "Line",
        defaultWidth: 80,
        editable: false,
      },
      {
        name: "Component Name",
        render: ({ value, data }: any) => (
          <Box display="flex" alignItems="center" style={{ gap: 4 }}>
            <div
              onClick={() => {
                if (!lock) {
                  setParent(data);
                  setAddModal(true);
                }
              }}
            >
              <AddRounded
                style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "green", cursor: lock ? "auto" : "pointer" }}
              />
            </div>
            <div onClick={() => !lock && handleRowSelect(data)}>
              <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: lock ? "auto" : "pointer" }} />
            </div>
            <ExpandButton data={data} expandedComponents={expandedComponents} toggleComponent={toggleComponent} />
            <Tooltip title={value}>
              <span>{String(value)}</span>
            </Tooltip>
          </Box>
        ),
        defaultWidth: 180,
        editable: false,
      },
      {
        name: "Component",
        defaultWidth: 120,
        editable: false,
      },
      { name: "Component Location", defaultWidth: 180, editable: false },
      { name: "UM", defaultWidth: 80, editable: false },
      { name: "QTY", defaultWidth: 80 },
      {
        name: "Note",
        flex: 1,
        editable: false,
        render: ({ data }: any) => (
          <Box display="flex" alignItems="center" style={{ gap: 4 }}>
            <p style={{ flexGrow: 1 }}>{data?.note}</p>
            <div onClick={() => handleDelete(data._id)}>
              <ClearRounded style={{ fontSize: "1.8rem", color: lock ? "#ccc" : "#e71414", cursor: "pointer" }} />
            </div>
          </Box>
        ),
      },
    ],
    [expandedComponents, handleDelete, handleRowSelect, lock, toggleComponent]
  );

  return (
    <div style={{ display: "flex", height: "68vh", flexDirection: "column" }}>
      <AddModal parent={parent} unit={unit} open={addModal} onClose={() => setAddModal(false)} />
      <div style={{ display: "flex" }}>
        <Button
          disabled={lock}
          fullWidth
          variant="outlined"
          startIcon={<AddRounded />}
          onClick={() => setAddModal(true)}
        >
          Add
        </Button>
        <Button onClick={() => setLock((p) => !p)} variant="contained" color={lock ? "primary" : "secondary"}>
          {lock ? <LockRounded /> : <LockOpenRounded />}
        </Button>
      </div>
      <ReactDataGrid
        onEditComplete={({ columnId, value, data }: any) =>
          columnId === "QTY" && handleUpdate({ id: data?._id, usage: data.usage, value })
        }
        editable={!lock}
        className={classes.root}
        columns={jobrecordsCols}
        dataSource={jobRecordsSorted}
        rowClassName={({ data }) => getRowClassName({ row: data, jobRecords: jobRecordsSorted, unit })}
        defaultFilterValue={filterValues}
        pagination
      />
    </div>
  );
}
