import React, { useRef, useState } from "react";
import { Box } from "@material-ui/core";

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
                    alt={device?.photo}
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

export const General = ({ values, errors, handleChange, handleBlur, touched }: IForm) => {
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridRowGap={10} gridColumnGap={10} pr={1}>
            <TextField
                style={{ gridColumnEnd: "span 4" }}
                label="Device Name"
                placeholder="Device name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name && touched.name)}
                value={values.name}
            />
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
                multiline
                style={{ gridColumnEnd: "span 4" }}
                rows={4}
                placeholder="description"
                label="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
            />
        </Box>
    );
};
