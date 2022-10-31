import React, { useState } from "react";
import { Box, Chip } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "app/TextField";
import Button from "app/Button";
import Dialog from "app/Dialog";

import {
  addEmployee,
  IEmployee,
  deleteEmployee,
  updateEmployee,
  deleteRoleFromEmployee,
  addRoleToEmployee,
} from "api/employee";
import LinkField from "app/Inputs/LinkFields";
import Confirm from "features/Modals/Confirm";

export const AddEmployeeModal = ({
  open,
  onClose,
  initialVals,
  setRefresh,
}: {
  open: boolean;
  onClose: () => void;
  initialVals?: IEmployee;
  setRefresh: any;
}) => {
  const schema = Yup.object().shape({
    username: Yup.string().required().min(3),
  });
  const [confirm, setConfirm] = useState(false);
  const [roleName, setRoleName] = useState(false);

  const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
    try {
      data.roles = [data.role];
      if (initialVals) {
        let updateData = { department: data.department, email: data.email };
        const resp = await updateEmployee(initialVals.id, updateData);
        if (data.role) await addRoleToEmployee(initialVals.id, data.role);
        if (resp) {
          setSubmitting(false);
          setRefresh((p: any) => p + 1);
          onClose();
        }
      } else {
        const resp = await addEmployee(data);
        if (resp) {
          setSubmitting(false);
          setRefresh((p: any) => p + 1);
          onClose();
        }
      }
    } catch (error) {
      console.log(data);
    }
  };
  const handleDelete = async () => {
    try {
      if (initialVals && initialVals?.id) {
        await deleteEmployee(initialVals?.id);
        setRefresh((p: any) => p + 1);
        setConfirm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteRole = async (id: string) => {
    try {
      if (initialVals && initialVals?.id) {
        await deleteRoleFromEmployee(initialVals?.id, id);
        setRefresh((p: any) => p + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth title="Add new employee">
      <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDelete} />
      <Box m={2}>
        <Formik
          initialValues={initialVals ? initialVals : ({} as IEmployee)}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
                {!initialVals && (
                  <>
                    <TextField
                      label="Username"
                      placeholder="username"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.username && touched.username)}
                      helperText={errors.username}
                    />
                    <TextField
                      label="Password"
                      placeholder="password"
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.password && touched.password)}
                      helperText={errors.password}
                    />
                  </>
                )}
                <TextField
                  label="Email"
                  placeholder="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email && touched.email)}
                  helperText={errors.email}
                />
                <TextField
                  label="Department"
                  placeholder="department"
                  type="department"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.department && touched.department)}
                  helperText={errors.department}
                />
                {!initialVals ||
                  !initialVals.roles ||
                  (!values.role && (
                    <LinkField
                      label="Role"
                      filterLabel="name"
                      getOptionLabel={(i) => i?.name || ""}
                      getOptionList={(r) => r?.result || []}
                      getOptionValue={(i) => i.id}
                      path="/role"
                      choseItem={values.role}
                      value={values.role}
                      onChange={(e, nv) => {
                        setFieldValue("role", nv.id);
                        setRoleName(nv.name);
                      }}
                    />
                  ))}
                {initialVals &&
                  values.role &&
                  initialVals.roles?.map((role) => (
                    <Box display={"flex"} gridGap="10px" alignItems={"center"}>
                      <Box>Roles:</Box>
                      <Chip
                        label={roleName || role.name}
                        onDelete={() => {
                          handleDeleteRole(role.id);
                          setFieldValue("role", undefined);
                        }}
                      />
                    </Box>
                  ))}
                {!initialVals && (
                  <Button fullWidth disabled={isSubmitting} type="submit" kind="add">
                    Add
                  </Button>
                )}
                {initialVals && (
                  <Box display={"flex"} alignItems="center" justifyContent={"space-evenly"}>
                    <Button fullWidth disabled={isSubmitting} type="submit" kind="edit">
                      Save
                    </Button>
                    <Button fullWidth disabled={isSubmitting} onClick={() => setConfirm(true)} kind="delete">
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
