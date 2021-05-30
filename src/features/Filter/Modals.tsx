import React from "react";
import { Box, IconButton, LinearProgress, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import useSWR from "swr";

import Dialog from "../../app/Dialog";
import FilterForm, { ApplyFilterForm } from "./Forms";
import { baseDelete, fetcher } from "../../api";
import { IFilter } from "../../api/filter";

const useStyles = makeStyles({
    filterList: {
        flex: 1,
        border: "0.5px solid gray",
        borderRadius: 4,
        marginLeft: "1em",
    },
});

export default function FiltersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { data: filters, mutate } = useSWR<IFilter[]>("/filter", fetcher);
    const classes = useStyles();

    const handleDelete = async (id: string) => {
        try {
            await baseDelete(`/filter/${id}`);
            mutate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title="Filters" maxWidth="sm" fullWidth>
            <Box p={2} display="flex" alignItems="flex-start">
                <FilterForm />
                {!filters && <LinearProgress />}
                {filters && (
                    <List className={classes.filterList}>
                        {filters.map((f) => (
                            <ListItem key={f.id}>
                                <ListItemText>{`${f.name} - ${f.valid}`}</ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => handleDelete(f.id as string)}>
                                        <DeleteRounded />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Dialog>
    );
}

export const ApplyFilterModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { data: filters, mutate } = useSWR<IFilter[]>("/filter", fetcher);
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={onClose} title="Filters" maxWidth="sm" >
            <Box p={2} display="flex" alignItems="flex-start" >
                {!filters && <LinearProgress />}
                {filters && <ApplyFilterForm filter={filters}/>}
            </Box>
        </Dialog>
    );
}