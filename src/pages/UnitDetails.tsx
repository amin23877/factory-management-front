import React, { useMemo, useState } from "react";
import { Box, Typography, Tabs, Tab, LinearProgress } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import QRCode from "../features/Production/Dashboard/UnitList/QRCode";
import UnitInfo from "../features/Production/Dashboard/UnitList/UnitInfo";
import { General as ItemGeneral } from "../features/Items/Forms";
import { GeneralForm as SOGeneral } from "../features/Sales/SO/Forms";

import { BasePaper } from "../app/Paper";
import BaseDataGrid from "../app/BaseDataGrid";

import { IUnit } from "../api/units";

export default function UnitDetails() {
  const { unitNumber } = useParams<{ unitNumber: string }>();

  const { data: unit } = useSWR<{ result: IUnit[]; total: number }>(
    unitNumber ? `/unit?serialNumber=${unitNumber}` : null
  );
  const { data: unitBoms } = useSWR(
    unit && unit.result && unit.result.length > 0 ? `/ubom?UnitId=${unit.result[0].id}` : null
  );

  const [infoActiveTab, setInfoActiveTab] = useState(0);
  const [gridActiveTab, setGridActiveTab] = useState(0);

  const bomCols = useMemo<GridColDef[]>(
    () => [
      { field: "number", headerName: "Serial No." },
      { field: "laborCost", headerName: "Labor Cost" },
      { field: "dueDate", headerName: "Due Date", flex: 1 },
      { field: "status", headerName: "Status" },
    ],
    []
  );

  if (!(unit && unit.result && unit.result.length > 0)) {
    return <LinearProgress />;
  }

  return (
    // <Container>
    <>
      <Box mb={2} display="grid" gridTemplateColumns="1fr 1fr" gridGap={10}>
        <BasePaper>
          <Typography variant="h5">Unit Info</Typography>
          <UnitInfo unit={unit.result[0]} />
        </BasePaper>
        <BasePaper>
          <Tabs value={infoActiveTab} onChange={(e, nv) => setInfoActiveTab(nv)}>
            <Tab label="Item" />
            <Tab label="SO" disabled={!unit.result[0].SOId} />
            <Tab label="QR Code" />
          </Tabs>
          {infoActiveTab === 0 && (
            <ItemGeneral
              values={unit.result[0].ItemId}
              errors={{}}
              touched={{}}
              handleBlur={() => {}}
              handleChange={() => {}}
              setFieldValue={() => {}}
            />
          )}
          {infoActiveTab === 1 && (
            <SOGeneral
              setFieldValue={() => {}}
              values={unit.result[0].SOId}
              onChangeInit={() => {}}
              handleBlur={() => {}}
              handleChange={() => {}}
            />
          )}
          {infoActiveTab === 2 && <QRCode unit={unit.result[0]} />}
        </BasePaper>
      </Box>
      <BasePaper>
        <Tabs value={gridActiveTab} onChange={(e, nv) => setGridActiveTab(nv)}>
          <Tab label="Warranties" />
          <Tab label="Documents" />
          <Tab label="Notes" />
          <Tab label="BOM" />
          <Tab label="QC Items" />
          <Tab label="Field service" />
          <Tab label="Time logs" />
          <Tab label="Auditing" />
        </Tabs>
        {gridActiveTab === 3 && <BaseDataGrid cols={bomCols} rows={unitBoms || []} onRowSelected={() => {}} />}
      </BasePaper>
    </>
    // </Container>
  );
}
