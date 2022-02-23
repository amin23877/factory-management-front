import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SWRConfig } from "swr";

import { theme } from "./theme";
import { useAppDispatch } from "./store";
import { getCurrentEmployee } from "./features/Session/sessionsSlice";
import { initializeMessaging } from "logic/notification";
import { SocketProvider } from "logic/Socket/Provider";

import "react-toastify/dist/ReactToastify.css";
import "./styles/main.css";
import BaseRouter from "./Router";

// Delete this after useing baseurl somewhere
import * as config from "./api/config";
import { get } from "./api";
console.log(config.BaseUrl);
// ---------------------------

function App() {
  // const session = useSelector(selectSession);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentEmployee());
  }, [dispatch]);

  useEffect(() => {
    initializeMessaging();
  }, []);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <SWRConfig value={{ fetcher: get }}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <SocketProvider>
              <BaseRouter />
            </SocketProvider>
          </ThemeProvider>
        </BrowserRouter>
      </SWRConfig>
    </MuiPickersUtilsProvider>
  );
}

export default App;
