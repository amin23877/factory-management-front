import React, { useMemo, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { mutate } from "swr";
import { Formik, Form } from "formik";

import ClusterForm from "./Form";
import Dialog from "app/Dialog";
import NewDataGrid from "app/NewDataGrid";
import Toast from "app/Toast";

import { clusterType, createCluster, updateCluster } from "api/cluster";
import { getModifiedValues } from "logic/utils";
import { schema } from "api/ticket";
import DataGridAction from "common/DataGridAction";
import LevelForm from "common/Level/Form";

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

  const columns = useMemo(
    () => [
      { name: "clusterValue", header: "Cluster (Model)" },
      { name: "deviceName", header: "Device Name" },
      { name: "description", header: "Description", flex: 1 },
      { name: "createdAt", header: "Date", type: "date" },
      {
        name: "actions",
        header: "",
        defaultWidth: 80,
        render: ({ data }: any) => (
          <DataGridAction
            icon="view"
            controlledLock={false}
            onClick={() => {
              setSelectedCluster(data);
              setActiveTab(1);
            }}
          />
        ),
      },
    ],
    [setSelectedCluster]
  );

  return (
    <Dialog open={open} onClose={onClose} title={activeTab === 0 ? "Cluster" : "Level"} maxWidth="lg" fullWidth>
      <Tabs value={activeTab} textColor="primary" onChange={(e, nv) => setActiveTab(nv)}>
        <Tab label="Clusters" />
        <Tab label="Levels" disabled={!selectedCluster} />
      </Tabs>
      {activeTab === 0 && (
        <Formik
          validationSchema={schema}
          initialValues={{ class: "device" } as Partial<clusterType>}
          onSubmit={handleSubmit}
        >
          {({ getFieldProps, values, setFieldValue, resetForm, setValues }) => (
            <Form>
              <Box my={2}>
                <ClusterForm
                  values={values}
                  getFieldProps={getFieldProps}
                  resetForm={resetForm}
                  setFieldValue={setFieldValue}
                  onDone={() => setRefresh((p) => p + 1)}
                />
              </Box>
              <NewDataGrid
                style={{ height: 400 }}
                url="/cluster"
                columns={columns}
                onRowSelected={(r) => setValues(r)}
                refresh={refresh}
              />
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
