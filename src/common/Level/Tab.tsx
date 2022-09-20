import React from "react";
import { Box, Divider } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";
import AsyncCombo from "common/AsyncCombo";
import useSWR from "swr";
import { ILevel } from "api/level";

export default function LevelsTab({
  itemType,
  values,
  getFieldProps,
  setFieldValue,
}: {
  values: any;
  getFieldProps: any;
  setFieldValue: any;
  itemType: string;
}) {
  const { lock } = useLock();
  const clusterIdString = values?.clusterId
    ? typeof values?.clusterId === "string"
      ? values?.clusterId
      : values?.clusterId?.id
    : null;
  const { data: levels } = useSWR<{ result: ILevel[]; total: number }>(
    clusterIdString ? `/level?clusterId=${clusterIdString}` : null
  );

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <AsyncCombo
        filterBy="clusterValue"
        getOptionLabel={(o) => o?.clusterValue || "No-Name"}
        getOptionSelected={(o, v) => o?.id === v?.id}
        url={`/cluster`}
        disabled={lock}
        label="Cluster Value"
        onChange={(e, nv) => setFieldValue("clusterId", nv?.id)}
        value={values.clusterId}
      />
      <Divider style={{ gridColumnEnd: "span 2" }} />
      {levels &&
        levels?.result.map((level) => (
          <TextField
            label={level.name}
            name={level.name}
            placeholder={level.name}
            defaultValue={values?.levels ? values?.levels[level.name] : ""}
            value={values[level.name]}
            {...getFieldProps(level.name)}
            disabled={lock}
          />
        ))}
    </Box>
  );
}
