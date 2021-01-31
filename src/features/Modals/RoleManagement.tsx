import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Box, MenuItem, Button, List, ListItem, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";

import { getRoles, getRoleApis, assignApiToRole, deassignApiToRole, IRole } from "../../api/role";
import { getApis, filterRoleApis, IApi } from "../../api/api";

import { BaseSelect } from "../../app/Inputs";

export default function RoleManagement({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [roles, setRoles] = useState([]);
    const [apis, setApis] = useState<any>([]);
    // const [avApis, setApis]

    const [selRole, setSelRole] = useState<number>();
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
            getRoles()
                .then((d) => setRoles(d))
                .catch((e) => console.log(e));

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

    const handleChange = async (apiId: number, v: boolean) => {
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

    const handleDeassign = async (apiId: number) => {
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Role Management</DialogTitle>
            <Box p={2}>
                <BaseSelect fullWidth name="roles" onChange={(e: any) => setSelRole(e.target.value)}>
                    {roles.map((role: IRole) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                    ))}
                </BaseSelect>
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
