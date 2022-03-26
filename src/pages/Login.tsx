import React, { ReactNode } from "react";
import { Drawer, useMediaQuery } from "@material-ui/core";

import LoginForm from "features/Session/LoginForm";
import logo from "assets/splogo.png";

import "../styles/splash.css";

const phoneWidth = 600;

function Wrapper({ children }: { children: ReactNode }) {
  const isPhone = useMediaQuery(`(max-width: ${phoneWidth}px)`);

  if (isPhone) {
    return <div>{children}</div>;
  }

  return (
    <Drawer PaperProps={{ style: { border: "none" }, elevation: 4 }} open={true} variant="persistent" anchor="right">
      <div style={{ margin: "1em 2em", width: 300 }}>{children}</div>
    </Drawer>
  );
}

export default function SplashScreen() {
  const isPhone = useMediaQuery(`(max-width: ${phoneWidth}px)`);

  return (
    <div className="splash-bg">
      <Wrapper>
        {isPhone && (
          <div style={{ textAlign: "center" }}>
            <img src={logo} alt="phocus" style={{ width: 150 }} />
          </div>
        )}
        <LoginForm />
      </Wrapper>
      {!isPhone && <img src={logo} alt="phocus" className="main-logo" />}
    </div>
  );
}
