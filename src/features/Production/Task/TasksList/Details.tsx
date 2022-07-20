import React, { useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab, Tooltip, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";

import { General } from "./Forms";

import { BasePaper } from "app/Paper";
import Toast from "app/Toast";

import DocumentTab from "common/Document/Tab";

import { getModifiedValues } from "logic/utils";

import { changeTask, ITaskList } from "api/taskList";
import { LockButton, useLock } from "common/Lock";
import AddPartModal from "./AddPartModal";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";

function ServiceDetails({ taskList }: { taskList: ITaskList }) {
  const handleSubmit = async (data: any) => {
    try {
      if (taskList.id) {
        await changeTask(taskList.id, getModifiedValues(data, taskList));
        await mutate("/task");
        Toast("Updated successfully.", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [gridActiveTab, setGridActiveTab] = useState(0);
  const [addPart, setAddPart] = useState(false);
  const [parts, setParts] = useState<any>(null);
  const [items, setItems] = useState<any>(taskList.relatedParts);
  const { lock } = useLock();
  useEffect(() => {
    if (parts) {
      const newArray = parts?.map((item: any) => item.item);
      setItems(newArray);
    }
  }, [parts]);

  useEffect(() => {
    let newArr: any[] = taskList.relatedParts.slice();
    newArr.map((i) => (i.item = i));
    setParts(newArr);
  }, [taskList.relatedParts]);

  const cols = useMemo<GridColumns>(
    () => [
      {
        headerName: "Part Name",
        field: "name",
        width: 140,
        renderCell: (p: any) => (
          <Tooltip title={String(p.value)}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>
              {String(p.value)}
            </span>
          </Tooltip>
        ),
      },
      { field: "no", headerName: "Part NO.", width: 140 },
      {
        field: "description",
        headerName: "Part Description",
        flex: 1,
      },
    ],
    []
  );

  return (
    <Box display="grid" gridTemplateColumns="1fr 2fr " gridGap={10}>
      <Formik initialValues={taskList} onSubmit={handleSubmit}>
        {({ values, errors, handleChange, handleBlur, setFieldValue, touched }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr" gridGap={10}>
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
                  <LockButton />
                </Box>
              </BasePaper>
            </Box>
          </Form>
        )}
      </Formik>
      <BasePaper>
        <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
          <Tab label="parts" />
          <Tab label="Documents" />
        </Tabs>
        {gridActiveTab === 0 && (
          <Box mt={1}>
            <Box mb={1} display="flex" justifyContent={"space-between"} width="100%">
              <Button variant="outlined" onClick={() => setAddPart(true)} disabled={lock}>
                Add / Edit Related Parts
              </Button>
            </Box>
            <AddPartModal
              open={addPart}
              onClose={() => setAddPart(false)}
              parts={parts}
              setParts={setParts}
              edit
              taskListId={taskList.id}
            />
            <BaseDataGrid rows={items || []} cols={cols} />
          </Box>
        )}
        {gridActiveTab === 1 && <DocumentTab itemId={taskList.id} model="taskList" />}
      </BasePaper>
    </Box>
  );
}

export default ServiceDetails;
