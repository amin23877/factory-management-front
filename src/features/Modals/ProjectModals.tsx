import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

import TextField from "../../app/TextField";
import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { createProject, deleteProject, updateProject } from "../../api/project";

export const ProjectModal = ({ open, onClose, data, onDone }: { open: boolean; onClose: () => void; data?: any; onDone: () => void }) => {
    const [name, setName] = useState(data?.name);

    useEffect(() => {
        setName(data?.name);
    }, [data]);

    const handleDelete = async () => {
        try {
            if (data) {
                await deleteProject(data.id);
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (data) {
                await updateProject(data.id, { name });
                onDone();
                onClose();
            } else {
                await createProject(name);
                onDone();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} title={data ? "Edit project" : "Add new project"}>
            <form onSubmit={handleSubmit}>
                <Box m={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <TextField label="name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                    <Box>
                        <Button kind="add" type="submit">
                            save
                        </Button>
                        {data && (
                            <Button style={{ marginLeft: "0.5em" }} onClick={handleDelete} kind="delete">
                                Delete
                            </Button>
                        )}
                    </Box>
                </Box>
            </form>
        </Dialog>
    );
};
