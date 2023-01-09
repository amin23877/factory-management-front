import React from "react";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Form, Formik } from "formik";
import { mutate } from "swr";

import Dialog from "app/Dialog";
import TextField from "app/TextField";
import Button from "app/Button";
import { IItem, updateAnItem } from "api/items";

export type pricingType = {
  id?: string;
  label: string;
  price: number;
  nonCommissionable: boolean;
};

export default function AddPricing({
  open,
  item,
  initialValues,
  onClose,
}: {
  open: boolean;
  item: IItem;
  initialValues?: pricingType;
  onClose: () => void;
}) {
  const handleSubmit = async (d: any, { resetForm }: any) => {
    try {
      if (initialValues && initialValues.id) {
        const pricingCopy = item.pricing.concat();
        const index = pricingCopy.findIndex((p) => p?.id === initialValues.id);
        pricingCopy[index] = d;

        await updateAnItem(item.id, { pricing: pricingCopy });
        mutate(`/item/${item.id}`);
        onClose();
        resetForm({});
      } else {
        await updateAnItem(item.id, { pricing: [...item.pricing, d] });
        mutate(`/item/${item.id}`);
        onClose();
        resetForm({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (initialValues && initialValues.id) {
        const newPricing = item.pricing.filter((p) => p.id !== initialValues.id);
        await updateAnItem(item.id, { pricing: newPricing });
        mutate(`/item/${item.id}`);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog title={initialValues ? "Edit Pricing" : "Add Pricing"} open={open} onClose={onClose}>
      <Box m={2}>
        <Formik initialValues={initialValues || ({} as pricingType)} onSubmit={handleSubmit}>
          {({ getFieldProps, values }) => (
            <Form>
              <Box display="flex" flexDirection="column" style={{ gap: 8 }}>
                <TextField label="Label" {...getFieldProps("label")} />
                <TextField type="number" label="Price" {...getFieldProps("price")} />
                <FormControlLabel
                  label="Non Commissionable"
                  control={<Checkbox checked={values.nonCommissionable} />}
                  {...getFieldProps("nonCommissionable")}
                />
                <Button kind={initialValues?.id ? "edit" : "add"} type="submit">
                  submit
                </Button>
                {initialValues?.id && (
                  <Button kind="delete" onClick={handleDelete}>
                    delete
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
}
