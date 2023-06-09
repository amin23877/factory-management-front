import React, { useState } from "react";
import { Box, Tab, Tabs, useMediaQuery } from "@material-ui/core";

import { BasePaper } from "app/Paper";
import GroupLineItemTable from "components/GroupLineItemTable";

import General from "../Forms/General";
import Entities from "../../SO/Forms/Entities";
import Addresses from "../Forms/Addresses";
import Status from "../Forms/Status";
import Metrics from "../Forms/Metrics";

export default function GeneralStep({
  values,
  getFieldProps,
  setFieldValue,
  handleChange,
  handleBlur,
}: {
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  setFieldValue: any;
  getFieldProps: any;
  values: any;
}) {
  const phone = useMediaQuery("(max-width:900px)");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box display="grid" gridGap={10} gridTemplateColumns={phone ? "1fr" : "1fr 1fr"} height={phone ? "auto" : "100%"}>
      <Box display="flex" flexDirection="column" height="100%" gridGap={10}>
        <BasePaper>
          <General values={values} setFieldValue={setFieldValue} getFieldProps={getFieldProps} />
        </BasePaper>
        <BasePaper style={{ height: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={(e, nv) => setActiveTab(nv)}
            variant="scrollable"
            style={{ maxWidth: 500 }}
            textColor="primary"
          >
            <Tab label="Entities" />
            <Tab label="Addresses" />
            <Tab label="Status" />
            <Tab label="Metrics" />
          </Tabs>
          {activeTab === 0 && (
            <Entities
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
              add
            />
          )}
          {activeTab === 1 && <Addresses getFieldProps={getFieldProps} add />}
          {activeTab === 2 && <Status getFieldProps={getFieldProps} add />}
          {activeTab === 3 && <Metrics values={values} getFieldProps={getFieldProps} add />}
        </BasePaper>
      </Box>
      <div>
        <GroupLineItemTable groups={values.lines} setGroups={(g) => setFieldValue("lines", g)} />
      </div>
    </Box>
  );
}
