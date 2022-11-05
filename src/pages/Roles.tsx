import React, { useState, useMemo } from "react";
import { Box, IconButton, ListItem, Tabs, Tab } from "@material-ui/core";
import { AddRounded, DeleteRounded } from "@material-ui/icons";
import List from "app/SideUtilityList";
import { IEmployee, addRoleToEmployee, deleteRoleFromEmployee } from "../api/employee";

import { AddEmployeeModal } from "features/Modals/EmployeeModal";
import { AddRoleModal } from "features/Modals/RoleModals";

import { BasePaper } from "app/Paper";
import Snack from "app/Snack";
import NewDataGrid from "app/NewDataGrid";

export default function Roles() {
  const [addEmpModal, setAddEmpModal] = useState(false);
  const [editEmpModal, setEditEmpModal] = useState(false);
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [editRoleModal, setEditRoleModal] = useState(false);

  const [snack, setSnack] = useState(false);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const [selectedEmp, setSelectedEmp] = useState<IEmployee>();
  const [selectedRole, setSelectedRole] = useState<IEmployee>();
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
      <AddEmployeeModal open={addEmpModal} onClose={() => setAddEmpModal(false)} setRefresh={setRefresh} />
      {selectedEmp && (
        <AddEmployeeModal
          setRefresh={setRefresh}
          open={editEmpModal}
          onClose={() => setEditEmpModal(false)}
          initialVals={{ ...selectedEmp, role: selectedEmp?.roles[0] }}
        />
      )}
      <AddRoleModal open={addRoleModal} onClose={() => setAddRoleModal(false)} setRefresh={setRefresh} />
      {selectedRole && (
        <AddRoleModal
          open={editRoleModal}
          onClose={() => setEditRoleModal(false)}
          setRefresh={setRefresh}
          initialVals={selectedRole}
        />
      )}
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
                if (tab === 0) setAddEmpModal(true);
                else setAddRoleModal(true);
              }}
            >
              <AddRounded />
            </IconButton>
          </ListItem>
        </List>
      </Box>
      {tab === 0 && (
        <NewDataGrid
          url={`/employee`}
          columns={employeeCols}
          onRowSelected={(r) => {
            setEditEmpModal(true);
            setSelectedEmp(r);
          }}
          refresh={refresh}
        />
      )}
      {tab === 1 && (
        <NewDataGrid
          url={`/role`}
          columns={roleCols}
          onRowSelected={(r) => {
            setEditRoleModal(true);
            setSelectedRole(r);
          }}
          refresh={refresh}
        />
      )}
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
