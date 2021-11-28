import React, { useCallback } from "react";
import Container from "@material-ui/core/Container";

import { get } from "../api";
// import UnderDev from "../app/UnderDevelopment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";
import moment from "moment";
import { formatTimestampToDate } from "../logic/date";
window.moment = moment;

const columns = [
    { name: "name", header: "Name", minWidth: 50, defaultFlex: 2 },
    { name: "no", header: "NO.", maxWidth: 1000, defaultFlex: 1 },
    {
        name: "createdAt",
        header: "User created date",
        defaultFlex: 1,
        // need to specify dateFormat
        dateFormat: "x",
        filterEditor: DateFilter,
        // filterEditorProps: (props: any, { index }: any) => {
        //     // for range and notinrange operators, the index is 1 for the after field
        //     return {
        //         dateFormat: "MM-DD-YYYY",
        //         placeholder: index === 1 ? "Created date is before..." : "Created date is after...",
        //     };
        // },
        render: ({ value, cellProps: { dateFormat } }: any) => {
            return formatTimestampToDate(value);
        },
    },
];

const defaultFilterValue = [
    { name: "name", type: "string", operator: "contains", value: undefined },
    { name: "no", type: "string", operator: "contains", value: undefined },
    { name: "createdAt", operator: "after", type: "date", value: "" },
];

const gridStyle = { minHeight: 550 };

const dataSource = [
    { id: 1, name: "John McQueen", age: 35 },
    { id: 2, name: "Mary Stones", age: 25 },
    { id: 3, name: "Robert Fil", age: 27 },
    { id: 4, name: "Roger Robson", age: 81 },
    { id: 5, name: "Billary Konwik", age: 18 },
    { id: 6, name: "Bob Martin", age: 18 },
    { id: 7, name: "Matthew Richardson", age: 54 },
    { id: 8, name: "Ritchie Peterson", age: 54 },
    { id: 9, name: "Bryan Martin", age: 40 },
    { id: 10, name: "Mark Martin", age: 44 },
    { id: 11, name: "Michelle Sebastian", age: 24 },
    { id: 12, name: "Michelle Sullivan", age: 61 },
    { id: 13, name: "Jordan Bike", age: 16 },
    { id: 14, name: "Nelson Ford", age: 34 },
    { id: 15, name: "Tim Cheap", age: 3 },
    { id: 16, name: "Robert Carlson", age: 31 },
    { id: 17, name: "Johny Perterson", age: 40 },
];

const getOperator = (op: string) => {
    switch (op) {
        case "contains":
            return "contain";
        case "startsWith":
            return "startsWith";
        case "endsWith":
            return "endsWith";
        case "lt":
            return "max";
        case "gt":
            return "min";
        default:
            return "";
    }
};

export default function Settings() {
    const fetchData = useCallback(({ filterValue, limit, sortInfo }) => {
        let params: any = {};
        for (const fv of filterValue) {
            if (fv.value) {
                params[getOperator(fv.operator) + fv.name] = fv.value;
            }
        }
        console.log(sortInfo);

        // return dataSource;
        return get("/item", { params })
            .then((d) => d.result)
            .catch((e) => console.log(e));
    }, []);

    return (
        <Container>
            {/* <UnderDev /> */}
            <ReactDataGrid
                idProperty="id"
                columns={columns}
                dataSource={fetchData}
                style={gridStyle}
                defaultFilterValue={defaultFilterValue}
                // filterTypes={{
                //     string: {
                //         type: "string",
                //         emptyValue: "",
                //         operators: [
                //             {
                //                 name: "startsWith",
                //                 fn: ({ value, filterValue }) => {
                //                     return !filterValue ? true : Boolean(value.startsWith(filterValue));
                //                 },
                //             },
                //             {
                //                 name: "contains",
                //                 fn: ({ value, filterValue }) => {
                //                     return !filterValue ? true : value.indexOf(filterValue) !== -1;
                //                 },
                //             },
                //             {
                //                 name: "eq",
                //                 fn: ({ value, filterValue }) => value === filterValue,
                //             },
                //         ],
                //     },
                // }}
            />
        </Container>
    );
}
