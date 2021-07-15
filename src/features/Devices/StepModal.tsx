import React from "react";

import Dialog from "../../app/Dialog";
import { ManufacturingStep, EvaluationStep, TestStep, FieldStep } from "./StepForms";

interface IStepModal {
    open: boolean;
    taskId: string;
    onDone?: () => void;
    onClose: () => void;
    tab: number;
}
interface IEditStepModal {
    open: boolean;
    taskId: string;
    step: any;
    onDone?: () => void;
    onClose: () => void;
    tab: number;
}

export default function StepModal({ open, onClose, taskId, onDone, tab }: IStepModal) {
    const titles = ["Manufacturing step", "Evaluation step", "Test step", "Field start up step"];

    return (
        <Dialog title={titles[tab]} open={open} onClose={onClose}>
            {tab === 0 && <ManufacturingStep onClose={onClose} TaskId={taskId} onDone={onDone} />}
            {tab === 1 && <EvaluationStep onClose={onClose} TaskId={taskId} onDone={onDone} />}
            {tab === 2 && <TestStep onClose={onClose} TaskId={taskId} onDone={onDone} />}
            {tab === 3 && <FieldStep onClose={onClose} TaskId={taskId} onDone={onDone} />}
        </Dialog>
    );
}

export function EditStepModal({ open, onClose, taskId, onDone, step, tab }: IEditStepModal) {
    return (
        <Dialog title="step" open={open} onClose={onClose} maxWidth="lg" fullWidth>
            {tab === 0 && <ManufacturingStep onClose={onClose} TaskId={taskId} onDone={onDone} step={step} />}
            {tab === 1 && <EvaluationStep onClose={onClose} TaskId={taskId} onDone={onDone} step={step} />}
            {tab === 2 && <TestStep onClose={onClose} TaskId={taskId} onDone={onDone} step={step} />}
            {tab === 3 && <FieldStep onClose={onClose} TaskId={taskId} onDone={onDone} step={step} />}
        </Dialog>
    );
}
