import React, { useState, useEffect } from "react";
import { Box, List, ListItem, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

import { getRoles, getRoleApis, assignApiToRole, deassignApiToRole } from "../../api/role";
import { getApis, filterRoleApis, IApi } from "../../api/api";

import Button from "../../app/Button";
import Dialog from "../../app/Dialog";
import { FieldSelect } from "../../app/Inputs";

export default function RoleManagement({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [apis, setApis] = useState<any>([]);

    const [selRole, setSelRole] = useState<string>();
    const [selRoleApis, setSelRoleApis] = useState<any>([]);

    const refreshRoleApis = async () => {
        try {
            if (selRole) {
                const resp = await getRoleApis(selRole);
                console.log(resp);

                if (resp) {
                    setSelRoleApis(resp);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (open) {
            getApis()
                .then((d) => setApis(d))
                .catch((e) => console.log(e));
        }
    }, [open]);

    const refreshAvailableApis = async () => {
        try {
            const allApis = await getApis();
            const avApis = filterRoleApis(allApis, selRoleApis);
            setApis(avApis);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refreshRoleApis();
        refreshAvailableApis();
    }, [selRole]);

    const handleChange = async (apiId: string, v: boolean) => {
        try {
            if (v) {
                if (selRole) {
                    const resp = await assignApiToRole(selRole, apiId);
                    console.log(resp);
                    refreshRoleApis();
                    refreshAvailableApis();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeassign = async (apiId: string) => {
        try {
            if (selRole) {
                const resp = await deassignApiToRole(selRole, apiId);
                console.log(resp);
                refreshRoleApis();
                refreshAvailableApis();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth title="Role management">
            <Box p={2}>
                <FieldSelect
                    request={getRoles}
                    itemTitleField="name"
                    itemValueField="id"
                    fullWidth
                    name="roles"
                    onChange={(e: any) => setSelRole(e.target.value)}
                    label="Roles"
                />

                <List>
                    {selRoleApis &&
                        selRoleApis.map((sra: IApi) => (
                            <ListItem key={sra.id}>
                                <Box display="flex" width="100%" alignItems="center" justifyContent="space-between">
                                    <Typography>{sra.route}</Typography>
                                    <Button style={{ color: "red" }} onClick={() => handleDeassign(sra.id)}>
                                        <DeleteRounded />
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                </List>
                <hr />
                <Typography>Available APIs:</Typography>
                <List style={{ maxHeight: 430, overflowY: "scroll" }}>
                    {selRole &&
                        apis.map((api: IApi) => (
                            <ListItem key={api.id}>
                                <FormControlLabel
                                    label={api.route}
                                    control={<Checkbox onChange={(e) => handleChange(api.id, e.target.checked)} />}
                                />
                            </ListItem>
                        ))}
                </List>
            </Box>
        </Dialog>
    );
}
