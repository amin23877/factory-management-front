import React, { useState } from "react";
import { Box, Chip } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextField from "app/TextField";
import Button from "app/Button";
import Dialog from "app/Dialog";
import LinkField from "app/Inputs/LinkFields";
import Toast from "app/Toast";

import {
  addEmployee,
  IEmployee,
  deleteEmployee,
  updateEmployee,
  deleteRoleFromEmployee,
  addRoleToEmployee,
  updateEmployeePassword,
} from "api/employee";

import Confirm from "common/Confirm";
import useSWR, { mutate } from "swr";

const schema = Yup.object().shape({
  username: Yup.string().required().min(3),
});

const passSchema = Yup.object().shape({
  current: Yup.string().required(),
  password: Yup.string().required(),
  repPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

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
  const [tab, setTab] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setTab(0);
      }}
      maxWidth="sm"
      fullWidth
      title="Add new employee"
    >
      <Box m={2}>
        {tab === 0 && (
          <GeneralForm onClose={onClose} setRefresh={setRefresh} initialVals={initialVals} setTab={setTab} />
        )}
        {tab === 1 && <RoleForm onClose={onClose} initialVals={initialVals} setRefresh={setRefresh} />}
        {tab === 2 && <PasswordForm onClose={onClose} setTab={setTab} initialVals={initialVals} />}
      </Box>
    </Dialog>
  );
};

const PasswordForm = ({
  onClose,
  setTab,
  initialVals,
}: {
  onClose: () => void;
  setTab?: any;
  initialVals?: IEmployee;
}) => {
  const handleChangePass = async (data: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
    try {
      if (initialVals && initialVals.id) {
        const resp = await updateEmployeePassword(initialVals.id, data);
        if (resp) {
          Toast("password changed", "success");
          setSubmitting(false);
          onClose();
          setTab(0);
        }
      }
    } catch (error) {
      console.log(data);
    }
  };

  return (
    <Formik
      initialValues={{ current: "", password: "", repPassword: "" }}
      validationSchema={passSchema}
      onSubmit={handleChangePass}
    >
      {({ values, touched, errors, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box display="grid" gridTemplateColumns="1fr" gridGap={"12px"}>
            <TextField
              label="Current Password"
              placeholder="current"
              type="password"
              name="current"
              value={values.current}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.current && touched.current)}
              helperText={errors.current}
            />
            <TextField
              label="New Password"
              placeholder="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password && touched.password)}
              helperText={touched.repPassword && errors.password}
            />
            <TextField
              label="Confirm Password"
              placeholder="repPassword"
              type="password"
              name="repPassword"
              value={values.repPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.repPassword && touched.repPassword)}
              helperText={touched.repPassword && errors.repPassword}
            />
            <Button fullWidth disabled={isSubmitting} type="submit" kind="edit">
              Change Password
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const RoleForm = ({
  onClose,
  initialVals,
  setRefresh,
}: {
  onClose: () => void;
  initialVals?: IEmployee;
  setRefresh: any;
}) => {
  const { data: employee } = useSWR<IEmployee>(`/employee/${initialVals?.id}`);

  const handleSubmit = async (data: any, { setSubmitting }: { setSubmitting: (v: boolean) => void }) => {
    try {
      if (initialVals && data.role) {
        const resp = await addRoleToEmployee(initialVals.id, data.role);
        if (resp) {
          setSubmitting(false);
          mutate(`/employee/${initialVals?.id}`);
        }
      }
    } catch (error) {
      console.log(data);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      if (initialVals && initialVals?.id) {
        await deleteRoleFromEmployee(initialVals?.id, id);
        mutate(`/employee/${initialVals?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik initialValues={{} as IEmployee} onSubmit={handleSubmit}>
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <Box display="grid" gridTemplateColumns="1fr" gridGap={"12px"}>
            <Box display={"flex"} gridGap={"12px"}>
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
                }}
                style={{ flex: 1 }}
              />
              <Button type="submit" kind="add" disabled={isSubmitting}>
                Add
              </Button>
            </Box>
            {employee &&
              employee.roles?.map((role) => (
                <Box display={"flex"} gridGap="10px" alignItems={"center"}>
                  <Chip
                    label={role.name}
                    onDelete={() => {
                      handleDeleteRole(role.id);
                    }}
                  ></Chip>
                </Box>
              ))}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const GeneralForm = ({
  onClose,
  initialVals,
  setRefresh,
  setTab,
}: {
  onClose: () => void;
  initialVals?: IEmployee;
  setRefresh: any;
  setTab?: any;
}) => {
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

  const handleDelete = () => {
    Confirm({
      text: `you are going to delete an Employee with username ${initialVals?.username} !`,
      onConfirm: async () => {
        try {
          if (initialVals && initialVals.id) await deleteEmployee(initialVals?.id);
          Toast("Employee deleted", "success");
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p: any) => p + 1);
          onClose();
        }
      },
    });
  };

  return (
    <Formik
      initialValues={initialVals ? initialVals : ({} as IEmployee)}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, touched, errors, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
        <Form>
          <Box display="grid" gridTemplateColumns="1fr" gridGap={"12px"}>
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
                  helperText={touched.username && errors.username}
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
                  helperText={touched.username && errors.password}
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
              label="Name"
              placeholder="name"
              type="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.name && touched.name)}
              helperText={errors.name}
            />
            <TextField
              label="Last Name"
              placeholder="lastName"
              type="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.lastName && touched.lastName)}
              helperText={errors.lastName}
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
            {!initialVals && (
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
                }}
              />
            )}
            {initialVals && (
              <>
                <Button onClick={() => setTab(1)}>manage roles</Button>
                <Button onClick={() => setTab(2)}>change password</Button>
              </>
            )}
            {!initialVals && (
              <Button fullWidth disabled={isSubmitting} type="submit" kind="add">
                Add
              </Button>
            )}
            {initialVals && (
              <Box display={"flex"} alignItems="center" justifyContent={"space-evenly"} gridGap={2}>
                <Button fullWidth disabled={isSubmitting} type="submit" kind="edit">
                  Save
                </Button>
                <Button fullWidth disabled={isSubmitting} onClick={() => handleDelete()} kind="delete">
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};
