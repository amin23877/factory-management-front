import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import BaseDataGrid from "../../../../app/BaseDataGrid";
import { BasePaper } from "../../../../app/Paper";

const UnitWorkFlow = ({ stepper }: { stepper?: any }) => {
    const [activeStep, setActiveStep] = useState(3);

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
                <StepLabel>Quote</StepLabel>
            </Step>
            <Step>
                <StepLabel>Sales Order</StepLabel>
            </Step>
            <Step>
                <StepLabel>Engineering</StepLabel>
            </Step>
            <Step>
                <StepLabel>Purchasing</StepLabel>
            </Step>
            <Step>
                <StepLabel>Manufacturing</StepLabel>
            </Step>
            <Step>
                <StepLabel>Evaluation</StepLabel>
            </Step>
            <Step>
                <StepLabel>Test</StepLabel>
            </Step>
            <Step>
                <StepLabel>Shipping</StepLabel>
            </Step>
            <Step>
                <StepLabel>Accounting</StepLabel>
            </Step>
        </Stepper>
    );
};

export default UnitWorkFlow;

export const ProductionWorkFlow = ({ stepper }: { stepper?: any }) => {
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        switch (stepper) {
            case "Manufacturing":
                setActiveStep(0);
                break;
            case "Evaluation":
                setActiveStep(1);
                break;
            case "Test":
                setActiveStep(0);
                break;
            default:
                setActiveStep(0);
        }
    }, []);
    const taskListCols: GridColDef[] = [
        { field: "Task Number", headerName: "Task Number", flex: 1 },
        { field: "Task Name", headerName: "Task Name", flex: 1 },
        { field: "Task Description", headerName: "Task Description", flex: 1 },
        { field: "Device", headerName: "Device", flex: 1 },
        { field: "Type", headerName: "Type", flex: 1 },
    ];
    return (
        <>
            <BasePaper style={{ marginBottom: "1em'" }}>
                <h1 style={{ marginLeft: "3em" }}>Production Work Flow</h1>
                <Stepper activeStep={activeStep} alternativeLabel style={{ cursor: "pointer" }}>
                    <Step
                        onClick={() => {
                            setActiveStep(0);
                        }}
                    >
                        <StepLabel>Manufacturing</StepLabel>
                    </Step>
                    <Step
                        onClick={() => {
                            setActiveStep(1);
                        }}
                    >
                        <StepLabel>Evaluation</StepLabel>
                    </Step>
                    <Step
                        onClick={() => {
                            setActiveStep(2);
                        }}
                    >
                        <StepLabel>Test</StepLabel>
                    </Step>
                </Stepper>
                {activeStep === 0 && <BaseDataGrid cols={taskListCols} rows={[]} />}
                {activeStep === 1 && <BaseDataGrid cols={taskListCols} rows={[]} />}
                {activeStep === 2 && <BaseDataGrid cols={taskListCols} rows={[]} />}
            </BasePaper>
        </>
    );
};
