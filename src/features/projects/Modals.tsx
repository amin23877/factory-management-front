import React, { useState } from "react";

import Dialog from "../../app/Dialog";
import { General, NewTask } from './Forms';

interface IProjectModal {
    open: boolean;
    onClose: () => void;
    project?: any;
    task?: any
}


export default function ProjectModal({ open, onClose, project }: IProjectModal) {

    return (
        <Dialog title="Add Project" open={open} onClose={onClose}>
            <NewTask project={project} onClose={onClose} task />
        </Dialog>
    );
}
export function TaskModal({ open, onClose, project, task }: IProjectModal) {

    return (
        <Dialog title="Add Task" open={open} onClose={onClose}>
            <General onClose={onClose} ProjectId={project?.id} task={task} />
        </Dialog>
    );
}


