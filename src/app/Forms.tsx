import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "./TextField";

import Button from "./Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Formik, Form, FieldArray } from "formik";
import { getApis } from "api/api";
import { assignApiToRole, deleteRole, updateRole } from "api/role";

export const GeneralForm = ({
  type,
  addRecord,
  setRefresh,
  onClose,
  initialVals,
}: {
  type: string;
  addRecord: (v: string) => Promise<any>;
  setRefresh?: any;
  onClose: () => void;
  initialVals?: any;
}) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
  });
  const classes = useStyles();
  const [apis, setApis] = useState<any>();

  const getData = async () => {
    try {
      const resp = await getApis();
      if (resp) {
        setApis(resp);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAdd = async (values: any) => {
    try {
      if (!initialVals) {
        const resp = await addRecord(values.name);
        await assignApiToRole(resp.id, values.apis);
      } else {
        await updateRole(initialVals.id, values);
      }
      setRefresh((p: any) => p + 1);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRole(initialVals.id);
      setRefresh((p: any) => p + 1);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box m={2} p={2}>
        <Formik initialValues={initialVals ? initialVals : { name: "", apis: [] }} onSubmit={handleAdd}>
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1} gridGap={1}>
                <TextField
                  fullWidth
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder={`name`}
                  style={{ marginRight: "8px", flex: 1 }}
                />
                {!initialVals ? (
                  <Button type="submit" kind="add" disabled={isSubmitting}>
                    Add
                  </Button>
                ) : (
                  <>
                    <Button kind="edit" disabled={isSubmitting} type="submit">
                      Save
                    </Button>
                    <Button kind="delete" disabled={isSubmitting} onClick={handleDelete}>
                      Delete
                    </Button>
                  </>
                )}
              </Box>
              <div className={classes.root}>
                {apis?.result?.map((api: any) => (
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <Typography>{api.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <FieldArray
                        name="apis"
                        render={(arrayHelpers) => (
                          <Box display={"flex"} flexDirection="column">
                            {api?.items?.map((item: any) => (
                              <FormControlLabel
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox />}
                                label={item.name}
                                onChange={(e: any) => {
                                  if (e.target.checked) {
                                    arrayHelpers.push(item.id);
                                  } else {
                                    arrayHelpers.remove(item.id);
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
