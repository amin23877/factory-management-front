import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import Modal from "./Modal";

import { IAddress } from "api/address";

const columns: GridColumns = [
  { field: "address", headerName: "Address", flex: 1 },
  { field: "city", headerName: "City", width: 120 },
  { field: "state", headerName: "State", width: 120 },
  { field: "zip", headerName: "ZIP", width: 70 },
  { field: "country", headerName: "Country", width: 100 },
];

export default function AddressTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/address/${model}/${itemId}`);
  const [modal, setModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>();

  return (
    <>
      <Modal open={modal} onClose={() => setModal(false)} model={model} itemId={itemId} data={selectedAddress} />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ margin: "0.5em 0" }}
          onClick={() => setModal(true)}
        >
          Add
        </Button>
        <BaseDataGrid
          cols={columns}
          rows={data || []}
          onRowSelected={(r) => {
            setSelectedAddress(r);
            setModal(true);
          }}
        />
      </Box>
    </>
  );
}
