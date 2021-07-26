import React from "react";
import { Box } from "@material-ui/core";

import Dialog from "../../../app/Dialog";
import { IItem } from "../../../api/items";
import BaseDataGrid from "../../../app/BaseDataGrid";

function Suggestions({ open, onClose, suggestions }: { open: boolean; onClose: () => void; suggestions: IItem[] }) {
    return (
        <Dialog open={open} onClose={onClose} title="Suggestions" fullWidth maxWidth="sm">
            <Box m={2}>
                <BaseDataGrid
                    cols={[
                        { field: "name", headerName: "Item Name", flex: 1 },
                        { field: "no", headerName: "Item Number", width: 150 },
                    ]}
                    rows={suggestions}
                    onRowSelected={() => {}}
                    height={280}
                />
            </Box>
        </Dialog>
    );
}

export default Suggestions;
