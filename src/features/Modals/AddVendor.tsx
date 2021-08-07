import React, { useState } from "react";

import { GridColDef } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";

import VendingModal from "../../features/Vending/Modal";

import Dialog from "../../app/Dialog";
import BaseDataGrid from "../../app/BaseDataGrid";

export const VendorModal = ({ open, onClose, itemId }: { open: boolean; onClose: () => void; itemId: string }) => {
    const cols: GridColDef[] = [{ field: "name", headerName: "Name" }];
    const [selectedVendor, setSelectedVendor] = useState(undefined);
    const [vendingModal, setVendingModal] = useState(false);
    const { data: vendors } = useSWR("/vendor");
    return (
        <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose} title="Add Vendor">
            {selectedVendor && itemId && (
                <VendingModal
                    open={vendingModal}
                    onClose={() => setVendingModal(false)}
                    initialValues={{
                        ItemId: itemId,
                    }}
                    vendor={selectedVendor}
                    onDone={() => {
                        setVendingModal(false);
                        onClose();
                        mutate(`/item/${itemId}/vendors`);
                    }}
                />
            )}
            <BaseDataGrid
                rows={vendors}
                cols={cols}
                onRowSelected={(d) => {
                    setVendingModal(true);
                    setSelectedVendor(d);
                }}
            />
        </Dialog>
    );
};
