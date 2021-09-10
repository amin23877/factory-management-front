import React, { useEffect, useState } from "react";
import { Step, StepLabel, Stepper } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import BaseDataGrid from "../../../../app/BaseDataGrid";
import { BasePaper } from "../../../../app/Paper";
import useSWR from "swr";

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

export const ProductionWorkFlow = ({ stepper, unitId }: { stepper?: any; unitId: string }) => {
    const [activeStep, setActiveStep] = useState(0);
    const { data: tasks } = useSWR(`/unit/${unitId}/tasks`);
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
    const manCols: GridColDef[] = [
        { field: "id", headerName: "Task Number", flex: 1 },
        { field: "name", headerName: "Task Name", flex: 1 },
        { field: "description", headerName: "Task Description", flex: 1 },
        { field: "Device", valueFormatter: (r) => r.row?.ItemId?.no, flex: 1 },
        { field: "Type", valueFormatter: (r) => "Manufacturing", flex: 1 },
    ];
    const evalCols: GridColDef[] = [
        { field: "id", headerName: "Task Number", flex: 1 },
        { field: "name", headerName: "Task Name", flex: 1 },
        { field: "description", headerName: "Task Description", flex: 1 },
        { field: "Device", valueFormatter: (r) => r.row?.ItemId?.no, flex: 1 },
        { field: "Type", valueFormatter: (r) => "Evaluation", flex: 1 },
    ];
    const testCols: GridColDef[] = [
        { field: "id", headerName: "Task Number", flex: 1 },
        { field: "name", headerName: "Task Name", flex: 1 },
        { field: "description", headerName: "Task Description", flex: 1 },
        { field: "Device", valueFormatter: (r) => r.row?.ItemId?.no, flex: 1 },
        { field: "Type", valueFormatter: (r) => "Test", flex: 1 },
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
                {activeStep === 0 && tasks && <BaseDataGrid cols={manCols} rows={tasks.man || []} />}
                {activeStep === 1 && tasks && <BaseDataGrid cols={evalCols} rows={tasks.eval || []} />}
                {activeStep === 2 && tasks && <BaseDataGrid cols={testCols} rows={tasks.test || []} />}
            </BasePaper>
        </>
    );
};
