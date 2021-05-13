import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { IClientType, getClientTypes, addClientType } from "../../api/clientType";

const filter = createFilterOptions<IClientType>();

export default function ClientTypeAutocomplete() {
    const [value, setValue] = React.useState<IClientType | null>(null);
    const [open, toggleOpen] = React.useState(false);
    const [ctypes, setCTypes] = useState<IClientType[]>([]);

    const refreshClientTypes = async () => {
        try {
            const resp = await getClientTypes();
            if (resp) {
                setCTypes(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        refreshClientTypes();
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            name: "",
        });
        handleClose();
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
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params) as IClientType[];

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={ctypes}
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
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Free solo dialog" variant="outlined" />}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="add-clienttype-dialog">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="add-clienttype-dialog">Add a new Client type</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Did you miss any client type in our list? Please, add it!</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                            label="name"
                            type="text"
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
