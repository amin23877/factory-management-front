import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Tabs, Tab, Tooltip, Button, useMediaQuery, LinearProgress } from "@material-ui/core";
import { Formik, Form } from "formik";

import { General } from "features/Production/Task/TasksList/Forms";

import { BasePaper } from "app/Paper";
import Toast from "app/Toast";

import DocumentTab from "common/Document/Tab";

import { camelCaseToRegular, getModifiedValues } from "logic/utils";

import { changeTask, ITaskList } from "api/taskList";
import { LockButton, useLock } from "common/Lock";
import AddPartModal from "features/Production/Task/TasksList/AddPartModal";
import BaseDataGrid from "app/BaseDataGrid";
import { GridColumns } from "@material-ui/data-grid";
import PhotoTab from "common/PhotoTab";
import { useHistory, useParams } from "react-router-dom";
import { openRequestedSinglePopup } from "logic/window";
import useSWR from "swr";

function ServiceDetails({ setRefresh }: { setRefresh: any }) {
  const { taskId } = useParams<{ taskId: string }>();
  const { data: taskList } = useSWR<ITaskList>(taskId ? `/task/${taskId}` : null);

  const handleSubmit = async (data: any) => {
    try {
      if (taskList?.id) {
        let newType = data.type;
        newType = newType.split(" ");
        newType[0] = newType[0].toLowerCase();
        data.type = newType.join("");
        await changeTask(taskList?.id, getModifiedValues(data, taskList));
        setRefresh((p: number) => p + 1);
        Toast("Updated successfully.", "success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [gridActiveTab, setGridActiveTab] = useState(0);
  const [moreInfoTab, setMoreInfoTab] = useState(0);

  const [addPart, setAddPart] = useState(false);
  const [parts, setParts] = useState<any>(null);
  const [items, setItems] = useState<any>(taskList?.relatedParts);

  const history = useHistory();
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();

  useEffect(() => {
    if (parts) {
      const newArray = parts?.map((item: any) => item.item);
      setItems(newArray);
    }
  }, [parts]);

  useEffect(() => {
    let newArr: any[] | undefined = taskList?.relatedParts?.slice();
    if (newArr) {
      newArr.map((i) => (i.item = i));
      setParts(newArr);
    }
  }, [taskList?.relatedParts]);

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

  const handleRowSelect = useCallback(
    (r: any) => {
      const url = `/panel/inventory/${r?.id}`;
      if (r.id && phone) {
        history.push(url);
      } else if (r.id && !phone) {
        openRequestedSinglePopup({ url });
      }
      return;
    },
    [history, phone]
  );
  if (!taskList) {
    return <LinearProgress />;
  }
  return (
    <Formik
      initialValues={{ ...taskList, type: camelCaseToRegular(taskList.type) }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, handleChange, handleBlur, setFieldValue, touched, handleSubmit }) => (
        <Form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        >
          <Box display="grid" gridTemplateColumns="1fr 2fr " gridGap={10}>
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
                <Box textAlign="center" mt={1}>
                  <LockButton />
                </Box>
              </BasePaper>
              <BasePaper>
                <Tabs
                  value={moreInfoTab}
                  variant="scrollable"
                  scrollButtons={phone ? "on" : "auto"}
                  style={phone ? { maxWidth: "calc(100vw - 63px)", marginBottom: 16 } : { marginBottom: 16 }}
                  textColor="primary"
                  onChange={(e, v) => setMoreInfoTab(v)}
                >
                  <Tab label="Image" />
                </Tabs>
                {moreInfoTab === 0 && <PhotoTab model="task" id={taskList.id} />}
              </BasePaper>
            </Box>

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
                  <BaseDataGrid rows={items || []} onRowSelected={handleRowSelect} cols={cols} />
                </Box>
              )}
              {gridActiveTab === 1 && <DocumentTab itemId={taskList.id} model="task" />}
            </BasePaper>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default ServiceDetails;
