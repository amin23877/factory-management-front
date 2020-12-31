import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, MenuItem, Button, Box } from "@material-ui/core";

import { BaseSelect } from "../../app/Inputs";

import { getItems } from "../../api/items";
import { addChildItem, deleteAChildItem } from "../../api/childItems";

export const AddChildItem = ({
    open,
    onClose,
    parentItemId,
    parentItemName,
}: {
    open: boolean;
    parentItemId: any;
    parentItemName: string;
    onClose: () => void;
}) => {
    const [child, setChild] = useState("");
    const [items, setItems] = useState([]);
    const [isSub, setIsSub] = useState(false);

    useEffect(() => {
        getItems()
            .then((d) => {
                const clone = d.filter((item: any) => item.id !== parentItemId);
                setItems(clone);
            })
            .catch((e) => console.log(e));
    }, [open]);

    const handleAdd = () => {
        setIsSub(true);
        addChildItem(parentItemId, child)
            .then((d) => {
                console.log();
                onClose();
            })
            .catch((e) => console.log(e))
            .finally(() => setIsSub(false));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Child item to item {parentItemName}</DialogTitle>
            <Box m={3} textAlign="center">
                <BaseSelect value={child} onChange={(e) => setChild(e.target.value as string)} fullWidth>
                    {items.map((item: any) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </BaseSelect>
                <Button onClick={handleAdd} disabled={isSub} variant="contained" color="primary" style={{ margin: "1em 0" }}>
                    Add
                </Button>
            </Box>
        </Dialog>
    );
};
