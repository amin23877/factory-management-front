import React, { useMemo } from "react";
import { Box, Tooltip } from "@material-ui/core";

import NewDataGrid from "app/NewDataGrid";
import { clusterType } from "api/cluster";

import { IVals } from "./Modal";

const ValidValuesDataGrid = React.memo(
  ({
    cluster,
    refresh,
    setSelectedLevel,
    setValues,
  }: {
    cluster?: clusterType;
    refresh: number;
    setValues: (v: any) => void;
    setSelectedLevel: any;
  }) => {
    const cols = useMemo(
      () => [
        {
          name: "name",
          flex: 1,
          render: ({ data }: any) => (
            <Tooltip title={data.name.split("__")[0]}>
              <span>{data.name.split("__")[0]}</span>
            </Tooltip>
          ),
        },
        {
          name: "clusterValueRef",
          flex: 1,
          header: "Cluster Value",
          render: ({ data }: any) => (
            <Tooltip title={data?.clusterId?.clusterValue}>
              <span>{data?.clusterId?.clusterValue}</span>
            </Tooltip>
          ),
        },
        {
          name: "valid",
          header: "Valid Values",
          flex: 1,
          render: ({ data }: any) => {
            let temp = data.valid;
            temp = temp.map((val: IVals) => val.value + " " + val.uom);
            return (
              <Tooltip title={temp.join(",")}>
                <span>{temp.join(",")}</span>
              </Tooltip>
            );
          },
        },
      ],
      []
    );

    return (
      <NewDataGrid
        columns={cols}
        url="/level"
        initParams={{ clusterId: cluster?.id }}
        style={{ height: 450 }}
        refresh={refresh}
        onRowSelected={(r) => {
          setSelectedLevel(r);
          setValues(r);
        }}
      />
    );
  }
);

export default ValidValuesDataGrid;
