import React from "react";

import { ArraySelect } from "../../../app/Inputs";
import { IFilter } from "../../../api/filter";

export default function Cluster({
    cluster,
    device,
    handleBlur,
    handleChange,
    values,
}: {
    device: boolean;
    values: any;
    handleChange: any;
    handleBlur: any;
    cluster: IFilter;
}) {
    if (cluster.name === "Product Family" && !device) {
        return null;
    }

    return (
        <ArraySelect
            defaultValue={values ? values[cluster.name as any] : ""}
            name={cluster.name}
            label={cluster.name}
            items={cluster.valid}
            value={values ? values[cluster.name as any] : ""}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
}
