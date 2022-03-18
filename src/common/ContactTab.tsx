import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import { ContactModal } from "features/Modals/ContactModal";

import { IContact } from "api/contact";

const columns: GridColumns = [
  { field: "firstName", headerName: "First Name", width: 110 },
  { field: "lastName", headerName: "Last Name" },
  { field: "phone", headerName: "Phone", valueFormatter: ({ row }) => row?.phones[0]?.phone },
  { field: "ext", headerName: "Ext", valueFormatter: ({ row }) => row?.phones[0]?.ext },
  { field: "email", headerName: "Email", flex: 1, valueFormatter: ({ row }) => row?.emails[0]?.email },
  { field: "title", headerName: "Title" },
  { field: "department", headerName: "Department", width: 120 },
  { field: "main", headerName: "Main", type: "boolean" },
  { field: "active", headerName: "Active", type: "boolean" },
];

export default function ContactTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/contact/${model}/${itemId}`);
  const [addModal, setAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact>();

  return (
    <>
      <ContactModal
        open={addModal}
        onClose={() => setAddModal(false)}
        model={model}
        itemId={itemId}
        data={selectedContact}
      />
      <Box>
        <Button
          variant="outlined"
          startIcon={<AddRounded />}
          style={{ margin: "4px 0" }}
          onClick={() => setAddModal(true)}
        >
          Add
        </Button>
        <BaseDataGrid
          cols={columns}
          rows={data || []}
          onRowSelected={(r) => {
            setSelectedContact(r);
            setAddModal(true);
          }}
        />
      </Box>
    </>
  );
}
