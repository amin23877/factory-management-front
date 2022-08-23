import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import Button from "app/Button";
import TextField from "app/TextField";

import useSWR from "swr";
import { IConstant, updateAConstant } from "api/constant";
import { camelCaseToRegular } from "logic/utils";
import Toast from "app/Toast";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    column: {
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export default function Config() {
  const classes = useStyles();

  const { data: constants } = useSWR<IConstant[]>(`/constant/${window.location.pathname.split("/")[2]}`);

  const [expanded, setExpanded] = React.useState<number | false>(0);
  const [value, setValue] = React.useState<string>("");
  const [values, setValues] = React.useState<string[]>([]);
  const [refresh, setRefresh] = React.useState<number>(0);

  const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = () => {
    let temp = values.slice();
    temp.push(value);
    setValues(temp);
    setValue("");
  };

  useEffect(() => {
    if (constants && typeof expanded !== "boolean") {
      if (constants[expanded].value) {
        setValue(constants[expanded].value as string);
      } else {
        setValue("");
      }
      setValues(constants[expanded].values);
    }
  }, [constants, expanded, refresh]);

  const handleChangeValues = async (id: string) => {
    try {
      await updateAConstant(id, { values });
      Toast("updated successfully", "success");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeOneValue = async (id: string) => {
    try {
      await updateAConstant(id, { value });
      Toast("updated successfully", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.root}>
      {constants?.map((c, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          TransitionProps={{ unmountOnExit: true }}
          key={index}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{camelCaseToRegular(c.key)}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Box width={"100%"}>
              <Formik initialValues={{}} onSubmit={c.value ? () => {} : handleSubmit}>
                {() => (
                  <Form>
                    <TextField
                      label={c.value ? "Value" : "New Value"}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      style={{ marginRight: "5px" }}
                    />
                    {!c.value && (
                      <Button type="submit" kind="add">
                        ADD
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
            </Box>
            <Box display={"flex"} gridGap={"5px"}>
              {values.map((i) => (
                <Chip
                  label={i}
                  onDelete={() => {
                    setValues((current) => current.filter((element) => element !== i));
                  }}
                />
              ))}
            </Box>
          </AccordionDetails>
          <AccordionActions>
            <Button size="small" onClick={() => setRefresh((p) => p + 1)}>
              Cancel
            </Button>
            <Button
              size="small"
              color="primary"
              kind="edit"
              onClick={c.value ? () => handleChangeOneValue(c.id) : () => handleChangeValues(c.id)}
            >
              Save
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
