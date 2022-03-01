import React from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { CheckRounded, DeleteRounded, EditRounded, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import CustomCell from "../CustomCell";
import { lineItemType } from "../useGroupedLineItems";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function calculateGroupTotal(row: any[]) {
  return row.reduce((prev, cur) => {
    return prev + Number(cur.price) * Number(cur.qty);
  }, 0);
}

export default function Group({
  row,
  index,
  onDeleteGroup,
  onEditUnit,
  onAddDevice,
  onAddService,
  onAddOption,
  onDeleteLineItem,
  onEditLineItem,
}: {
  row: lineItemType[];
  index: number;
  onDeleteGroup: () => void;
  onAddDevice: () => void;
  onAddService: () => void;
  onAddOption: () => void;
  onEditUnit: () => void;
  onDeleteLineItem: (lineIndex: number) => void;
  onEditLineItem: (lineIndex: number, data: Partial<lineItemType>) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const groupAlreadyHasDevice = () => {
    return row.some((l: any) => l.type === "device");
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`Group ${index}`}
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Typography>{row[0]?.UnitId || "No-Unit"}</Typography>
            <IconButton size="small" onClick={onEditUnit}>
              <EditRounded fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
        <TableCell>{calculateGroupTotal(row)}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={onDeleteGroup}>
            <DeleteRounded fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Box display="flex" alignItems="center" style={{ gap: 8 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Line Items
                </Typography>
                {!groupAlreadyHasDevice() && (
                  <Button variant="outlined" onClick={onAddDevice}>
                    Add Device
                  </Button>
                )}
                <Button variant="outlined" onClick={onAddService}>
                  Add Service
                </Button>
                <Button variant="outlined" onClick={onAddOption}>
                  Add Option
                </Button>
              </Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Item Id</TableCell>
                    <TableCell>Standard Warranty</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell width={150}>Price each</TableCell>
                    <TableCell>Total price ($)</TableCell>
                    <TableCell width={20}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((lineItem, i) => (
                    <TableRow key={i}>
                      <TableCell>{lineItem.type}</TableCell>
                      <TableCell>{lineItem.ItemObject?.no}</TableCell>
                      <TableCell>{lineItem.standardWarranty && <CheckRounded />}</TableCell>
                      <TableCell>
                        <CustomCell
                          value={lineItem.qty}
                          onChange={(v) => onEditLineItem(i, { ...lineItem, qty: Number(v) })}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomCell
                          value={lineItem.price}
                          onChange={(v) => onEditLineItem(i, { ...lineItem, price: Number(v) })}
                        />
                      </TableCell>
                      <TableCell>{Number(lineItem.qty) * Number(lineItem.price)}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => onDeleteLineItem(i)}>
                          <DeleteRounded fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
