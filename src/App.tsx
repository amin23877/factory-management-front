import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SWRConfig } from "swr";

import { useAppDispatch } from "./store";

import { getCurrentSession } from "./features/Session/sessionsSlice";

import "./styles/main.css";
import BaseRouter from "./Router";

// Delete this after useing baseurl somewhere
import * as config from "./api/config";
import { fetcher } from "./api";
console.log(config.BaseUrl);
// ---------------------------

function App() {
    // const session = useSelector(selectSession);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentSession());
    }, []);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SWRConfig
                value={{
                    fetcher,
                }}
            >
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <BaseRouter />
                    </ThemeProvider>
                </BrowserRouter>
            </SWRConfig>
        </MuiPickersUtilsProvider>
    );
}

export default App;
