import React, { useState } from "react";

import { GridColDef } from "@material-ui/data-grid";
import useSWR, { mutate } from "swr";

import VendingModal from "../../features/Vendor/Vending/Modal";

import Dialog from "../../app/Dialog";
import BaseDataGrid from "../../app/BaseDataGrid";
import { IVendor } from "../../api/vendor";

export const VendorModal = ({ open, onClose, itemId }: { open: boolean; onClose: () => void; itemId: string }) => {
    const [selectedVendor, setSelectedVendor] = useState<IVendor>();
    const [vendingModal, setVendingModal] = useState(false);

    const { data: vendors } = useSWR("/vendor");
    const cols: GridColDef[] = [{ field: "name", headerName: "Name" }];

    return (
        <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose} title="Add Vendor">
            {selectedVendor && (
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
