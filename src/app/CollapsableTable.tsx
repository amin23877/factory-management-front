import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import { formatTimestampToDate } from "../logic/date";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props: {
  row: any;
  cols: any[];
  subCols: any[];
  onRowSelected: (a: any) => void;
  onSubRowSelected: (a: any) => void;
  onCalenderClicked: (a: any) => void;
}) {
  const { row } = props;
  const { cols } = props;
  const { subCols } = props;
  const { onRowSelected } = props;
  const { onSubRowSelected } = props;
  const { onCalenderClicked } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            style={{ zIndex: 3 }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {cols.map((col, i) => {
          if (i === 0) {
            return (
              <TableCell
                style={{ borderBottom: "none" }}
                component="th"
                scope="row"
                key={col.field}
                onClick={() => {
                  onRowSelected(row);
                }}
              >
                {row[col.field]}
              </TableCell>
            );
          } else {
            return (
              <TableCell
                style={{ borderBottom: "none" }}
                key={col.field}
                onClick={() => {
                  onRowSelected(row);
                }}
              >
                {row[col.field]}
              </TableCell>
            );
          }
        })}
        <TableCell onClick={() => onCalenderClicked(row)}>
          <EventNoteRoundedIcon />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} width="100%">
              <h3>Sub Tasks</h3>
              <Paper>
                <Table style={{ borderRadius: "10px" }}>
                  <TableHead
                    style={{
                      backgroundColor: "#202731",
                      borderRadius: "10px 10px 0px 0px",
                    }}
                  >
                    <TableRow
                      style={{
                        backgroundColor: "#202731",
                        borderRadius: "10px 10px 0px 0px",
                      }}
                    >
                      {subCols.map((col, i) => (
                        <TableCell style={{ color: "white" }}>
                          {col.headerName ? col.headerName : col.field}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.subs.map((sub: any) => (
                      <TableRow
                        key={sub.id}
                        onClick={() => {
                          onSubRowSelected(sub);
                        }}
                      >
                        {subCols.map((col, i) => {
                          if (i === 0) {
                            return (
                              <TableCell
                                style={{ borderBottom: "none" }}
                                component="th"
                                scope="row"
                                key={col.field}
                              >
                                {sub[col.field]}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                style={{ borderBottom: "none" }}
                                key={col.field}
                              >
                                {!(col.field == "start")
                                  ? sub[col.field]
                                  : formatTimestampToDate(sub.start)}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  rows,
  cols,
  subCols,
  onRowSelected,
  onSubRowSelected,
  onCalenderClicked,
}: {
  rows: any[];
  cols: any[];
  subCols: any[];
  onRowSelected: (a: any) => void;
  onSubRowSelected: (a: any) => void;
  onCalenderClicked: (a: any) => void;
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#202731", color: "white" }}>
            <TableCell />
            {cols.map((col, i) => (
              <TableCell style={{ color: "white" }}>
                {col.headerName ? col.headerName : col.field}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              cols={cols}
              subCols={subCols}
              onRowSelected={onRowSelected}
              onSubRowSelected={onSubRowSelected}
              onCalenderClicked={onCalenderClicked}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
