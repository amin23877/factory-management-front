import React, { useState } from "react";
import { Container, Box, TextField } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import Quote from "../features/Dashboard/Quote";
import { Ship } from "../features/Dashboard/Ship";
import { Sales } from "../features/Dashboard/Sales";
import { MyTab, MyTabs } from "../app/Tabs";
import '../styles/dashboard.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    sinput: {
      flexGrow:1,
      padding:"0px",
      boxSizing:"border-box"
    },
    
  });

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const classes = useStyles();
    return (
        <Container>
            <Box display="flex" alignItems="center" style={{ margin: "1em 0" }}>
                <div style={{
                    height: "45px",
                    borderLeft: "3px solid rgb(43,140,255)",
                    borderRadius: "0px  4px 4px 0px",
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0px 3px",
                    backgroundColor: "white",
                    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px"
                }}>
                    <TextField
                        className={classes.sinput}
                        placeholder="type the biller you want to pay here"
                        />
                    <SearchRounded htmlColor="gray" />
                </div>
                <div style={{ flexGrow: 1 }} />
                <MyTabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ height: "45px" }}>
                    <MyTab label="Quote" />
                    <MyTab label="Sales" />
                    <MyTab label="Ship" />
                </MyTabs>
            </Box>
            {activeTab === 0 && <Quote />}
            {activeTab === 1 && <Sales />}
            {activeTab === 2 && <Ship />}
        </Container>
    );
}
