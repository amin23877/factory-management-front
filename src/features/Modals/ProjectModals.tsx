import React, { useState } from "react";
import { Dialog, DialogTitle, Box, Button, TextField } from "@material-ui/core";

import { createProject, deleteProject, updateProject } from "../../api/project";

export const ProjectModal = ({ open, onClose, data, onDone }: { open: boolean; onClose: () => void; data?: any; onDone: () => void }) => {
    const [name, setName] = useState(data?.name);

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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{data ? "Update / Delete project" + data.id : "Add new project"}</DialogTitle>
            <Box>
                <form onSubmit={handleSubmit}>
                    <TextField value={name} onChange={(e) => setName(e.target.value)} />
                    <Button type="submit">save</Button>
                    {data && <Button onClick={handleDelete}>Delete</Button>}
                </form>
            </Box>
        </Dialog>
    );
};
