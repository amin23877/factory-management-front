import React, { useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// import TextField from "../../app/TextField";
import TextField from "@material-ui/core/TextField";

import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { ITPC, getTPCs, createTPC } from "../../api/tpc";

const filter = createFilterOptions<ITPC>();

export default function TPCAutocomplete({ onChange }: { onChange?: (e: React.ChangeEvent<{}>, nv: string | ITPC | null) => void }) {
    const [value, setValue] = React.useState<ITPC | null>(null);
    const [open, toggleOpen] = React.useState(false);
    const [tpcs, setTPCs] = useState<ITPC[]>([]);

    const refreshTPCs = async () => {
        try {
            const resp = await getTPCs();
            if (resp) {
                setTPCs(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshTPCs();
    }, [open]);

    const handleClose = () => {
        setDialogValue({
            name: "",
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        name: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (dialogValue.name) {
                const resp = await createTPC(dialogValue);
                if (resp) {
                    setValue({
                        name: "",
                    });
                    handleClose();
                }
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                name: newValue,
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            name: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                        onChange && onChange(event, newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params) as ITPC[];

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="tpc-autocomplete"
                options={tpcs}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(option) => option.name}
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        placeholder="Third party company"
                        label="TPC"
                        title="Third party company"
                        name="tpc"
                    />
                )}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-tpc-dialog">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="add-tpc-dialog">Add a new Third party company</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Did you miss any Third party company in our list? Please, add it!</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                            label="name"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
