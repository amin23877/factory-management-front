import React, { useEffect, useState } from "react";
import { Box, Grid, Tabs, Tab } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import useSWR from "swr";

import Button from "../../../app/Button";
import { BasePaper } from "../../../app/Paper";
import Toast from "../../../app/Toast";

import { deleteCustomer, ICustomer } from "../../../api/customer";

import AddCustomerModal from "./Modals";
import CustomerTypeModal from "./CustomerType";
import Confirm from "../../Modals/Confirm";
import Details from "./Details";
import Overview from "./Overview";

export default function Customers() {
    const [activeTab, setActiveTab] = useState(0);
    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [cTypeModal, setCTypeModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ICustomer>();
    const [conf, setConf] = useState(false);
    const [req, setReq] = useState(false);

    const { data: customers, mutate: mutateCustomers } = useSWR(activeTab === 0 ? "/customer?approved=true" : null);
    const { data: pending } = useSWR(activeTab === 1 ? "/customer?approved=null" : null);
    const { data: rejected } = useSWR(activeTab === 2 ? "/customer?approved=false" : null);

    // async function changeApproved() {
    //     if (customers) {
    //         for (const c of customers) {
    //             const resp = await editCustomer(c.id, { approved: true } as ICustomer);
    //             console.log(resp);
    //         }
    //     }
    // }

    // useEffect(() => {
    //     console.log(customers);
    // }, [customers]);
    const handleDelete = async () => {
        try {
            if (selectedRow) {
                await deleteCustomer(selectedRow.id);

                mutateCustomers();
                setConf(false);
                setActiveTab(0);
                Toast("Record deleted");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Confirm open={conf} onClose={() => setConf(false)} onConfirm={handleDelete} />
            <AddCustomerModal
                open={addCustomerModal}
                onClose={() => setAddCustomerModal(false)}
                onDone={mutateCustomers}
            />
            <CustomerTypeModal open={cTypeModal} onClose={() => setCTypeModal(false)} />

            <Box display="flex" alignItems="center" mb={1}>
                <Button
                    onClick={() => setAddCustomerModal(true)}
                    style={{
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        margin: "0 0.5em",
                        padding: " 6px 15px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                >
                    <AddRounded />
                    Add Customer
                </Button>
                {selectedRow && (
                    <Button onClick={() => setConf(true)} kind="delete">
                        Delete Customer
                    </Button>
                )}
                <Button kind="add" onClick={() => setCTypeModal(true)} style={{ margin: "0 0.5em" }}>
                    Add Customer Type
                </Button>
            </Box>

            <Grid container style={{ marginRight: "1px" }}>
                <Grid item xs={12}>
                    <BasePaper>
                        <Box mb={2} display="flex">
                            <Tabs value={activeTab} onChange={(e, nv) => setActiveTab(nv)}>
                                <Tab label="List" />
                                <Tab label="Requests" />
                                <Tab label="Rejected" />
                                <Tab label="Details" disabled={!selectedRow} />
                            </Tabs>
                            <div style={{ flex: 1 }}></div>
                        </Box>
                        {activeTab === 0 && (
                            <Overview
                                rows={customers?.results || []}
                                onRowSelected={(v) => {
                                    setSelectedRow(v);
                                    setActiveTab(3);
                                    setReq(false);
                                }}
                            />
                        )}
                        {activeTab === 1 && (
                            <Overview
                                rows={pending?.results || []}
                                onRowSelected={(v) => {
                                    setSelectedRow(v);
                                    setActiveTab(3);
                                    setReq(true);
                                }}
                            />
                        )}
                        {activeTab === 2 && (
                            <Overview
                                rows={rejected?.results || []}
                                onRowSelected={(v) => {
                                    setSelectedRow(v);
                                    setActiveTab(3);
                                    setReq(false);
                                }}
                            />
                        )}
                        {activeTab === 3 && selectedRow && (
                            <Details selectedRow={selectedRow} req={req} changeTab={(i) => setActiveTab(i)} />
                        )}
                    </BasePaper>
                </Grid>
            </Grid>
        </>
    );
}
