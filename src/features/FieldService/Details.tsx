import React from "react";
import { Box, useMediaQuery } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "../../app/Button";
import FieldServiceForm from "./Forms";
import BaseDataGrid from "../../app/BaseDataGrid";
import { BasePaper } from "../../app/Paper";

import { IFieldService, updateFieldService } from "../../api/fieldService";
import Toast from "../../app/Toast";
import Confirm from "common/Confirm";
import { convertToItem } from "api/items";

let schema = Yup.object().shape({
  name: Yup.string().required(),
  retailPrice: Yup.number().required(),
  no: Yup.string().required(),
  ServiceCategoryId: Yup.string().required(),
  ServiceClassId: Yup.string().required(),
});

export default function FieldServiceDetails({
  selectedFieldService,
  setIndexActiveTab,
  setSelectedFieldService,
}: {
  selectedFieldService: IFieldService;
  setSelectedFieldService: (fs: IFieldService | null) => void;
  setIndexActiveTab: (t: number) => void;
}) {
  const phone = useMediaQuery("(max-width:900px)");

  const handleSubmit = async (d: any) => {
    try {
      if (selectedFieldService.id) {
        const resp = await updateFieldService(selectedFieldService.id, d);
        if (resp) {
          Toast("Updated successfully !!!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConvertToItem = async () => {
    try {
      Confirm({
        text: "You are going to convert this service to Item",
        onConfirm: async () => {
          try {
            if (selectedFieldService.id) {
              await convertToItem(selectedFieldService.id);
              setSelectedFieldService(null);
              setIndexActiveTab(0);
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" style={{ gap: 5 }} flex={1} flexDirection={phone ? "column" : "row"}>
      <BasePaper style={{ flex: 1 }}>
        <Formik initialValues={selectedFieldService} onSubmit={handleSubmit} validationSchema={schema}>
          {({ values, handleBlur, handleChange, errors }) => (
            <Form>
              <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                <FieldServiceForm values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
                <Button type="submit" kind="edit">
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Button onClick={handleConvertToItem} kind="add" fullWidth style={{ marginTop: 10 }}>
          Convert To Item
        </Button>
      </BasePaper>
      <BasePaper style={{ flex: 2 }}>
        <BaseDataGrid cols={[]} rows={[]} onRowSelected={() => {}} />
      </BasePaper>
    </Box>
  );
}
