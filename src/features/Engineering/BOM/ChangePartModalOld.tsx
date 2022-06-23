import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import AsyncCombo from "common/AsyncCombo";

const schema = Yup.object().shape({
  ItemId: Yup.string().required(),
});

function ChangePartModal({
  open,
  row,
  partName,
  onClose,
  onDone,
  onDelete,
}: {
  row: any;
  partName: string;
  open: boolean;
  onClose: () => void;
  onDone: (data: any) => void;
  onDelete: (data: any) => void;
}) {
  const [selectedItemName, setSelectedItemName] = useState("");
  const prevPart = row?.parts?.find((p: any) => p.name === partName) || null;

  const handleSubmit = (d: any) => {
    for (const key in d) {
      if (!d[key]) {
        delete d[key];
      }
    }
    const prevCells = row?.parts?.map((p: any) => ({
      name: p?.name || undefined,
      ItemId: (p?.ItemId as any)?._id || p?.ItemId?.id,
      usage: p.usage,
    }));
    const res = { device: row.DeviceId, cells: [...prevCells, { ...d, name: partName }] };

    onDone(res);
  };

  const handleDelete = () => {
    const data = {
      device: row.DeviceId,
      cells: row?.parts?.filter((p: any) => p?.name !== partName),
      rowId: row.id,
      partName,
    };

    onDelete(data);
  };

  useEffect(() => {
    if (prevPart?.ItemId) {
      setSelectedItemName(prevPart?.ItemId?.name);
    }
  }, [prevPart?.ItemId]);

  return (
    <Dialog open={open} onClose={onClose} title="Add part">
      <Formik
        initialValues={{
          ItemId: prevPart?.ItemId,
          usage: prevPart?.usage || 1,
          location: undefined,
          uom: undefined,
          fixedQty: prevPart?.fixedQty || false,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, setFieldValue, handleChange, handleBlur }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
              <TextField label="Part number" disabled value={row["Device Number"]} />
              <TextField disabled label="name" value={partName} />
              <AsyncCombo
                label="Part number"
                filterBy="no"
                getOptionLabel={(o) => o?.no || o?.name || "No-Name"}
                getOptionSelected={(o, v) => o?.id === v?.id}
                url="/item"
                value={values.ItemId}
                onChange={(e, nv) => {
                  setSelectedItemName(nv?.name);
                  setFieldValue("ItemId", nv?.id);
                }}
              />
              <TextField label="Part number" disabled value={selectedItemName} />
              <TextField
                type="number"
                name="usage"
                placeholder="usage"
                label="Usage"
                value={values.usage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.usage)}
                InputLabelProps={{ shrink: true }}
              />
              <FormControlLabel
                style={{ margin: 0 }}
                name="fixedQty"
                placeholder="Fixed QTY"
                label="Fixed QTY"
                checked={values.fixedQty}
                onChange={handleChange}
                onBlur={handleBlur}
                control={<Checkbox />}
              />
              <Button kind={prevPart ? "edit" : "add"} type="submit">
                Submit
              </Button>
              {prevPart && (
                <Button kind="delete" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default ChangePartModal;
