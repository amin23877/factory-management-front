import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper, Tooltip } from "@material-ui/core";

import { convertRequiredPO, IRequiredPO } from "api/purchasePO";

import Dialog from "app/Dialog";
import NewDataGrid from "app/NewDataGrid";
import Button from "app/Button";
import TableForm from "./TableForm";
import { Form, Formik } from "formik";
import LinkField from "app/Inputs/LinkFields";
import { DateTimePicker } from "@material-ui/pickers";
import Toast from "app/Toast";

const columns = [
  { name: "no", header: "NO.", width: 120 },
  { name: "so", header: "Related SO", width: 120, render: ({ data }: any) => data?.SOId?.number },
  { name: "unit", header: "Related Unit", width: 120, render: ({ data }: any) => data?.UnitId?.number },
  { name: "itemNo", header: "Item NO.", type: "string", width: 120, render: ({ data }: any) => data?.ItemId?.no },
  {
    name: "itemNo",
    header: "Item Name",
    type: "string",
    width: 120,
    render: ({ data }: any) => (
      <Tooltip title={data?.ItemId?.name}>
        <span>{data?.ItemId?.name}</span>
      </Tooltip>
    ),
    defaultFlex: 1,
  },
  { name: "qty", header: "QTY", width: 80, type: "number" },
  { name: "expectedDate", header: "Expected Date", width: 120, type: "date" },
  { name: "type", header: "Type", width: 120 },
];

export default function AddPOModal({
  open,
  onClose,
  selectedRPO,
}: {
  open: boolean;
  onClose: () => void;
  selectedRPO: IRequiredPO;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (values: any) => {
    try {
      let lines = selectedItems.map((i: any) => ({
        ...i,
        requiredPoId: i.id,
        cost: i.cost ? i.cost : i.ItemId.totalCost,
        tax: i.tax ? i.tax : false,
      }));
      let vendorETA = new Date(values.vendorETA).getTime();
      await convertRequiredPO({ ...values, vendorETA, lines });
      Toast("PO Added Successfully", "success");
      setSelectedItems([]);
      setActiveStep(0);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} title="Add New PO Based On A Requirement" maxWidth="md" fullWidth>
        <Formik initialValues={{ VendorId: "", vendorETA: 0 }} onSubmit={handleSubmit}>
          {({ getFieldProps, values, setFieldValue }) => (
            <Form>
              <Stepper activeStep={activeStep}>
                <Step>
                  <StepLabel>Choose Related Requirements</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Adjust</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Finalize</StepLabel>
                </Step>
              </Stepper>
              {activeStep === 0 && (
                <NewDataGrid
                  checkboxColumn
                  onSelectionChange={(d) => {
                    if (d.selected) {
                      setSelectedItems(Object.values(d.selected));
                    }
                  }}
                  columns={columns}
                  url="/requiredPo"
                  onRowSelected={() => {}}
                  setUrlFilters
                  style={{ minHeight: "calc(100vh - 300px)" }}
                  initParams={
                    selectedRPO.type === "SOBased" && selectedRPO.SOId?.id
                      ? {
                          SOId: selectedRPO.SOId?.id,
                        }
                      : {
                          type: selectedRPO.type,
                        }
                  }
                />
              )}
              {activeStep === 1 && <TableForm selectedItems={selectedItems} />}
              {activeStep === 2 && (
                <Box
                  display="grid"
                  gridTemplateColumns={"1fr"}
                  gridGap={"10px"}
                  width="50%"
                  style={{ margin: "10px auto" }}
                >
                  <LinkField
                    value={values.VendorId}
                    choseItem={values.VendorId}
                    label="Vendor"
                    path="/vendor"
                    filterLabel="name"
                    getOptionList={(resp) => resp?.result}
                    getOptionLabel={(item) => item?.name || "No-Number"}
                    getOptionValue={(item) => item?.id}
                    onChange={(e, nv) => {
                      setFieldValue("VendorId", nv.id);
                    }}
                    url="/panel/purchase/vendor"
                  />
                  <DateTimePicker
                    value={values.vendorETA}
                    name="vendorETA"
                    label="Vendor E.T.A."
                    onChange={(vendorETA) => setFieldValue("vendorETA", vendorETA)}
                    required
                  />
                  <Button type="submit" kind="add">
                    Submit
                  </Button>
                </Box>
              )}
              <Box display="flex" alignItems="center" justifyContent="space-between" margin="10px auto" width="50%">
                <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 2}>
                  Next
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
