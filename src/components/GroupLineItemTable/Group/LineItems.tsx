import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import CustomCell from "../CustomCell";

export default function LineItems({
  lineItems,
  onAddDevice,
  onAddService,
  onAddOption,
  onDeleteLineItem,
  onEditLineItem,
}: {
  lineItems: any[];
  onAddDevice: () => void;
  onAddService: () => void;
  onAddOption: () => void;
  onDeleteLineItem: (lineIndex: number) => void;
  onEditLineItem: (lineIndex: number, data: any) => void;
}) {
  return (
    <Box margin={1}>
      <Box display="flex" alignItems="center" style={{ gap: 8 }}>
        <Typography variant="h6" gutterBottom component="div">
          Line Items
        </Typography>
        <Button variant="outlined" onClick={onAddDevice}>
          Add Device
        </Button>
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
            <TableCell>Amount</TableCell>
            <TableCell width={150}>Price each</TableCell>
            <TableCell>Total price ($)</TableCell>
            <TableCell width={20}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems.map((lineItem, i) => (
            <TableRow key={i}>
              <TableCell>{lineItem.type}</TableCell>
              <TableCell>
                <CustomCell value={lineItem.itemId} onChange={(v) => onEditLineItem(i, { ...lineItem, itemId: v })} />
              </TableCell>
              <TableCell>
                <CustomCell value={lineItem.amount} onChange={(v) => onEditLineItem(i, { ...lineItem, amount: v })} />
              </TableCell>
              <TableCell>
                <CustomCell value={lineItem.price} onChange={(v) => onEditLineItem(i, { ...lineItem, price: v })} />
              </TableCell>
              <TableCell>{lineItem.amount * lineItem.price}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDeleteLineItem(i)}>
                  <DeleteRounded />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
