import React from "react";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import Toast from "app/Toast";
import Button from "app/Button";

import { Box } from "@material-ui/core";
import TextField from "app/TextField";
import LinkSelect from "app/Inputs/LinkFields";
import { createRequiredPurchasePO, IRequiredPO } from "api/purchasePO";
import DateTimePicker from "app/DateTimePicker";

export default function AddRequiredPOModal({
  open,
  onClose,
  setRefresh,
}: {
  open: boolean;
  onClose: () => void;
  setRefresh: any;
}) {
  const handleSubmit = async (data: any) => {
    try {
      data = { ...data, type: "assetBased" };
      await createRequiredPurchasePO(data);
      Toast("created successfully", "success");
      setRefresh((p: number) => p + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title="Add New Required PO">
      <Formik initialValues={{} as IRequiredPO} onSubmit={handleSubmit}>
        {({ values, setFieldValue, getFieldProps }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 10 }}>
              <LinkSelect
                placeholder="Item"
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
                }}
                url="/panel/engineering"
              />
              <TextField type="number" label="Quantity" {...getFieldProps("qty")} required />
              <DateTimePicker
                {...getFieldProps("expectedDate")}
                onChange={(d) => setFieldValue("expectedDate", d?.toString())}
                size="small"
                label="Expected Date"
              />
            </Box>
            <Box display={"flex"} justifyContent="center" mt={5} width="100%">
              <Button type="submit" kind="add">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
