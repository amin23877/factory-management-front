import React, { useState } from "react";
import { Box, LinearProgress, useMediaQuery } from "@material-ui/core";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";

import { BasePaper } from "app/Paper";

import { General } from "features/Items/Forms";

import Parts from "features/BOM/Parts";

import { IItem, updateAnItem } from "api/items";
import { IBom } from "api/bom";

import { getModifiedValues } from "logic/utils";
// import Confirm from "common/Confirm";
import Toast from "app/Toast";

import { useHistory, useParams } from "react-router-dom";
import { LockProvider } from "common/Lock";
import FormTabs from "features/Items/FormTabs";
import DataGridTabs from "features/Items/DataGridTabs";
import DeleteConfirm from "common/DeleteConfirm";

function ItemsDetails({
  deleteConfirm,
  onCloseDeleteConfirm,
}: {
  deleteConfirm: boolean;
  onCloseDeleteConfirm: () => void;
}) {
  const history = useHistory();
  const { itemId } = useParams<{ itemId: string }>();
  const { data: selectedRow } = useSWR<IItem>(itemId ? `/item/${itemId}` : null);

  const { data: boms, mutate: mutateBoms } = useSWR<{ result: IBom[]; total: number }>(
    selectedRow && selectedRow.id ? `/bom?ItemId=${selectedRow.id}` : null
  );

  const [bomPartsModal, setBomPartsModal] = useState(false);
  const [selectedBom] = useState<IBom>();
  const phone = useMediaQuery("(max-width:900px)");

  const handleSubmit = async (data: any, { setSubmitting }: any) => {
    try {
      if (selectedRow && selectedRow.id) {
        const reqData = getModifiedValues(data, selectedRow);

        const resp = await updateAnItem(selectedRow.id, reqData);
        if (resp) {
          setSubmitting(false);
          mutate("/item?device=false");

          Toast("Record updated successfully", "success");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedRow) {
    return <LinearProgress />;
  }

  return (
    <>
      <DeleteConfirm
        url={`/item/${itemId}`}
        open={deleteConfirm}
        onClose={() => onCloseDeleteConfirm()}
        onDone={() => history.push("/panel/inventory/items")}
      />
      {selectedBom && <Parts open={bomPartsModal} onClose={() => setBomPartsModal(false)} bom={selectedBom} />}
      <Formik initialValues={selectedRow} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, getFieldProps }) => (
          <Form style={{ flex: 1, display: "flex" }}>
            <Box
              display="grid"
              gridTemplateColumns={phone ? "1fr" : "1fr 2fr"}
              gridTemplateRows={phone ? "" : "1fr"}
              gridGap={10}
              flex={1}
            >
              <Box display="flex" flexDirection="column" gridGap={5} height={phone ? "" : "100%"}>
                <BasePaper>
                  <General
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <input type="submit" hidden />
                </BasePaper>
                <BasePaper style={{ flex: 1 }}>
                  <LockProvider>
                    <FormTabs
                      boms={boms}
                      values={values}
                      selectedRow={selectedRow}
                      getFieldProps={getFieldProps}
                      setFieldValue={setFieldValue}
                    />
                  </LockProvider>
                </BasePaper>
              </Box>
              <BasePaper style={{ height: "100%" }}>
                <LockProvider>
                  <DataGridTabs boms={boms} values={values} selectedRow={selectedRow} mutateBoms={mutateBoms} />
                </LockProvider>
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ItemsDetails;
