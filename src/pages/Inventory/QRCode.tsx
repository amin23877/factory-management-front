import React, { useState } from "react";
import { Box, Card, FormControlLabel, Radio, RadioGroup, Typography, useMediaQuery } from "@material-ui/core";
import QrReader from "react-qr-reader";
import useSWR from "swr";

import Button from "app/Button";
import Toast from "app/Toast";
import { changeQuantity, IItem } from "api/items";
import TextField from "app/TextField";
import AsyncCombo from "common/AsyncCombo";

export default function QRCode() {
  const xs = useMediaQuery("(max-width: 600px)");
  const sm = useMediaQuery("(max-width: 900px)");
  const [result, setResult] = useState<{
    type: string;
    panel: string;
    no: string;
    id: string;
  }>();
  const { data: item } = useSWR<IItem>(result?.id ? `/item/${result.id}` : null);
  const [accepted, setAccepted] = useState(false);
  const [radio, setRadio] = useState(0);
  const [soId, setSoId] = useState<string>();
  const [poId, setPoId] = useState<string>();
  const [pickUpQty, setPickUpQty] = useState<number>();
  const [addQty, setAddQty] = useState<number>();

  const handleSubmit = async () => {
    try {
      if (result) {
        await changeQuantity({
          itemId: result.id,
          SOId: soId,
          POId: poId,
          allocatedQty: pickUpQty,
          onHandQty: addQty,
        });
        Toast("Quantity changed successfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let content = <></>;

  if (result && accepted) {
    content = (
      <>
        <Typography>Number: {result.no}</Typography>
        <RadioGroup
          row
          style={{ marginTop: 16 }}
          value={radio}
          onChange={(e, nv) => {
            setSoId(undefined);
            setPoId(undefined);
            setPickUpQty(undefined);
            setAddQty(undefined);
            setRadio(Number(nv));
          }}
        >
          <FormControlLabel label="Pick Up" value={0} control={<Radio />} />
          <FormControlLabel label="Add" value={1} control={<Radio />} />
        </RadioGroup>
        {radio === 0 && (
          <>
            <Typography style={{ marginTop: 8 }}>Decrease</Typography>
            <form onSubmit={handleSubmit}>
              <Box mt={1} display="grid" gridTemplateColumns="repeat(3, 1fr)" style={{ gap: 8 }}>
                <AsyncCombo
                  filterBy="number"
                  getOptionLabel={(o) => o.number || ""}
                  getOptionSelected={(o, v) => o.id === v.id}
                  url="/so"
                  label="SO Number"
                  value={soId}
                  onChange={(e, nv) => setSoId(nv?.id)}
                />
                <TextField
                  label="Quantity Allocated"
                  type="number"
                  value={pickUpQty}
                  onChange={(e) => setPickUpQty(Number(e.target.value))}
                />
                <Button kind="add" onClick={handleSubmit}>
                  Pick Up
                </Button>
              </Box>
            </form>
          </>
        )}
        {radio === 1 && (
          <>
            <Typography style={{ marginTop: 8 }}>Add</Typography>
            <form onSubmit={handleSubmit}>
              <Box mt={1} display="grid" gridTemplateColumns="repeat(3, 1fr)" style={{ gap: 8 }}>
                <AsyncCombo
                  filterBy="number"
                  getOptionLabel={(o) => o.number || ""}
                  getOptionSelected={(o, v) => o.id === v.id}
                  url="/po"
                  label="PO Number"
                  value={poId}
                  onChange={(e, nv) => setPoId(nv?.id)}
                />
                <TextField
                  label="Quantity On Hand"
                  type="number"
                  value={addQty}
                  onChange={(e) => setAddQty(Number(e.target.value))}
                />
                <Button kind="add" onClick={handleSubmit}>
                  Add
                </Button>
              </Box>
            </form>
          </>
        )}
      </>
    );
  }

  if (result && !accepted) {
    content = (
      <>
        <Typography>Number: {result.no}</Typography>
        <Typography>Name: {item?.name}</Typography>
        <Typography style={{ marginBottom: 8 }}>Description: {item?.description}</Typography>
        <Button variant="contained" color="secondary" onClick={() => setAccepted(true)} style={{ marginRight: 8 }}>
          Accept
        </Button>
        <Button variant="outlined" onClick={() => setResult(undefined)}>
          Retry
        </Button>
      </>
    );
  }

  if (!result) {
    content = (
      <>
        <Typography variant="h5" style={{ margin: "8px 0", fontWeight: "bold", textAlign: "center" }}>
          Scan here...
        </Typography>
        <QrReader onError={(e) => Toast(String(e), "error")} onScan={(d) => d && setResult(JSON.parse(d))} />
      </>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Card style={{ padding: 10, width: xs ? "80vw" : sm ? "60vw" : "30vw" }}>{content}</Card>
    </Box>
  );
}
