import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { GridColumns } from "@material-ui/data-grid";
import useSWR from "swr";

import Button from "app/Button";
import BaseDataGrid from "app/BaseDataGrid";
import ContactModal from "./Modal";

import { IContact } from "api/contact";
import { useLock } from "common/Lock";

const columns: GridColumns = [
  { field: "firstName", headerName: "First Name", width: 110 },
  { field: "lastName", headerName: "Last Name" },
  { field: "phone", headerName: "Phone", valueFormatter: ({ row }) => row?.phones[0]?.phone },
  { field: "ext", headerName: "Ext", valueFormatter: ({ row }) => row?.phones[0]?.ext },
  { field: "email", headerName: "Email", valueFormatter: ({ row }) => row?.emails[0]?.email },
  { field: "title", headerName: "Title" },
  { field: "department", headerName: "Department", width: 120 },
  { field: "main", headerName: "Main", type: "boolean" },
  { field: "active", headerName: "Active", type: "boolean" },
];

export default function ContactTab({ itemId, model }: { model: string; itemId: string }) {
  const { data } = useSWR(`/contact/${model}/${itemId}`);
  const { lock } = useLock();
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
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<AddRounded />}
            style={{ margin: "4px 0", marginRight: "auto" }}
            onClick={() => {
              setSelectedContact(undefined);
              setAddModal(true);
            }}
            disabled={lock}
          >
            Add
          </Button>
        </Box>
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
