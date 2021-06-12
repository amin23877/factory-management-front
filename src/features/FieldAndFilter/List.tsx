import React from "react";
import { LinearProgress } from "@material-ui/core";
import useSWR from "swr";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '20px'
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);
export default function List() {
    const { data: filterNFields } = useSWR("/filter/field");
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (!filterNFields) {
        return <LinearProgress />;
    }

    return (
        <div className={classes.root}>
            <h3> Filters </h3>
            {filterNFields.map((i: any, index: number) => {
                return (
                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>{i.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {i.valid.map((j: any) => (
                                    <li>{j.value}
                                        <ul>
                                            {j.fields.map((k: any) => (
                                                <li>{k.name}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                )
            })}

        </div>
    )
}
