import React, { useRef, useState } from "react";
import { Box, Checkbox, FormControlLabel, Paper, useMediaQuery } from "@material-ui/core";

import Button from "app/Button";
import TextField from "app/TextField";
import { addImage } from "api/items";
import { host } from "host";
import { LockButton, useLock } from "common/Lock";

interface IForm {
  values: any;
  errors: any;
  touched: any;
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  setFieldValue: any;
  isSubmitting?: boolean;
  device?: boolean;
  sales?: boolean;
}

export const Photo = ({ device }: { device: any }) => {
  const imageUploader = useRef<HTMLElement | null>(null);
  const [img, setImg] = useState<string>();

  const handleFileChange = async (e: any) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    const resp = await addImage(device.id, file);
    if (resp) {
      setImg(url);
    }
  };

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
      {device?.photo && (
        <img
          style={{
            maxWidth: "100%",
            height: "auto",
            maxHeight: "135px",
            margin: "10px auto",
          }}
          alt=""
          src={img ? img : `http://${host}${device?.photo}`}
        />
      )}
      <div>
        <Box textAlign="center">
          <Button onClick={() => imageUploader.current && imageUploader.current.click()}>Upload Image</Button>
        </Box>
        <input
          id="file"
          name="file"
          style={{ display: "none" }}
          type="file"
          ref={(e) => (imageUploader.current = e)}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </Box>
  );
};

export const General = ({ values, errors, handleChange, handleBlur, touched, sales }: IForm) => {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10}>
      <Paper
        style={
          phone
            ? {
                margin: "0.5em 0",
                padding: "0 0.5em",
                backgroundColor: "#eee",
                gridColumnEnd: "span 2",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                alignItems: "center",
              }
            : {
                margin: "0.5em 0",
                padding: "0 0.5em",
                backgroundColor: "#eee",
                gridColumnEnd: "span 2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }
        }
      >
        <FormControlLabel
          checked={values.active}
          label="Active"
          name="active"
          onChange={handleChange}
          control={<Checkbox size="small" />}
          disabled={lock}
        />
        <FormControlLabel
          checked={values.obsolete}
          label="Obsolete"
          name="obsolete"
          onChange={handleChange}
          control={<Checkbox size="small" />}
          disabled={lock}
        />
        <FormControlLabel
          checked={values.rndOnly}
          label="R&D"
          name="rndOnly"
          onChange={handleChange}
          control={<Checkbox size="small" />}
          disabled={lock}
        />
        <FormControlLabel
          checked={values.salesApproved}
          label="S. Ap."
          name="salesApproved"
          onChange={handleChange}
          control={<Checkbox size="small" />}
          disabled={lock}
        />
        <FormControlLabel
          checked={values.engineeringApproved}
          label="En. Ap."
          name="engineeringApproved"
          onChange={handleChange}
          control={<Checkbox size="small" />}
          disabled={lock}
        />
        <LockButton />
      </Paper>
      <TextField
        label="Device NO."
        name="no"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.no && touched.no)}
        value={values.no}
        disabled
      />
      <TextField
        label="Device Name"
        placeholder="Device name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.name && touched.name)}
        value={values.name}
        disabled={lock}
      />
      <TextField
        multiline
        style={{ gridColumnEnd: "span 2" }}
        rows={3}
        placeholder="description"
        label="Description"
        name="description"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.description}
        disabled={lock}
      />
      <TextField
        label="Lead Time"
        placeholder="Lead Time"
        name="leadTime"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.leadTime && touched.leadTime)}
        value={values.leadTime}
        disabled={lock}
      />
      <TextField
        label="Total Cost"
        name="totalCost"
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(errors.totalCost && touched.totalCost)}
        value={values.totalCost}
        disabled={lock}
      />
    </Box>
  );
};
