import React, { useCallback, useMemo, useState } from "react";
import { LinearProgress, makeStyles, useMediaQuery } from "@material-ui/core";
import { SearchRounded, ClearRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import useSWR from "swr";

import { deleteBomRecord, IBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

import ShowBomRecordsButton from "./ShowBomRecordsButton";
import NewBaseDataGrid from "app/NewDataGrid";
import { useLock } from "common/Lock";
import Confirm from "common/Confirm";

export const useTableStyles = makeStyles((theme) => ({
  tableCont: {
    borderRadius: 10,
    maxHeight: "75vh",
  },
  root: {
    backgroundColor: "#f9f9f9",
    border: "none",
    borderRadius: 15,
    "& .MuiTableHead-root": {
      position: ["sticky", "-webkit-sticky"],
      top: 0,
    },
    "& .MuiTableRow-head, .MuiTableCell-stickyHeader": {
      backgroundColor: "#202731",
    },
    "& .MuiTableCell-head": {
      cursor: "pointer",
      color: "#fff",
      border: "1px solid #333b44",
    },
    "& .MuiTableSortLabel-icon ": {
      fill: "white",
    },

    "& tbody .MuiTableCell-root": {
      border: "1px solid #dddddd",
      fontSize: "0.700rem",
    },
    "& .MuiButton-root": {
      fontSize: "0.700rem",
    },

    "& .Mui-selected": {
      boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
      backgroundColor: "#fff !important",
    },
    "& .MuiDataGrid-sortIcon": {
      fill: "white",
    },
  },
}));

export default function PartsTable({ bomId, onEdit }: { bomId: string; onEdit?: (bomRecordId: string) => void }) {
  const [refresh, setRefresh] = useState(0);
  const { data: bomRecords } = useSWR<{ result: IBomRecord[]; total: number }>(`/bomrecord?BOMId=${bomId}`);
  const phone = useMediaQuery("(max-width:900px)");
  const history = useHistory();
  const { lock } = useLock();

  const handleDelete = useCallback((id: string) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deleteBomRecord(id);
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p) => p + 1);
        }
      },
    });
  }, []);

  const columns = useMemo(
    () => [
      { name: "no", header: "NO.", render: ({ data }: any) => data?.ItemId?.no },
      { name: "name", header: "Name", render: ({ data }: any) => data?.ItemId?.name },
      { name: "description", header: "Description", flex: 1, render: ({ data }: any) => data?.ItemId?.description },
      { name: "usage", header: "Usage", defaultWidth: 100 },
      { name: "fixedQty", header: "Fixed Qty", defaultWidth: 100 },
      {
        name: "actions",
        header: "",
        render: ({ data }: any) => {
          return (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div
                onClick={() => {
                  if (phone) {
                    history.push(`/panel/inventory/${data?.ItemId?.id}`);
                  } else {
                    openRequestedSinglePopup({ url: `/panel/inventory/${data?.ItemId?.id}` });
                  }
                }}
              >
                <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: "pointer" }} />
              </div>
              <div
                style={{ margin: "0 10px" }}
                onClick={() => {
                  if (!lock) {
                    handleDelete(data.id);
                  }
                }}
              >
                <ClearRounded
                  style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#e71414", cursor: lock ? "auto" : "pointer" }}
                />
              </div>
              <ShowBomRecordsButton bomRecord={data} />
            </div>
          );
        },
      },
    ],
    [handleDelete, history, lock, phone]
  );

  if (!bomRecords) {
    return <LinearProgress />;
  }

  return (
    <NewBaseDataGrid url={`/bomrecord?BOMId=${bomId}`} columns={columns} onRowSelected={() => {}} refresh={refresh} />
    // <TableContainer className={tableClasses.tableCont} component={Paper}>
    //   <Table size="small" className={tableClasses.root}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell width={100}>NO.</TableCell>
    //         <TableCell width={140}>Name</TableCell>
    //         <TableCell>Description</TableCell>
    //         <TableCell width={100}>Usage</TableCell>
    //         <TableCell width={100}>Fixed Qty</TableCell>
    //         <TableCell width={onEdit ? 130 : 100}></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {bomRecords.result.map((row) => (
    //         <TableRow key={row.id}>
    //           <TableCell component="th" scope="row">
    //             {row?.ItemId?.no}
    //           </TableCell>
    //           <TableCell>{row?.ItemId?.name}</TableCell>
    //           <TableCell>{row?.ItemId?.description}</TableCell>
    //           <TableCell>{row.usage}</TableCell>
    //           <TableCell>{row.fixedQty}</TableCell>
    //           <TableCell>
    //             {onEdit && (
    //               <IconButton onClick={() => onEdit(row.id)}>
    //                 <EditRounded />
    //               </IconButton>
    //             )}
    //             <Link to={`/panel/inventory/${row?.ItemId?.id}`}>
    //               <IconButton>
    //                 <DetailsRounded />
    //               </IconButton>
    //             </Link>
    //             <ShowBomRecordsButton bomRecord={row} />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
