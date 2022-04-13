import React from "react";
import {
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useSWR from "swr";
import { DetailsRounded, EditRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";

// import ShowBomRecordsButton from "./ShowBomRecordsButton";

import { jobRecordType } from "api/job";

export const useTableStyles = makeStyles((theme) => ({
  tableCont: {
    borderRadius: 10,
    maxHeight: 550,
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

export default function JobRecordsTable({
  unitId,
  onEdit,
}: {
  unitId: string;
  onEdit?: (bomRecordId: string) => void;
}) {
  const { data: jobRecords } = useSWR<jobRecordType[]>(`/unit/${unitId}/jobrecords`);
  const tableClasses = useTableStyles();

  if (!jobRecords) {
    return <LinearProgress />;
  }

  return (
    <TableContainer className={tableClasses.tableCont} component={Paper}>
      <Table size="small" className={tableClasses.root}>
        <TableHead>
          <TableRow>
            <TableCell width={100}>NO.</TableCell>
            <TableCell width={140}>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell width={100}>Usage</TableCell>
            <TableCell width={100}>Fixed Qty</TableCell>
            <TableCell width={onEdit ? 130 : 100}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobRecords.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row?.ItemNo}
              </TableCell>
              <TableCell>{row?.ItemName}</TableCell>
              {/* <TableCell>{row?.ItemId?.description}</TableCell> */}
              <TableCell>{row.usage}</TableCell>
              {/* <TableCell>{row.fixedQty}</TableCell> */}
              <TableCell>
                {onEdit && (
                  <IconButton onClick={() => onEdit(row._id)}>
                    <EditRounded />
                  </IconButton>
                )}
                <Link to={`/panel/inventory/${row?.ItemId}`}>
                  <IconButton>
                    <DetailsRounded />
                  </IconButton>
                </Link>
                {/* <ShowBomRecordsButton bomRecord={row} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
