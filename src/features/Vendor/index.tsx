import React, { useEffect, useState } from "react";

import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { getVendorItems, IVendor } from "../../api/vendor";
import { BasePaper } from "../../app/Paper";

import { UpdateVendorForm } from "./Forms";
import { IVending } from "../../api/vending";
import { ColDef } from "@material-ui/data-grid";
import BaseDataGrid from "../../app/BaseDataGrid";

export default function VendorDetails({
    vendor,
    onDone,
    vendings,
    notes,
    docs,
    addresses,
    contacts,
    emails,
    phones,
    onAddressSelected,
    onContactSelected,
    onEmailSelected,
    onPhoneSelected,
    onNoteSelected,
    onDocSelected,
    onVendingSelected,
}: {
    vendor: IVendor;
    vendings: any[];
    notes: any[];
    docs: any[];
    addresses: any[];
    emails: any[];
    contacts: any[];
    phones: any[];
    onNoteSelected: (v: any) => void;
    onDocSelected: (v: any) => void;
    onEmailSelected: (v: any) => void;
    onPhoneSelected: (v: any) => void;
    onContactSelected: (v: any) => void;
    onAddressSelected: (v: any) => void;
    onVendingSelected: (v: IVending) => void;
    onDone: () => void;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const [items, setItems] = useState([]);

    const refreshItems = async () => {
        try {
            if (vendor.id) {
                const resp = await getVendorItems(vendor.id);
                resp && setItems(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeTab === 1) {
            refreshItems();
        }
    }, [activeTab]);

    const cols: ColDef[] = [
        { field: "VendorId" },
        { field: "ItemId" },
        { field: "leadTime" },
        { field: "lastCheckedPrice" },
        { field: "comment" },
    ];

    const itemCols: ColDef[] = [
        { field: "no" },
        { field: "name" },
        { field: "cost" },
        { field: "retailPrice" },
        { field: "availableQoh" },
        { field: "allocatedQoh" },
    ];
    const noteCols: ColDef[] = [
        { field: "subject", headerName: "Subject" },
        { field: "url", headerName: "URL" },
        { field: "note", headerName: "Note", width: 300 },
    ];

    const docCols: ColDef[] = [
        { field: "name", headerName: "Name" },
        { field: "EmployeeId", headerName: "Employee" },
        { field: "description", headerName: "Description", width: 250 },
        { field: "createdAt", headerName: "Date", width: 300 },
    ];

    const addrCols: ColDef[] = [{ field: "address" }, { field: "city" }, { field: "state" }, { field: "zip" }, { field: "main" }];

    const phoneCols: ColDef[] = [{ field: "ext" }, { field: "phone" }, { field: "main" }, { field: "PhoneTypeId" }];

    const emailCols: ColDef[] = [{ field: "email" }, { field: "main" }];

    const contactsCols: ColDef[] = [
        { field: "firstName" },
        { field: "lastName" },
        { field: "title" },
        { field: "department" },
        { field: "instagram" },
        { field: "website" },
        { field: "active" },
        { field: "main" },
    ];

    return (
        <Box p={2}>
            <BasePaper>
                <UpdateVendorForm initialValues={vendor} onDone={onDone} />
            </BasePaper>
            <BasePaper style={{ marginTop: "1em" }}>
                <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)} style={{ margin: "0.5em 0" }}>
                    <Tab label="Vendings" />
                    <Tab label="Items" />
                    <Tab label="Notes" />
                    <Tab label="Documents" />
                    <Tab label="Addresses" />
                    <Tab label="Emails" />
                    <Tab label="Phones" />
                    <Tab label="Contacts" />
                </Tabs>
                {activeTab === 0 && <BaseDataGrid cols={cols} rows={vendings} onRowSelected={onVendingSelected} height={450} />}
                {activeTab === 1 && <BaseDataGrid cols={itemCols} rows={items} onRowSelected={() => {}} height={450} />}
                {activeTab === 2 && <BaseDataGrid cols={noteCols} rows={notes} onRowSelected={onNoteSelected} height={450} />}
                {activeTab === 3 && <BaseDataGrid cols={docCols} rows={docs} onRowSelected={onDocSelected} height={450} />}
                {activeTab === 4 && <BaseDataGrid cols={addrCols} rows={addresses} onRowSelected={onAddressSelected} height={450} />}
                {activeTab === 5 && <BaseDataGrid cols={emailCols} rows={emails} onRowSelected={onEmailSelected} height={450} />}
                {activeTab === 6 && <BaseDataGrid cols={phoneCols} rows={phones} onRowSelected={onPhoneSelected} height={450} />}
                {activeTab === 7 && <BaseDataGrid cols={contactsCols} rows={contacts} onRowSelected={onContactSelected} height={450} />}
            </BasePaper>
        </Box>
    );
}
