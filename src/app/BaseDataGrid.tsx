import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { DataGrid, RowData, ColDef } from "@material-ui/data-grid";
import '../styles/datagrid.css';


const useStyles = makeStyles({
    dataGridCont: {
        width: "100%",
        borderRadius:8
    },
});

export default function BaseDataGrid({
    onRowSelected,
    rows,
    cols,
    height,
}: {
    onRowSelected: (row: any) => void;
    rows: RowData[];
    cols: ColDef[];
    height?: number;
}) {
    const classes = useStyles();

    const updatedCols = cols.map((x)=>{
        let obj = Object.keys(x);
        let check = false
        for(let o in obj){
            if(o=="flex"){
                check=true;
            }
        }
         if(!check){x={...x , flex:1 }} 
        return x 
    })
    return (
        
        <Box display="flex" style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px", border: "none" }}>
            <div
                className={classes.dataGridCont}
                style={{
                    height: height ? height : 450,
                }}
            >
                <DataGrid
                    onRowSelected={(r) => {
                        onRowSelected(r.data);
                    }}
                    columns={updatedCols}
                    rows={rows}
                />
            </div>
        </Box>
    );
}
