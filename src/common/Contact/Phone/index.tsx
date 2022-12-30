import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";

import PhoneModal from "./Modal";
import { IContact } from "api/contact";
import BaseDataGrid from "app/BaseDataGrid";
import { IPhone } from "api/phone";

const phoneColumns: GridColumns = [
  { field: "phone", headerName: "Phone", width: 110 },
  { field: "phoneType", headerName: "Phone Type", width: 110 },
  { field: "ext", headerName: "EXT", width: 90 },
  { field: "main", headerName: "Main", type: "boolean" },
];

export default function PhoneTab({ contact }: { contact: IContact }) {
  const [modal, setModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<IPhone>();

  return (
    <>
      <PhoneModal
        list={contact.phones || []}
        contactId={contact.id || contact._id}
        phone={selectedPhone}
        open={modal}
        onClose={() => setModal(false)}
      />
      <Button
        variant="outlined"
        onClick={() => {
          setSelectedPhone(undefined);
          setModal(true);
        }}
        style={{ marginBottom: 8 }}
      >
        Add phone
      </Button>
      <BaseDataGrid
        cols={phoneColumns}
        rows={contact.phones.map((p) => ({ ...p, id: p._id })) || []}
        onRowSelected={(r) => {
          setSelectedPhone(r);
          setModal(true);
        }}
      />
    </>
  );
}
