import React, { useEffect, useState } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";

export const FilterByWord = ({ filters, filterBy, onChange }: { filters?: IFilters; filterBy: keyof IFilters; onChange: any }) => {
    const [val, setVal] = useState("");

    useEffect(() => {
        filters && setVal(filters[filterBy] as string);
    }, [filters]);

    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ padding: "0.5em 1em" }}>
            <TextField
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onBlur={(e) => onChange((prev: any) => ({ ...prev, [filterBy]: e.target.value }))}
                label={`Searcg by ${filterBy === "desc" ? "description" : filterBy === "itemNo" ? "item number" : filterBy}`}
                fullWidth
                style={{ margin: "5px 0" }}
            />
        </Box>
    );
};

export const FilterWithChecks = ({
    filters,
    filterBy,
    onChange,
    cats,
    types,
    families,
}: {
    cats: any[];
    types: any[];
    families: any[];
    filters?: IFilters;
    filterBy: keyof IFilters;
    onChange: any;
}) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ padding: "0.5em 1em" }}>
            <Autocomplete
                value={filters && filters[filterBy] ? (filters[filterBy] as any[]) : undefined}
                multiple
                fullWidth
                options={filterBy === "cat" ? cats : filterBy === "type" ? types : families}
                getOptionLabel={(option) => option.name}
                onChange={(d, v) => onChange((prev: any) => ({ ...prev, [filterBy]: v }))}
                renderInput={(params) => <TextField {...params} label={filterBy === "cat" ? "category" : filterBy} />}
            />
        </Box>
    );
};

export const FilterByCost = ({ filters, onChange }: { filters?: IFilters; filterBy: keyof IFilters; onChange: any }) => {
    const [val, setVal] = useState([0, 10]);

    useEffect(() => {
        setVal(filters?.cost ? filters.cost : [0, 10]);
    }, [filters]);

    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" style={{ padding: "0.5em 1em" }}>
            <Typography>Filter by cost</Typography>
            <Slider
                // value={filters?.cost ? filters.cost : [0, 10]}
                value={val}
                onChange={(e, nv) => setVal(nv as number[])}
                onChangeCommitted={(e, nv) => onChange((prev: any) => ({ ...prev, cost: nv as number[] }))}
                valueLabelDisplay="auto"
            />
        </Box>
    );
};

export interface IFilters {
    itemNo: string;
    name: string;
    desc: string;
    cat: any[];
    type: any[];
    family: any[];
    cost: number[];
}

export default function MenuFilters({
    filterBy,
    filters,
    onFilterChange,
    cats,
    types,
    families,
}: {
    filterBy: string;
    filters?: IFilters;
    onFilterChange: (v: any) => void;
    cats: any[];
    types: any[];
    families: any[];
}) {
    if (filterBy === "itemNo" || filterBy === "name" || filterBy === "desc") {
        return <FilterByWord filters={filters} filterBy={filterBy} onChange={onFilterChange} />;
    }
    if (filterBy === "cat" || filterBy === "type" || filterBy === "family") {
        return (
            <FilterWithChecks
                cats={cats}
                types={types}
                families={families}
                filters={filters}
                filterBy={filterBy}
                onChange={onFilterChange}
            />
        );
    }
    if (filterBy === "cost") {
        return <FilterByCost filters={filters} filterBy={filterBy} onChange={onFilterChange} />;
    }
    return <></>;
}
