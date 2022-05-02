import React, { useMemo, useState, Fragment } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { Formik, Form } from "formik";
import useSWR, { mutate } from "swr";
import * as Yup from "yup";

import QRCode from "./QRCode";
import { General, UnitInfo } from "./Forms";
import UnitWorkFlow, { ProductionWorkFlow } from "./WorkFlows";

import DocumentTab from "common/Document/Tab";
import Confirm from "../../../Modals/Confirm";
// import { host } from "host";
import Button from "app/Button";
import { BasePaper } from "app/Paper";
import BaseDataGrid from "app/BaseDataGrid";
import UploadButton from "app/UploadButton";
import Toast from "app/Toast";

import { IUnit, updateUnit } from "api/units";
import { deleteOption, IOption } from "api/options";
import { addImage, deleteImage } from "api/units";

import { getModifiedValues } from "logic/utils";
import { formatTimestampToDate } from "logic/date";
import JobRecordsTable from "common/JobRecords/Table";

const schema = Yup.object().shape({
  // laborCost: Yup.number().required(),
  // status: Yup.string().required(),
  // dueDate: Yup.string().required(),
  // assignee: Yup.string().required(),
});

function getUnitWorkflowStep(status: string) {
  const steps = [
    "Quote",
    "Sales Order",
    "Engineering",
    "Purchasing",
    "Manufacturing",
    "Evaluation",
    "Test",
    "Shipped",
    "Accounting",
  ];

  return steps.findIndex((s) => s === status);
}

function Details({ unit }: { unit: IUnit }) {
  const phone = useMediaQuery("(max-width:900px)");

  const handleSubmit = async (data: any) => {
    try {
      if (unit?.id) {
        await updateUnit(unit.id, getModifiedValues(data, unit));
        await mutate("/unit");
        Toast("Unit updated", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [infoActiveTab, setInfoActiveTab] = useState(2);
  const [gridActiveTab, setGridActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState<IOption>();
  const [confirm, setConfirm] = useState(false);
  const [addOption, setAddOption] = useState(false);
  const [img, setImg] = useState<any>();
  // const { data: photo } = useSWR(`/unit/${unit.id}`);

  const handleFileChange = async (e: any) => {
    if (unit.id) {
      if (!(e.target.files || e.target.files[0])) {
        return;
      }
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      const resp = await addImage(unit.id, file);
      if (resp) {
        setImg(url);
        mutate(`/unit/${unit.id}`);
      }
    }
  };
  const handleFileDelete = async (url: string) => {
    if (unit.id) {
      const data = { url: url };
      const resp = await deleteImage(unit.id, data);
      if (resp) {
        mutate(`/unit/${unit.id}`);
      }
    }
  };
  const handleDeleteOption = async () => {
    try {
      if (selectedOption) {
        const resp = await deleteOption(unit.id, selectedOption.ItemId.id);
        if (resp) {
          Toast("Unit updated", "success");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { data: warranties } = useSWR(
    gridActiveTab === 0
      ? unit && unit?.ItemId
        ? `/service?ItemId=${unit?.ItemId}&ServiceFamilyId=60efd0bcca0feadc84be6618`
        : null
      : null
  );

  const warCols = useMemo<GridColumns>(
    () => [
      {
        field: "createdAt",
        headerName: "Date",
        valueFormatter: ({ row }) => formatTimestampToDate(row.createdAt),
        width: 120,
      },
      { field: "no", headerName: "Warranty Number", width: 160 },
      { field: "name", headerName: "Name", width: 160 },
      { field: "class", headerName: "Class", width: 160 },
      { field: "type", headerName: "Type", width: 160 },
      { field: "description", headerName: "Note", flex: 1 },
      { field: "term", headerName: "Term", flex: 1 },
      { field: "status", headerName: "Status", width: 150 },
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

  return (
    <>
      <Confirm open={confirm} onClose={() => setConfirm(false)} onConfirm={handleDeleteOption} />
      <Formik initialValues={unit as IUnit} validationSchema={schema} onSubmit={handleSubmit}>
        {({ values, errors, handleChange, handleBlur, isSubmitting, setFieldValue, touched }) => (
          <Form>
            <Box mb={2} display="grid" gridTemplateColumns={phone ? "1fr" : "1fr 1fr 1fr"} gridGap={10}>
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
              <BasePaper style={phone ? {} : { gridColumnEnd: "span 2" }}>
                <Tabs
                  value={infoActiveTab}
                  onChange={(e, nv) => setInfoActiveTab(nv)}
                  variant="scrollable"
                  style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
                  scrollButtons={phone ? "on" : "auto"}
                >
                  <Tab label="Image" />
                  <Tab label="QR Code" />
                  <Tab label="Unit Info" />
                  <Tab label="Options" />
                  <Tab label="Battery Info" />
                  {/* <Tab label="Service QR Code" /> */}
                </Tabs>
                {infoActiveTab === 0 && (
                  <Box
                    mt={1}
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    gridGap={10}
                  >
                    {/* {unit?.ItemId?.photo && (
                      <img
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: 400,
                          margin: "0px auto",
                        }}
                        alt=""
                        src={`http://${host}${unit?.ItemId?.photo}`}
                      />
                    )} */}
                  </Box>
                )}
                {infoActiveTab === 1 && <QRCode unit={unit} />}
                {infoActiveTab === 2 && (
                  <UnitInfo
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {infoActiveTab === 3 && (
                  <Fragment>
                    <Button kind="add" onClick={() => setAddOption(true)}>
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
                    <BaseDataGrid rows={[]} cols={optionCols} onRowSelected={() => {}} height={200} />
                  </Fragment>
                )}
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
      {!phone && (
        <>
          <BasePaper style={{ marginBottom: "10px" }}>
            <h1 style={{ marginLeft: "3em" }}>Unit Work Flow</h1>
            <UnitWorkFlow step={getUnitWorkflowStep(unit.status)} />
          </BasePaper>
        </>
      )}
      <ProductionWorkFlow unitId={unit.id} stepper={unit.status} />
      <BasePaper>
        <Tabs
          value={gridActiveTab}
          onChange={(e, nv) => setGridActiveTab(nv)}
          textColor="primary"
          variant="scrollable"
          style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: "10px" } : { marginBottom: "10px" }}
          scrollButtons={phone ? "on" : "auto"}
        >
          <Tab label="Warranties" />
          <Tab label="Documents" />
          <Tab label="JOB" />
          <Tab label="Photos" />
          <Tab label="Wire List" />
          <Tab label="Forms" />
          <Tab label="Time logs" />
        </Tabs>

        {gridActiveTab === 0 && (
          <Box>
            <BaseDataGrid cols={warCols} rows={warranties?.result || []} onRowSelected={(d) => {}} />
          </Box>
        )}
        {gridActiveTab === 1 && <DocumentTab itemId={unit.id} model="unit" />}
        {gridActiveTab === 2 && (
          <JobRecordsTable unit={unit} />
          // <BaseDataGrid
          //   getRowClassName={({ row }) => {
          //     if (row?.parent && row?.parent?.no !== unit?.ItemId?.no) {
          //       return "nested";
          //     }
          //     return "";
          //   }}
          //   cols={jobRecordsCols}
          //   rows={sortedJobRecords ? sortedJobRecords.map((j, i) => ({ ...j, id: i })) : []}
          //   onRowSelected={(r) => {
          //     phone
          //       ? history.push(`/panel/inventory/${unit?.ItemId?.id}`)
          //       : openRequestedSinglePopup({ url: `/panel/inventory/${unit?.ItemId?.id}` });
          //   }}
          // />
        )}
        {gridActiveTab === 3 && (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <UploadButton onChange={handleFileChange} accept="image/*" />
            </div>
            <div>
              {/* {photo &&
                photo.photo[0] &&
                photo.photo.map((url: string) => (
                  <>
                    <img
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: 400,
                        margin: "0px auto",
                      }}
                      alt=""
                      src={`http://${host}${url}`}
                    />
                    <Button kind="delete" onClick={() => handleFileDelete(url)}>
                      delete
                    </Button>
                  </>
                ))} */}
            </div>
          </>
        )}
      </BasePaper>
    </>
  );
}

export default Details;
