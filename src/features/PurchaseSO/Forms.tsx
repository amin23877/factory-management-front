import React, { useRef } from "react";
import { Box, Button, Typography, FormControlLabel, Checkbox } from "@material-ui/core";

import TextField from "../../app/TextField";

import { getContacts } from "../../api/contact";
import { getAllEmployees } from "../../api/employee";
import { getVendors } from "../../api/vendor";

import { FieldSelect, ArraySelect } from "../../app/Inputs";

export default function UpdateForm({
    values,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
}: {
    setFieldValue: any;
    values: any;
    handleChange: any;
    handleBlur: any;
    errors: any;
}) {
    const uploader = useRef<HTMLInputElement | null>();

    return (
        <>
            <Box>
                <input
                    hidden
                    type="file"
                    name="file"
                    ref={(e) => (uploader.current = e)}
                    onChange={(e) => setFieldValue("file", e.target.files ? e.target.files[0] : null)}
                />
                <Button fullWidth variant="outlined" onClick={() => uploader.current && uploader.current.click()}>
                    File
                </Button>
                <Typography variant="caption">{values.file?.name}</Typography>
            </Box>
            {/* <FieldSelect
                style={{ width: "100%" }}
                request={getAllEmployees}
                itemTitleField="username"
                itemValueField="id"
                name="requester"
                label="Requester"
                value={values.requester}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.requester)}
            /> */}
            <FieldSelect
                style={{ width: "100%" }}
                request={getVendors}
                itemTitleField="name"
                itemValueField="id"
                name="VendorId"
                label="Vendor"
                value={values.VendorId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.VendorId)}
            />
            <FieldSelect
                style={{ width: "100%" }}
                request={getContacts}
                itemTitleField="lastName"
                itemValueField="id"
                name="ContactId"
                label="Contact"
                value={values.ContactId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.ContactId)}
            />
            <TextField
                style={{ width: "100%" }}
                type="date"
                name="estimatedObtainDate"
                label="Estimated obtain date"
                value={values.estimatedObtainDate?.slice(0, 10)}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.estimatedObtainDate)}
            />
            <ArraySelect
                items={["completed", "ready to ship", "pending"]}
                name="status"
                label="Status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.status)}
            />
            <FormControlLabel
                style={{ width: "100%" }}
                checked={values.obtained}
                name="obtained"
                label="Obtained"
                onChange={handleChange}
                control={<Checkbox />}
            />
        </>
    );
}
