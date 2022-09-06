import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { mutate } from "swr";
import { Formik, Form } from "formik";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";

import ClusterForm from "./Form";
import Dialog from "app/Dialog";
import NewDataGrid from "app/NewDataGrid";
import Toast from "app/Toast";
import LevelForm from "common/Level/Form";
import { LockProvider, useLock } from "common/Lock";
import { ReactComponent as NarrowIcon } from "assets/icons/tableIcons/narrowDown.svg";

import { clusterType, createCluster, updateCluster } from "api/cluster";
import { getModifiedValues } from "logic/utils";

export default function ClusterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [selectedCluster, setSelectedCluster] = useState<clusterType>();

  const handleSubmit = async (data: any) => {
    try {
      if (data && data.id) {
        const modified = getModifiedValues(data, data);
        await updateCluster(data.id, modified);

        setRefresh((p) => p + 1);
        Toast("Record updated", "success");
      } else {
        await createCluster(data);

        setRefresh((p) => p + 1);
        Toast("Record created", "success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      mutate("/cluster");
    }
  };

  const { setLock } = useLock();

  const columns = useMemo(
    () => [
      {
        name: "class",
        header: "Item Type",
        defaultOperator: "eq",
        filterEditor: SelectFilter,
        filterEditorProps: {
          multiple: false,
          dataSource: [
            { id: "option", label: "Option" },
            { id: "device", label: "Device" },
            { id: "assembly", label: "Assembly" },
            { id: "part", label: "Part" },
            { id: "fru", label: "Fru" },
          ],
        },
      },
      { name: "clusterValue", header: "Cluster (Model)" },
      { name: "deviceName", header: "Device Name" },
      { name: "description", header: "Description", flex: 1 },
      { name: "createdAt", header: "Date", type: "date" },
      {
        name: "actions",
        header: "",
        defaultWidth: 80,
        render: ({ data }: any) => (
          <div
            onClick={() => {
              setSelectedCluster(data);
              setActiveTab(1);
            }}
            title="Show Levels"
            style={{ cursor: "pointer" }}
          >
            <NarrowIcon />
          </div>
        ),
      },
    ],
    [setSelectedCluster]
  );

  return (
    <Dialog open={open} onClose={onClose} title={activeTab === 0 ? "Cluster" : "Level"} maxWidth="lg" fullWidth>
      <Tabs
        value={activeTab}
        textColor="primary"
        onChange={(e, nv) => {
          setLock(true);
          setActiveTab(nv);
        }}
      >
        <Tab label="Clusters" />
        <Tab label="Levels" disabled={!selectedCluster} />
      </Tabs>
      {activeTab === 0 && (
        <Formik initialValues={{ class: "device" } as Partial<clusterType>} onSubmit={handleSubmit}>
          {({ getFieldProps, values, setFieldValue, resetForm, setValues }) => (
            <Form>
              <Box my={2}>
                <LockProvider>
                  <ClusterForm
                    values={values}
                    getFieldProps={getFieldProps}
                    resetForm={resetForm}
                    setFieldValue={setFieldValue}
                    onDone={() => setRefresh((p) => p + 1)}
                  />
                </LockProvider>
              </Box>
              <LockProvider>
                <NewDataGrid
                  style={{ height: 400 }}
                  url="/cluster"
                  columns={columns}
                  onRowSelected={(r) => setValues(r)}
                  refresh={refresh}
                />
              </LockProvider>
            </Form>
          )}
        </Formik>
      )}
      {activeTab === 1 && (
        <Box my={2}>
          <LevelForm cluster={selectedCluster} />
        </Box>
      )}
    </Dialog>
  );
}
