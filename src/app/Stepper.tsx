import React from "react";
import { ReactComponent as StepGray } from "assets/icons/stepGray.svg";
import { ReactComponent as StepOrange } from "assets/icons/stepOrange.svg";

export default function Stepper({
  steps,
  step,
  setStep,
}: {
  steps: string[];
  step: number;
  setStep: (a: number) => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {steps.map((i, index) => (
        <div
          style={{ position: "relative" }}
          onClick={() => {
            setStep(index);
          }}
        >
          {index > step ? <StepGray /> : <StepOrange />}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: index > step ? "black" : "white",
            }}
          >
            <b>{i}</b>
          </div>
        </div>
      ))}
    </div>
  );
}
