import React, { useRef, useState } from "react";
import { Box, Checkbox, FormControlLabel, Paper } from "@material-ui/core";

import Button from "../../../app/Button";
import TextField from "../../../app/TextField";
import { addImage } from "../../../api/items";

interface IForm {
    values: any;
    errors: any;
    touched: any;
    handleChange: (e: any) => void;
    handleBlur: (e: any) => void;
    setFieldValue: any;
    isSubmitting?: boolean;
    device?: boolean;
    sales?: boolean;
}

export const Photo = ({ device }: { device: any }) => {
    const imageUploader = useRef<HTMLElement | null>(null);
    const [img, setImg] = useState<string>();

    const handleFileChange = async (e: any) => {
        if (!e.target.files) {
            return;
        }
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        const resp = await addImage(device.id, file);
        if (resp) {
            setImg(url);
        }
    };

    return (
        <Box mt={1} display="grid" gridTemplateColumns="1fr" gridGap={10}>
            {device?.photo && (
                <img
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "135px",
                        margin: "10px auto",
                    }}
                    alt=""
                    src={img ? img : `http://digitalphocus.ir${device?.photo}`}
                />
            )}
            <div>
                <Box textAlign="center">
                    <Button onClick={() => imageUploader.current && imageUploader.current.click()}>Upload Image</Button>
                </Box>
                <input
                    id="file"
                    name="file"
                    style={{ display: "none" }}
                    type="file"
                    ref={(e) => (imageUploader.current = e)}
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>
        </Box>
    );
};

export const General = ({ values, errors, handleChange, handleBlur, touched, sales }: IForm) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
            <Paper
                style={{
                    margin: "0.5em 0",
                    padding: "0 0.5em",
                    backgroundColor: "#eee",
                    gridColumnEnd: "span 4",
                }}
            >
                <FormControlLabel
                    style={{ fontSize: "0.7rem" }}
                    checked={values.active}
                    label="Active"
                    name="active"
                    onChange={handleChange}
                    control={<Checkbox />}
                    disabled={sales}
                />
                <FormControlLabel
                    style={{ fontSize: "0.7rem" }}
                    checked={values.obsolete}
                    label="Obsolete"
                    name="obsolete"
                    onChange={handleChange}
                    control={<Checkbox />}
                    disabled={sales}
                />
                <FormControlLabel
                    style={{ fontSize: "0.7rem" }}
                    checked={values.rndOnly}
                    label="R&D only"
                    name="rndOnly"
                    onChange={handleChange}
                    control={<Checkbox />}
                    disabled={sales}
                />
                <FormControlLabel
                    style={{ fontSize: "0.7rem" }}
                    checked={values.salesApproved}
                    label="S. Ap."
                    name="salesApproved"
                    onChange={handleChange}
                    control={<Checkbox />}
                    disabled={sales}
                />
                <FormControlLabel
                    style={{ fontSize: "0.7rem" }}
                    checked={values.engineeringApproved}
                    label="En. Ap."
                    name="engineeringApproved"
                    onChange={handleChange}
                    control={<Checkbox />}
                    disabled={sales}
                />
            </Paper>
            <TextField
                style={{ gridColumnEnd: "span 4" }}
                label="Device ID"
                placeholder="Device ID"
                name="no"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.no && touched.no)}
                value={values.no}
                disabled
            />
            <TextField
                style={{ gridColumnEnd: "span 4" }}
                label="Device Name"
                placeholder="Device name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name && touched.name)}
                value={values.name}
                disabled={sales}
            />
            <TextField
                multiline
                style={{ gridColumnEnd: "span 4" }}
                rows={4}
                placeholder="description"
                label="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                disabled={sales}
            />
            <TextField
                style={{ gridColumnEnd: "span 4" }}
                label="Lead Time"
                placeholder="Lead Time"
                name="lead"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.lead && touched.lead)}
                value={values.lead}
                disabled={sales}
            />
            <TextField
                style={{ gridColumnEnd: "span 4" }}
                label="Retail Price"
                name="retailPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.retailPrice && touched.retailPrice)}
                value={values.retailPrice}
                disabled={sales}
            />
        </Box>
    );
};
