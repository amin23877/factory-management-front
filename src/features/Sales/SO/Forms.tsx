import React, { useState, useRef } from "react";
import {
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Paper,
  makeStyles,
  useMediaQuery,
  ButtonGroup,
  Button,
} from "@material-ui/core";

// import DateTimePicker from "app/DateTimePicker";
// import { FieldSelect, ArraySelect, CacheFieldSelect } from "app/Inputs";
import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";
import { useLock, LockButton } from "common/Lock";

// import { getAllEmployees } from "api/employee";
// import { getClients } from "api/client";
// import { getProjects } from "api/project";
// import { getTickets } from "api/ticket";
import { ISOComplete } from "api/so";
import { createAModelDocument } from "api/document";

import { exportPdf } from "logic/pdf";
import { formatTimestampToDate } from "logic/date";

import SOCus from "PDFTemplates/SOCus";
import SORep from "PDFTemplates/SORep";
import SOAcc from "PDFTemplates/SOAcc";
import { LockOpenRounded } from "@material-ui/icons";
// import { getPO } from "api/po";

const useStyles = makeStyles({
  checkboxLabel: {
    fontSize: "11px",
  },
});

export const GeneralForm = ({
  handleChange,
  handleBlur,
  onChangeInit,
  values,
  setFieldValue,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  onChangeInit: (data: any) => void;
  setFieldValue: any;
}) => {
  const classes = useStyles();
  const phone = useMediaQuery("(max-width:900px)");
  const tablet = useMediaQuery("(max-width:1500px)");
  const { lock, setLock } = useLock();

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={phone ? "1fr 1fr" : tablet ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr"}
        gridColumnGap={phone ? 5 : 10}
        gridRowGap={10}
      >
        <TextField
          value={values.number}
          name="number"
          label="SO NO."
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={lock}
        />
        <AsyncCombo
          url="/quote"
          label="Quote NO."
          value={values.QuoteId}
          filterBy="number"
          getOptionLabel={(q) => q?.number}
          getOptionSelected={(o, v) => o.id === v.id}
          disabled={lock}
        />
        <TextField
          value={values.invoiceNumber}
          name="invoiceNumber"
          label={values.invoiceLabel || "Invoice"}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={lock}
        />
        <AsyncCombo
          url="/service"
          label="Warranty"
          value={values.WarrantyId}
          filterBy="name"
          getOptionLabel={(q) => q?.name}
          getOptionSelected={(o, v) => o.id === v.id}
          disabled={lock}
        />
        <TextField value={formatTimestampToDate(values.date)} name="date" label="SO Date" disabled={lock} />

        <AsyncCombo
          url="/project"
          label="Project"
          value={values.ProjectId}
          filterBy="name"
          getOptionLabel={(q) => q?.name}
          getOptionSelected={(o, v) => o.id === v.id}
          disabled={lock}
        />
        <TextField value={values.ProjectId?.location} name="projectLocation" label="Project Loc." disabled={lock} />
        <TextField value={values.leadTime} name="leadTime" label="Lead Time" onChange={handleChange} disabled={lock} />
        <TextField
          value={values.acknowledgeDate}
          name="acknowledgeDate"
          label="Date Ack."
          onChange={handleChange}
          disabled={lock}
        />
        <TextField
          value={values.paymentTerms}
          name="paymentTerms"
          label="Payment Term"
          onChange={handleChange}
          disabled={lock}
        />
        <TextField
          value={values.freightTerms}
          name="freightTerms"
          label="Freight Terms"
          onChange={handleChange}
          disabled={lock}
        />
        <Paper
          style={{
            padding: "0 0.5em 0 1em",
            backgroundColor: "#eee",
            gridColumnEnd: tablet ? "span 3" : "span 4",
          }}
        >
          <FormControlLabel
            name="callBeforeDelivery"
            control={<Checkbox checked={Boolean(values.callBeforeDelivery)} />}
            label="Call 24 hours before delivery"
            classes={{ label: classes.checkboxLabel }}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={lock}
          />
        </Paper>
        <Box style={{ gridColumnEnd: tablet ? "span 3" : "span 4", textAlign: "center" }}>
          {!lock && (
            <ButtonGroup variant="contained" color="primary" aria-label="split button">
              <Button type="submit">save</Button>
              <Button
                color="primary"
                size="small"
                aria-controls={"split-button-menu"}
                aria-expanded={"true"}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={() => {
                  setLock((p) => !p);
                }}
              >
                <LockOpenRounded />
              </Button>
            </ButtonGroup>
            // <ButtonGroup variant="contained" color="primary" aria-label="split button">
            //   <Button type="submit">Save</Button>
            //   <LockButton />
            // </ButtonGroup>
          )}
          {lock && <LockButton />}
        </Box>
      </Box>
    </>
  );
};

export const DocumentForm = ({
  data,
  createdSO,
  onDone,
}: {
  data: ISOComplete;
  createdSO: any;
  onDone: () => void;
}) => {
  const divToPrintAcc = useRef<HTMLElement | null>(null);
  const divToPrintRep = useRef<HTMLElement | null>(null);
  const divToPrintCus = useRef<HTMLElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleSaveDocument = async () => {
    try {
      setIsUploading(true);
      if (divToPrintAcc.current && createdSO?.id) {
        const generatedAccPdf = await exportPdf(divToPrintAcc.current);
        await createAModelDocument({
          model: "so",
          id: createdSO.id,
          file: generatedAccPdf,
          description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
          name: `SO_ACC_${createdSO.number}.pdf`,
        });
      }
      if (divToPrintRep.current) {
        const generatedRepPdf = await exportPdf(divToPrintRep.current);
        await createAModelDocument({
          model: "so",
          id: createdSO.id,
          file: generatedRepPdf,
          description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
          name: `SO_REP_${createdSO.number}.pdf`,
        });
      }
      if (divToPrintCus.current) {
        const generatedCusPdf = await exportPdf(divToPrintCus.current);
        await createAModelDocument({
          model: "so",
          id: createdSO.id,
          file: generatedCusPdf,
          description: `${new Date().toJSON().slice(0, 19)} - ${createdSO.number}`,
          name: `SO_CUS_${createdSO.number}.pdf`,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      onDone();
    }
  };

  return (
    <Box>
      <Typography>We made a pdf from your Sales Order, now you can save it</Typography>
      <div style={{ height: 400, overflowY: "auto" }}>
        <div id="myMm" style={{ height: "1mm" }} />
        <h1>Accounting doc :</h1>
        <div
          id="divToPrint"
          ref={(e) => (divToPrintAcc.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <SOAcc data={data} />
        </div>
        <h1>Representative doc :</h1>
        <div
          id="divToPrint1"
          ref={(e) => (divToPrintRep.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <SORep data={data} />
        </div>
        <h1>Customer doc :</h1>
        <div
          id="divToPrint2"
          ref={(e) => (divToPrintCus.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <SOCus data={data} />
        </div>
      </div>

      <Box textAlign="right">
        <Button disabled={isUploading} onClick={handleSaveDocument}>
          Save
        </Button>
        {isUploading && <LinearProgress />}
      </Box>
    </Box>
  );
};
