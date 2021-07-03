import React, { useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Formik, Form } from "formik";

import Dialog from "../../app/Dialog";
import { Manufacturing, Evaluation, Test, Field } from './AddStepForms'

interface IStepModal {
    open: boolean;
    itemId: string;
    step?: any;
    onDone?: () => void;
    onClose: () => void;
}

export default function StepModal({ open, onClose, itemId, onDone, step }: IStepModal) {

    const [activeTab, setActiveTab] = useState(0);


    return (
        <Dialog open={open} onClose={onClose} >
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} textColor="primary" >
                <Tab label="Manufacturing" />
                <Tab label="Evaluation" />
                <Tab label="Test" />
                <Tab label="Field Start-up" />
            </Tabs>
            {activeTab === 0 && <Manufacturing open={open} onClose={onClose} itemId={itemId} onDone={onDone} step={step} />}
            {activeTab === 1 && <Evaluation open={open} onClose={onClose} itemId={itemId} onDone={onDone} step={step} />}
            {activeTab === 2 && <Test open={open} onClose={onClose} itemId={itemId} onDone={onDone} step={step} />}
            {activeTab === 3 && <Field open={open} onClose={onClose} itemId={itemId} onDone={onDone} step={step} />}

        </Dialog>
    );
}
