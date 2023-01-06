import React from "react";
import { Box, CircularProgress, Divider } from "@material-ui/core";

import TextField from "app/TextField";
import { useLock } from "common/Lock";
import AsyncCombo from "common/AsyncCombo";
import useSWR from "swr";
import { ILevel } from "api/level";
import { Autocomplete } from "@material-ui/lab";

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
        getOptionLabel={(o) => o?.clusterValue || ""}
        getOptionSelected={(o, v) => o?.id === v?.id}
        defaultParams={{ ...(values?.class && { class: values?.class }) }}
        url="/cluster"
        disabled={lock}
        label="Cluster Value"
        onChange={(e, nv) => setFieldValue("clusterId", nv?.id)}
        value={values.clusterId}
      />
      <Divider style={{ gridColumnEnd: "span 2" }} />
      {levels &&
        levels?.result.map((level) => (
          <Autocomplete
            options={level.valid}
            getOptionLabel={(o) => (o.uom ? String(o.value) + " " + o.uom : String(o.value) || "")}
            value={values[level.name] || (values?.levels?.[level?.name] ? { value: values?.levels[level.name] } : null)}
            onChange={(e, nv) => setFieldValue(level.name, nv)}
            renderInput={(p) => <TextField label={level.name} {...p} />}
            disabled={lock}
          />
        ))}
    </Box>
  );
}

export function UnitsLevelsTab({
  values,
  getFieldProps,
  setFieldValue,
}: {
  values: any;
  getFieldProps: any;
  setFieldValue: any;
}) {
  const { data: item } = useSWR<any>(`/item/${values?.ItemId?.id}`);
  const clusterIdString = item?.clusterId
    ? typeof item?.clusterId === "string"
      ? item?.clusterId
      : item?.clusterId?.id
    : null;
  const { data: levels } = useSWR<{ result: ILevel[]; total: number }>(
    clusterIdString ? `/level?clusterId=${clusterIdString}` : null
  );
  if (!item) return <CircularProgress />;

  return (
    <Box mt={1} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
      <AsyncCombo
        filterBy="clusterValue"
        getOptionLabel={(o) => o?.clusterValue || "No-Name"}
        getOptionSelected={(o, v) => o?.id === v?.id}
        url={`/cluster`}
        disabled
        label="Cluster Value"
        onChange={(e, nv) => setFieldValue("clusterId", nv?.id)}
        value={item?.clusterId}
      />
      <Divider style={{ gridColumnEnd: "span 2" }} />
      {levels &&
        levels?.result.map((level) => (
          <TextField
            label={level.name}
            name={level.name}
            placeholder={level.name}
            defaultValue={item?.levels ? item?.levels[level.name] : ""}
            value={item[level.name]}
            {...getFieldProps(level.name)}
            disabled
          />
        ))}
    </Box>
  );
}
