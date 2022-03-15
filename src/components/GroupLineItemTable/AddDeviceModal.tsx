import React from "react";
import { Box, Checkbox, FormControlLabel, makeStyles, createStyles } from "@material-ui/core";
import { useAutocomplete } from "@material-ui/lab";
import { Formik, Form } from "formik";

import Dialog from "app/Dialog";
import Button from "app/Button";
import TextField from "app/TextField";
import LinkSelect from "app/Inputs/LinkFields";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    label: {
      display: "block",
      position: "absolute",
      top: -7,
      left: 13,
      background: "white",
      padding: "0 4px",
      fontSize: 9,
      color: "#888",
    },
    input: {
      border: "1px solid #ccc",
      borderRadius: 4,
      padding: "1em",
      width: "100%",
    },
    listbox: {
      width: 200,
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: "absolute",
      listStyle: "none",
      backgroundColor: theme.palette.background.paper,
      overflow: "auto",
      maxHeight: 200,
      border: "1px solid rgba(0,0,0,.25)",
      '& li[data-focus="true"]': {
        backgroundColor: "#4a8df6",
        color: "white",
        cursor: "pointer",
      },
      "& li:active": {
        backgroundColor: "#2977f5",
        color: "white",
      },
    },
  })
);

function PricingAutocomplete({
  options,
  inputValue,
  onInputChange,
}: {
  options: any[];
  inputValue?: string;
  onInputChange?: (e: any, v: string) => void;
}) {
  const classes = useStyles();
  const { getRootProps, getInputLabelProps, getInputProps, getListboxProps, getOptionProps, groupedOptions } =
    useAutocomplete({
      id: "pricing-autocomplete",
      options,
      getOptionLabel: (option: any) => "" + option.price,
      inputValue,
      onInputChange,
      freeSolo: true,
      autoSelect: true,
    });

  return (
    <div>
      <div {...getRootProps()} style={{ position: "relative" }}>
        <label className={classes.label} {...getInputLabelProps()}>
          Price
        </label>
        <input className={classes.input} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{`${option?.label} - ${option.price}`}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function AddDeviceModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  return (
    <Dialog title="Add Device" open={open} onClose={onClose}>
      <Formik initialValues={{} as any} onSubmit={(data) => onSubmit({ ...data, type: "device" })}>
        {({ getFieldProps, setFieldValue, values }) => (
          <Form>
            <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
              <LinkSelect
                value={values.ItemId}
                choseItem={values.ItemId}
                label="Item"
                path="/item"
                filterLabel="no"
                getOptionList={(resp) => resp?.result}
                getOptionLabel={(item) => item?.no || item?.name || "No-Name"}
                getOptionValue={(item) => item?.id}
                onChange={(e, nv) => {
                  setFieldValue("ItemId", nv.id);
                  setFieldValue("ItemObject", nv);
                  setFieldValue("price", nv.retailPrice);
                  setFieldValue("unit", nv.isUnit);
                  setFieldValue("standardWarranty", nv.isUnit);
                }}
                url="/panel/engineering"
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <PricingAutocomplete
                options={values?.ItemObject?.pricing || []}
                inputValue={"" + values.price}
                onInputChange={(e, v) => {
                  if (v !== "undefined") {
                    setFieldValue("price", v);
                  }
                }}
              />
              {/* <Autocomplete
                freeSolo
                options={values?.ItemObject?.pricing || []}
                getOptionLabel={(r: any) => `${r?.price}`}
                inputValue={`${values?.price}`}
                onInputChange={(e, nv) => {
                  setFieldValue("price", nv);
                }}
                value={values?.priceObject}
                onChange={(e, nv: any) => {
                  setFieldValue("priceObject", nv);
                }}
                renderInput={(p) => <TextField {...p} label="Price" />}
              /> */}
              {/* <TextField
                type="number"
                label="Price"
                {...getFieldProps("price")}
                required
                InputLabelProps={{ shrink: true }}
              /> */}
              <FormControlLabel label="Unit" control={<Checkbox />} {...getFieldProps("unit")} />
              <FormControlLabel
                label="Standard Warranty"
                control={<Checkbox />}
                {...getFieldProps("standardWarranty")}
              />
              <Button type="submit" kind="add">
                Add
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
