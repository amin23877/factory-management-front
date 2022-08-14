import React, { useMemo, useState } from "react";
import { Box, Tabs, Tab, LinearProgress } from "@material-ui/core";
import { GridColDef, GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";
import useSWR from "swr";

import { General, UnitInfo, Warranty, BatteryInfo } from "../../../../features/Production/Dashboard/ServiceList/Forms";
import UnitWorkFlow, { ProductionWorkFlow } from "../../../../features/Production/Dashboard/UnitList/WorkFlows";

import Button from "app/Button";
import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";
import Toast from "app/Toast";

import Confirm from "../../../../features/Modals/Confirm";
import DocumentTab from "common/Document/Tab";

import { getModifiedValues } from "logic/utils";

// import { addOption, deleteOption, IOption } from "api/options";
// import { IUnit, updateUnit } from "api/units";
import { deleteOption, IOption } from "api/options";
import { ITicket, updateTicket } from "api/ticket";
import { useParams } from "react-router-dom";

const schema = Yup.object().shape({});

function ServiceDetails() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { data: ticket } = useSWR<ITicket>(serviceId ? `/ticket/${serviceId}` : null);

  const handleSubmit = async (data: any) => {
    try {
      if (serviceId) {
        await updateTicket(serviceId, getModifiedValues(data, ticket));

        await mutate("/ticket");
        Toast("Updated successfully.", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [infoActiveTab, setInfoActiveTab] = useState(0);
  const [gridActiveTab, setGridActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [confirm, setConfirm] = useState(false);

  const handleDeleteOption = async () => {
    try {
      if (selectedOption && ticket?.ItemId?.id) {
        const resp = await deleteOption(ticket?.ItemId?.id, selectedOption?.ItemId?.id);
        if (resp) {
          Toast("Unit updated", "success");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { data: unitBoms } = useSWR(ticket?.ItemId ? `/ubom?UnitId=${ticket?.ItemId?.id}` : null);

  const bomCols = useMemo<GridColDef[]>(
    () => [
      { field: "Line", width: 80 },
      { field: "Component", width: 180 },
      { field: "Component Name", width: 180 },
      { field: "Component Location", flex: 1 },
      { field: "UM", width: 120 },
      { field: "QTY", width: 120 },
      { field: "Note", width: 200 },
    ],
    []
  );

  const optionCols = useMemo<GridColumns>(
    () => [
      { field: "Option Number", valueFormatter: (params) => params.row?.ItemId?.no, flex: 1 },
      { field: "Option Name", valueFormatter: (params) => params.row?.ItemId?.name, flex: 1 },
      { field: "Option Description", valueFormatter: (params) => params.row?.ItemId?.description, flex: 1 },
      { field: "quantity", headerName: "Quantity", width: 100 },
    ],
    []
  );
  if (!ticket) {
    return <LinearProgress />;
  }

  return (
    <BasePaper>
      <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDeleteOption} />
      <Formik initialValues={ticket} validationSchema={schema} onSubmit={handleSubmit}>
        {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
          <Form>
            <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={10}>
              <BasePaper>
                <General
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
                <Box textAlign="center" my={1}>
                  <Button disabled={isSubmitting} kind="add" type="submit">
                    Save
                  </Button>
                </Box>
              </BasePaper>
              <BasePaper style={{ gridColumnEnd: "span 2" }}>
                <Tabs
                  value={infoActiveTab}
                  onChange={(e, nv) => setInfoActiveTab(nv)}
                  style={{ marginBottom: "0.5em" }}
                >
                  <Tab label="Unit Info" />
                  <Tab label="Options" />
                  <Tab label="Battery Info" />
                  <Tab label="Warranty Info" />
                </Tabs>
                {infoActiveTab === 0 && (
                  <UnitInfo
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {infoActiveTab === 1 && (
                  <>
                    <Button kind="add" onClick={() => {}}>
                      add Option
                    </Button>
                    <Button
                      kind="delete"
                      onClick={() => setConfirm(true)}
                      disabled={!selectedOption}
                      style={{ margin: "0 0.5em" }}
                    >
                      Delete Option
                    </Button>
                    <Box mb={1}>
                      <BaseDataGrid rows={[]} cols={optionCols} onRowSelected={() => {}} height={280} />
                    </Box>
                  </>
                )}
                {infoActiveTab === 2 && (
                  <BatteryInfo
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {infoActiveTab === 3 && (
                  <Warranty
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
      <h1 style={{ marginLeft: "3em" }}>Unit Work Flow</h1>
      <UnitWorkFlow />
      <ProductionWorkFlow unitId={ticket?.ItemId?.id} stepper={ticket?.productionStatus} />
      <BasePaper>
        <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
          <Tab label="Documents" />
          <Tab label="JOB" />
          <Tab label="Wire List" />
          <Tab label="Forms" />
          <Tab label="Time logs" />
        </Tabs>
        {gridActiveTab === 0 && <DocumentTab itemId={serviceId} model="ticket" />}
        {gridActiveTab === 1 && (
          <BaseDataGrid
            cols={bomCols}
            rows={unitBoms || []}
            onRowSelected={(r) => {
              setSelectedOption(r);
            }}
          />
        )}
      </BasePaper>
    </BasePaper>
  );
}

export default ServiceDetails;
