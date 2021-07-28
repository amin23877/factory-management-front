import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";

import Dialog from "../../../app/Dialog";
import { Manufacturing, Evaluation, Test, Field } from "./TaskForms";

interface ITaskModal {
    open: boolean;
    itemId: string;
    task?: any;
    onDone?: () => void;
    onClose: () => void;
    tab?: number;
    device: any;
}
interface IEditTaskModal {
    open: boolean;
    itemId: string;
    task: any;
    onDone?: () => void;
    onClose: () => void;
    tab: number;
    device: any;
}

export default function TaskModal({ open, onClose, itemId, device, onDone, task, tab }: ITaskModal) {
    const [activeTab, setActiveTab] = useState(tab ? tab : 0);

    return (
        <Dialog title="Task" open={open} onClose={onClose}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary">
                <Tab label="Manufacturing" />
                <Tab label="Evaluation" />
                <Tab label="Test" />
                <Tab label="Field Start-up" />
            </Tabs>
            {activeTab === 0 && (
                <Manufacturing
                    device={device}
                    open={open}
                    onClose={onClose}
                    itemId={itemId}
                    onDone={onDone}
                    task={task}
                />
            )}
            {activeTab === 1 && (
                <Evaluation device={device} open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
            {activeTab === 2 && (
                <Test device={device} open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
            {activeTab === 3 && (
                <Field device={device} open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
        </Dialog>
    );
}

export function EditTaskModal({ open, onClose, device, itemId, onDone, task, tab }: IEditTaskModal) {
    const titles = ["Manufacturing", "Evaluation", "Test", "Level startup"];

    return (
        <Dialog title={titles[tab]} open={open} onClose={onClose} maxWidth="lg" fullWidth>
            {tab === 0 && (
                <Manufacturing
                    device={device}
                    open={open}
                    onClose={onClose}
                    itemId={itemId}
                    onDone={onDone}
                    task={task}
                />
            )}
            {tab === 1 && (
                <Evaluation device={device} open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
            {tab === 2 && (
                <Test device={device} open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
            {tab === 3 && (
                <Field device={device} open={open} onClose={onClose} itemId={itemId} onDone={onDone} task={task} />
            )}
        </Dialog>
    );
}
