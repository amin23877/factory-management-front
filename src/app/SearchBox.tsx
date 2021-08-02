import React, { useState } from "react";
import { Box, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useSWR from "swr";

import Button from "./Button";
import TextField from "./TextField";
import QRCodeScanner from "./QRCodeScanner";

import { IItem } from "../api/items";
import { IUnit } from "../api/units";

export default function SearchBox({ panel }: { panel: "unit" | "engineering" | "inventory" }) {
    const history = useHistory();

    const [scanner, setScanner] = useState(false);
    const [number, setNumber] = useState<string>();

    const { data: item } = useSWR<IItem>(number ? `/item/no/${number}` : null);

    return (
        <Paper style={{ marginBottom: 10 }}>
            <QRCodeScanner
                open={scanner}
                onClose={() => setScanner(false)}
                onScan={(data) => {
                    data && setNumber(data);
                    setScanner(false);
                }}
            />

            <Box p={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridGap={10}>
                <TextField placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
                <TextField disabled={!item} placeholder="Item Name" value={item?.name || ""} />
                <Button kind="edit" onClick={() => setScanner(true)}>
                    Scanner
                </Button>
                <Button
                    disabled={!number}
                    variant="contained"
                    color="primary"
                    onClick={() => item && history.push(`/panel/${panel}/${item.id}`)}
                >
                    Redirect
                </Button>
            </Box>
        </Paper>
    );
}

export const UnitSearchBox = () => {
    const history = useHistory();

    const [scanner, setScanner] = useState(false);
    const [number, setNumber] = useState<string>();

    const { data: unit } = useSWR<IUnit>(number ? `/unit/${number}` : null);

    return (
        <Paper style={{ marginBottom: 10 }}>
            <QRCodeScanner
                open={scanner}
                onClose={() => setScanner(false)}
                onScan={(data) => {
                    data && setNumber(data);
                    setScanner(false);
                }}
            />

            <Box p={1} display="grid" gridTemplateColumns="1fr 1fr 1fr 1fr" gridGap={10}>
                <TextField placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
                <TextField disabled={!unit} placeholder="Item Name" value={unit?.item.name || ""} />
                <Button kind="edit" onClick={() => setScanner(true)}>
                    Scanner
                </Button>
                <Button
                    disabled={!number}
                    variant="contained"
                    color="primary"
                    onClick={() => unit && history.push(`/panel/production/${unit.id}`)}
                >
                    Redirect
                </Button>
            </Box>
        </Paper>
    );
};
