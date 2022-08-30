import React, { useState } from "react";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import Toast from "app/Toast";
import Button from "app/Button";

import { Box } from "@material-ui/core";
import TextField from "app/TextField";
import LinkSelect from "app/Inputs/LinkFields";
import { createRequiredPurchasePO, deleteRequiredPO, IRequiredPO, updateRequiredPO } from "api/purchasePO";
import DateTimePicker from "app/DateTimePicker";
import Confirm from "common/Confirm";
import AddPOModal from "./AddPOModal";

export default function AddRequiredPOModal({
  open,
  onClose,
  setRefresh,
  selectedRPO,
}: {
  open: boolean;
  onClose: () => void;
  setRefresh: any;
  selectedRPO?: IRequiredPO;
}) {
  const [addPo, setAddPO] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      if (selectedRPO) {
        let time = new Date(data.expectedDate).getTime();
        data = { ...data, type: "assetBased", expectedDate: time };
        await updateRequiredPO(selectedRPO.id, data);
        Toast("updated successfully", "success");
        setRefresh((p: number) => p + 1);
        onClose();
      } else {
        let time = new Date(data.expectedDate).getTime();
        data = { ...data, type: "assetBased", expectedDate: time };
        await createRequiredPurchasePO(data);
        Toast("created successfully", "success");
        setRefresh((p: number) => p + 1);
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async () => {
    Confirm({
      onConfirm: async () => {
        try {
          if (selectedRPO) {
            await deleteRequiredPO(selectedRPO.id);
            Toast("Deleted successfully", "success");
            setRefresh((p: number) => p + 1);
            onClose();
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  return (
    <>
      {selectedRPO && <AddPOModal open={addPo} onClose={() => setAddPO(false)} selectedRPO={selectedRPO} />}
      <Dialog open={open} onClose={onClose} title="Add New Required PO">
        <Formik initialValues={selectedRPO ? selectedRPO : ({} as IRequiredPO)} onSubmit={handleSubmit}>
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
              <Box display={"flex"} justifyContent="center" mt={5} width="100%" gridGap={"10px"}>
                <Button type="submit" kind={selectedRPO ? "edit" : "add"}>
                  {selectedRPO ? "save" : "Submit"}
                </Button>
                {selectedRPO && (
                  <Button kind={"delete"} onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </Box>
              {selectedRPO && (
                <Box mt={5}>
                  <Button
                    kind={"add"}
                    onClick={() => {
                      setAddPO(true);
                    }}
                    style={{ width: "100%" }}
                  >
                    release a po with this item
                  </Button>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
