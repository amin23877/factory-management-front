import React, { useState } from "react";
import { Box, Tabs, Tab } from "@material-ui/core";

import { CommissionTab, EntitiesTab, GeneralForm } from "./Forms";

import { BasePaper } from "../../../app/Paper";

export default function GeneralQuote({
  add,
  handleChange,
  handleBlur,
  values,
  setFieldValue,
}: {
  add?: boolean;
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  setFieldValue: any;
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box display="flex" flexDirection="column" height="100%" gridGap={10}>
      <BasePaper>
        <GeneralForm
          setFieldValue={setFieldValue}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
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
          <Tab label="Commission" />
        </Tabs>
        {activeTab === 0 && (
          <EntitiesTab
            setFieldValue={setFieldValue}
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        )}
        {activeTab === 1 && (
          <CommissionTab values={values} handleBlur={handleBlur} handleChange={handleChange} add={add} />
        )}
      </BasePaper>
    </Box>
  );
}
