import React from "react";
import { GridColDef } from "@material-ui/data-grid";
import useSWR from "swr";
import Swal from "sweetalert2";

import Dialog from "../../app/Dialog";
import BaseDataGrid from "../../app/BaseDataGrid";
import { addVendorToItem, IVendor } from "../../api/vendor";

export const VendorModal = ({
  open,
  itemId,
  onClose,
  onDone,
}: {
  open: boolean;
  itemId: string;
  onClose: () => void;
  onDone: () => void;
}) => {
  const { data: vendors } = useSWR<{ result: IVendor[]; total: number }>("/vendor");
  const cols: GridColDef[] = [
    { field: "number", headerName: "Number", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
  ];

  const handleVendorSelect = async (vendor: IVendor) => {
    try {
      const { value: preferred } = await Swal.fire({
        title: `Do you want ${vendor.name || ""} be preferred?`,
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: "preferred",
        confirmButtonText: "Add",
        showCancelButton: true,
        cancelButtonText: "Close",
      });
      if (typeof preferred !== "undefined") {
        await addVendorToItem({ itemId, vendorId: vendor.id, preferred: preferred === 1 ? true : false });
        onClose();
        onDone();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose} title="Add Vendor">
      <BaseDataGrid rows={vendors?.result || []} cols={cols} onRowSelected={(r) => handleVendorSelect(r)} />
    </Dialog>
  );
};
