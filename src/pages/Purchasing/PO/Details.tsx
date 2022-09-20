import React from "react";
import { LinearProgress, useMediaQuery } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import useSWR, { mutate } from "swr";
import { Formik } from "formik";

import { UpdateForm } from "features/Purchase/PO/Forms";
import { BasePaper } from "app/Paper";
import Toast from "app/Toast";

import { updatePurchasePO, IPurchasePO } from "api/purchasePO";

import { getModifiedValues } from "logic/utils";

import { LockButton, LockProvider } from "common/Lock";
import { useParams } from "react-router-dom";
import FormTabs from "features/Purchase/PO/FormTabs";
import DataGridTabs from "features/Purchase/PO/DataGridTabs";

export default function Details({ onDone }: { onDone?: () => void }) {
  const phone = useMediaQuery("(max-width:900px)");

  const { poId } = useParams<{ poId: string }>();
  const { data: selectedPO } = useSWR<IPurchasePO>(poId ? `/po/${poId}` : null);

  const handleSubmit = async (d: any) => {
    try {
      if (poId && d.status) {
        await updatePurchasePO(poId, getModifiedValues(d, selectedPO));
        Toast("Purchase Order updated.", "success");
        mutate("/po");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedPO) {
    return <LinearProgress />;
  }

  return (
    <>
      <Box display="grid" gridTemplateColumns={phone ? "1fr" : "3fr 4fr"} gridGap={10}>
        <Formik initialValues={selectedPO} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur, errors, setFieldValue }) => (
            <Box display="flex" flexDirection="column" height={phone ? "" : "100%"} gridGap={10}>
              <Box>
                <BasePaper>
                  <UpdateForm values={values} errors={errors} handleBlur={handleBlur} handleChange={handleChange} />
                  <Box display="flex" width="100%" justifyContent="center" alignItems="center" mt={1}>
                    <LockButton />
                  </Box>
                </BasePaper>
              </Box>
              <BasePaper style={{ flex: 1 }}>
                <LockProvider>
                  <FormTabs
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </LockProvider>
              </BasePaper>
            </Box>
          )}
        </Formik>
        <BasePaper style={{ height: "100%" }}>
          <LockProvider>
            <DataGridTabs selectedPO={selectedPO} />
          </LockProvider>
        </BasePaper>
      </Box>
    </>
  );
}
