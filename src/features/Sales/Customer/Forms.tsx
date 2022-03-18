import React, { Fragment } from "react";
import {
  Box,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormControl,
  Paper,
  useMediaQuery,
  LinearProgress,
} from "@material-ui/core";

import { CacheFieldSelect } from "app/Inputs";
import TextField from "app/TextField";
import Button from "app/Button";

import { editClient } from "api/client";
import Toast from "app/Toast";
import useSWR from "swr";

export const GeneralForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  req,
  cId,
  changeTab,
}: {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
  req?: any;
  cId: string;
  changeTab: (a: number) => void;
}) => {
  const handleApprove = async () => {
    const resp = await editClient(cId, { approved: true });
    if (resp) {
      Toast("Approved", "success");
      changeTab(0);
    }
  };

  const handleReject = async () => {
    const resp = await editClient(cId, { approved: false });
    if (resp) {
      Toast("Rejected", "success");
      changeTab(2);
    }
  };
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Paper
        style={{
          margin: "0 0 2em 0",
          padding: "0.5em",
          backgroundColor: "#eee",
          gridColumnEnd: "span 3",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          columnGap: "15px",
        }}
      >
        <FormControlLabel
          name="active"
          value={values.active}
          control={<Checkbox checked={Boolean(values.active)} />}
          label="Active"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {req ? (
          <Fragment>
            <Button kind="add" onClick={handleApprove}>
              Approve
            </Button>
            <Button kind="delete" onClick={handleReject}>
              Reject
            </Button>
          </Fragment>
        ) : (
          <FormControlLabel
            name="approved"
            value={values.approved}
            control={<Checkbox checked={Boolean(values.approved)} />}
            label="Approved"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
      </Paper>
      <Box
        mb={1}
        display="grid"
        gridColumnGap={10}
        gridRowGap={10}
        gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr 1fr"}
      >
        <CacheFieldSelect
          url="/clientType"
          getOptionList={(resp) => resp.result}
          itemTitleField="name"
          itemValueField="id"
          name="CustomerTypeId"
          label="Customer Type"
          fullWidth
          onChange={handleChange}
          value={typeof values.CustomerTypeId === "string" ? values.CustomerTypeId : values.CustomerTypeId?.id}
          error={Boolean(errors.CustomerTypeId)}
        />
        <TextField
          name="number"
          value={values.number}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.number && touched.number)}
          helperText={touched.number && errors.number && String(errors.number)}
          label="Customer ID"
          disabled
        />
        <TextField
          name="name"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.name && touched.name)}
          helperText={touched.name && errors.name && String(errors.name)}
          label="Name"
        />
        <TextField
          name="qbid"
          value={values.qbid}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.qbid && touched.qbid)}
          helperText={touched.qbid && errors.qbid && String(errors.qbid)}
          label="Quick Book ID"
        />
        <TextField
          name="location"
          value={values.location}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.location && touched.location)}
          helperText={touched.location && errors.location && String(errors.location)}
          label="Location"
          style={{ gridColumn: "span 2" }}
        />
        <TextField
          name="ext"
          value={values.ext}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.ext && touched.ext)}
          helperText={touched.ext && errors.ext && String(errors.ext)}
          label="Ext"
        />
        <TextField
          name="phone"
          value={values.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.phone && touched.phone)}
          helperText={touched.phone && errors.phone && String(errors.phone)}
          label="Phone"
        />
        <FormControl
          style={
            phone
              ? { display: "flex", gridColumnEnd: "span 2", alignItems: "center", flexDirection: "row" }
              : {
                  display: "flex",
                  gridColumnEnd: "span 4",
                  alignItems: "center",
                  flexDirection: "row",
                }
          }
        >
          <FormLabel style={{ marginRight: "10px" }}>Size</FormLabel>
          <RadioGroup row name="size" value={values.size} onChange={handleChange} style={{}}>
            <FormControlLabel value="small" control={<Radio size="small" />} label="Small" />
            <FormControlLabel value="medium" control={<Radio size="small" />} label="Medium" />
            <FormControlLabel value="large" control={<Radio size="small" />} label="Large" />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export const MoreInfoForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}: {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
}) => {
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <Box
      my={2}
      display="grid"
      gridColumnGap={10}
      gridRowGap={10}
      gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
    >
      <TextField
        name="website"
        value={values.website}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.website && touched.website)}
        helperText={touched.website && errors.website && String(errors.website)}
        label="website"
      />
      <TextField
        name="linkedIn"
        value={values.linkedIn}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.linkedIn && touched.linkedIn)}
        helperText={touched.linkedIn && errors.linkedIn && String(errors.linkedIn)}
        label="linkedIn"
      />
      <TextField
        name="facebook"
        value={values.facebook}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.facebook && touched.facebook)}
        helperText={touched.facebook && errors.facebook && String(errors.facebook)}
        label="facebook"
      />
      <TextField
        name="instagram"
        value={values.instagram}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.instagram && touched.instagram)}
        helperText={touched.instagram && errors.instagram && String(errors.instagram)}
        label="instagram"
      />
      <TextField
        name="fax"
        value={values.fax}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.fax && touched.fax)}
        helperText={touched.fax && errors.fax && String(errors.fax)}
        label="fax"
      />
      <CacheFieldSelect
        url="/client"
        getOptionList={(resp) => resp.result}
        itemTitleField="name"
        itemValueField="id"
        name="parent"
        label="Parent"
        fullWidth
        onChange={handleChange}
        value={typeof values.parent === "string" ? values.parent : values.parent?.id}
        error={Boolean(errors.parent)}
      />
      <TextField
        name="refferedBy"
        value={values.refferedBy}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.refferedBy && touched.refferedBy)}
        helperText={touched.refferedBy && errors.refferedBy && String(errors.refferedBy)}
        label="referred By"
      />
    </Box>
  );
};

export const MainContactForm = ({ selectedRow }: { selectedRow: any }) => {
  const { data } = useSWR(`/contact/client/${selectedRow.id}`);

  if (!data) {
    return <LinearProgress />;
  }

  return (
    <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
      <TextField value={`${data[0]?.firstName} ${data[0]?.lastName}`} label=" Main Contact Name" disabled />
      <TextField value={data[0]?.phones[0]?.phone} label="Main Contact Phone" disabled />
      <TextField value={data[0]?.emails[0]?.email} label="Main Contact Email" disabled />
    </Box>
  );
};

export const CommissionForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}: {
  values: any;
  errors: any;
  touched: any;
  handleBlur: any;
  handleChange: any;
}) => {
  return (
    <Box my={2} display="grid" gridColumnGap={10} gridRowGap={10} gridTemplateColumns="1fr">
      <TextField
        name="regularCommisionPercentage"
        value={values.regularCommisionPercentage}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.regularCommisionPercentage && touched.regularCommisionPercentage)}
        helperText={
          touched.regularCommisionPercentage &&
          errors.regularCommisionPercentage &&
          String(errors.regularCommisionPercentage)
        }
        label=" Regular Commision Percentage"
        type="number"
      />
      <TextField
        name="overageCommissionPercentage"
        value={values.overageCommissionPercentage}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(errors.overageCommissionPercentage && touched.overageCommissionPercentage)}
        helperText={
          touched.overageCommissionPercentage &&
          errors.overageCommissionPercentage &&
          String(errors.overageCommissionPercentage)
        }
        label="Overage Commission Percentage"
        type="number"
      />
    </Box>
  );
};
