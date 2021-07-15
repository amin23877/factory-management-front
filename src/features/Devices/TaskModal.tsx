import React, { ReactComponentElement, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "../../app/Dialog";
import { Manufacturing, Evaluation, Test, Field } from "./TaskForms";

interface ITaskModal {
    open: boolean;
    itemId: string;
    task?: any;
    onDone?: () => void;
    onClose: () => void;
    tab?: number;
}
interface IEditTaskModal {
    open: boolean;
    itemId: string;
    task: any;
    onDone?: () => void;
    onClose: () => void;
    tab: number;
}

export default function TaskModal({ open, onClose, itemId, onDone, task, tab }: ITaskModal) {
    const [activeTab, setActiveTab] = useState(tab ? tab : 0);

    return (
        <Dialog open={open} onClose={onClose}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary">
                <Tab label="Manufacturing" />
                <Tab label="Evaluation" />
                <Tab label="Test" />
                <Tab label="Field Start-up" />
            </Tabs>
            {activeTab === 0 && (
                <Manufacturing open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
            {activeTab === 1 && (
                <Evaluation open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
            {activeTab === 2 && <Test open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />}
            {activeTab === 3 && <Field open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />}
        </Dialog>
    );
}

export function EditTaskModal({ open, onClose, itemId, onDone, task, tab }: IEditTaskModal) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            {tab === 0 && <Manufacturing open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />}
            {tab === 1 && <Evaluation open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />}
            {tab === 2 && <Test open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />}
            {tab === 3 && <Field open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />}
        </Dialog>
    );
}
