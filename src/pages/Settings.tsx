import React, { useState } from "react";
import { Container } from "@material-ui/core";

import UnderDev from "app/UnderDevelopment";
import Stepper from "app/Stepper";

export default function Settings() {
  const [step, setStep] = useState(0);
  return (
    <Container>
      <Stepper steps={["amin", "ali", "amir"]} step={step} setStep={setStep} />
    </Container>
  );
}
