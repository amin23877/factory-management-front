import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
  ListItem,
  Tabs,
  Tab,
} from "@material-ui/core";
import { AddRounded, DeleteRounded } from "@material-ui/icons";
import List from "app/SideUtilityList";
import { getRoles, getEmployeesRoles } from "../api/role";
import { IEmployee, addRoleToEmployee, deleteRoleFromEmployee, deleteEmployee } from "../api/employee";

import Confirm from "../features/Modals/Confirm";
import { AddEmployeeModal } from "../features/Modals/EmployeeModal";
import { AddRoleModal } from "../features/Modals/RoleModals";
import RoleManagement from "../features/Modals/RoleManagement";

import { BasePaper } from "../app/Paper";
import Snack from "../app/Snack";
import NewDataGrid from "app/NewDataGrid";

export default function Roles() {
  const [addEmpModal, setAddEmpModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [roleManagement, setRoleManagement] = useState(false);

  const [snack, setSnack] = useState(false);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState(0);

  const [selectedEmp, setSelectedEmp] = useState<IEmployee>();
  const [empsAndRoles, setEmpsAndRoles] = useState<any>([]);

  const toggleRole = async (id: string, role: string, v: boolean) => {
    try {
      if (v) {
        await addRoleToEmployee(id, role);
        setMsg("Role added !");
        setSnack(true);
      } else {
        const userIndex = empsAndRoles.findIndex((item: any) => item.id === id);

        if (empsAndRoles[userIndex].Roles.length > 1) {
          await deleteRoleFromEmployee(id, role);
          setMsg("Role Removed !");
          setSnack(true);
        } else {
          setMsg("Sorry, You can't have employee with no role");
          setSnack(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedEmp && selectedEmp?.id) {
        await deleteEmployee(selectedEmp?.id);
        setConfirm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const roleCols = useMemo(
    () => [
      {
        name: "createdAt",
        header: "Date",
        minWidth: 110,
        type: "date",
        defaultFlex: 1,
      },
      {
        name: "name",
        header: "Name",
        minWidth: 110,
        defaultFlex: 1,
      },
    ],
    []
  );

  const employeeCols = useMemo(
    () => [
      {
        name: "createdAt",
        header: "Sign Up Date",
        minWidth: 110,
        type: "date",
        defaultFlex: 1,
      },
      {
        name: "username",
        header: "Username",
        minWidth: 110,
        defaultFlex: 1,
      },
      {
        name: "department",
        header: "Department",
        minWidth: 110,
        defaultFlex: 1,
      },
      {
        name: "roles",
        header: "Roles",
        minWidth: 110,
        defaultFlex: 1,
        render: ({ data }: any) => {
          let roles = [];
          roles = data?.roles?.map((role: any) => {
            return role.name;
          });
          return roles.join(",");
        },
      },
    ],
    []
  );
  return (
    <BasePaper>
      <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
      <AddEmployeeModal open={addEmpModal} onClose={() => setAddEmpModal(false)} onDone={() => {}} />
      <AddRoleModal open={addRoleModal} onClose={() => setAddRoleModal(false)} />
      <RoleManagement open={roleManagement} onClose={() => setRoleManagement(false)} />

      <Snack open={snack} onClose={() => setSnack(false)}>
        {msg}
      </Snack>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={1}>
        <Tabs
          value={tab}
          textColor="primary"
          onChange={(e, nv) => {
            setTab(nv);
          }}
          style={{ marginBottom: "10px" }}
        >
          <Tab label="Employee" />
          <Tab label="Role" />
        </Tabs>
        <div style={{ flexGrow: 1 }} />
        <List style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" }}>
          <ListItem>
            <IconButton
              title="Add item"
              onClick={() => {
                setAddEmpModal(true);
              }}
            >
              <AddRounded />
            </IconButton>
          </ListItem>
        </List>
      </Box>
      {tab === 0 && <NewDataGrid url={`/employee`} columns={employeeCols} onRowSelected={() => {}} />}
      {tab === 1 && <NewDataGrid url={`/role`} columns={roleCols} onRowSelected={() => {}} />}
      {/* <Box>
        <Box display="flex" my={2}>
          <Button onClick={() => setAddEmpModal(true)}>Add Employee</Button>
          <Button onClick={() => setAddRoleModal(true)}>Add Role</Button>
          <Button onClick={() => setRoleManagement(true)}>Manage Roles</Button>
        </Box>
        <BasePaper>
          <List>
            {empsAndRoles &&
              empsAndRoles.map((emp: any) => (
                <ListItem key={emp.id}>
                  <IconButton
                    onClick={() => {
                      setSelectedEmp(emp);
                      setConfirm(true);
                    }}
                    style={{ color: "red" }}
                  >
                    <DeleteRounded />
                  </IconButton>
                  <Typography>{emp.username}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="flex-end" flex={1}>
                    {roles &&
                      roles.map((role: any) => (
                        <FormControlLabel
                          onChange={(e: any) => toggleRole(emp.id, role.id, e.target.checked)}
                          key={role.id}
                          label={role.name}
                          control={
                            <Checkbox checked={Boolean(emp?.Roles?.find((r: any) => parseInt(r.id) === role.id))} />
                          }
                        />
                      ))}
                  </Box>
                </ListItem>
              ))}
          </List>
        </BasePaper>
      </Box> */}
    </BasePaper>
  );
}
