import React, { useCallback, useMemo, useState } from "react";
import { Container, Typography, Box, useMediaQuery } from "@material-ui/core";
import { SearchRounded, ClearRounded } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import NumericEditor from "@inovua/reactdatagrid-community/NumericEditor";
import BoolEditor from "@inovua/reactdatagrid-community/BoolEditor";

import Button from "app/Button";

import { LockButton, useLock } from "common/Lock";
import Confirm from "common/Confirm";

import ShowBomRecordsButton from "features/BOM/ShowBomRecordsButton";
import AddPartModal from "features/BOM/AddPart";
import NewBaseDataGrid from "app/NewDataGrid";
import Toast from "app/Toast";

import { deleteBomRecord, updateBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

function Parts() {
  const { bomId } = useParams<{ bomId: string }>();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");
  const history = useHistory();
  const { lock } = useLock();

  const handleDelete = useCallback((id: string) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deleteBomRecord(id);
        } catch (error) {
          console.log(error);
        } finally {
          setRefresh((p) => p + 1);
        }
      },
    });
  }, []);

  const columns = useMemo(
    () => [
      { name: "no", header: "NO.", render: ({ data }: any) => data?.ItemId?.no, editable: false },
      { name: "name", header: "Name", render: ({ data }: any) => data?.ItemId?.name, editable: false },
      {
        name: "description",
        header: "Description",
        flex: 1,
        render: ({ data }: any) => data?.ItemId?.description,
        editable: false,
      },
      { name: "usage", header: "Usage", defaultWidth: 100, editor: NumericEditor },
      { name: "fixedQty", header: "Fixed Qty", defaultWidth: 100, editor: BoolEditor },
      {
        name: "actions",
        header: "",
        editable: false,
        render: ({ data }: any) => {
          return (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div
                onClick={() => {
                  if (phone) {
                    history.push(`/panel/inventory/${data?.ItemId?.id}`);
                  } else {
                    openRequestedSinglePopup({ url: `/panel/inventory/${data?.ItemId?.id}` });
                  }
                }}
              >
                <SearchRounded style={{ fontSize: "1.6rem", color: "#426792", cursor: "pointer" }} />
              </div>
              <div
                style={{ margin: "0 10px" }}
                onClick={() => {
                  if (!lock) {
                    handleDelete(data.id);
                  }
                }}
              >
                <ClearRounded
                  style={{ fontSize: "1.6rem", color: lock ? "#ccc" : "#e71414", cursor: lock ? "auto" : "pointer" }}
                />
              </div>
              <ShowBomRecordsButton bomRecord={data} />
            </div>
          );
        },
      },
    ],
    [handleDelete, history, lock, phone]
  );

  const handleEdit = async ({
    id,
    field,
    value,
  }: {
    id: string;
    field: "fixedQty" | "usage";
    value: boolean | number;
  }) => {
    try {
      await updateBomRecord(id, { [field]: value });
      Toast("Record updated successfully", "success");
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh((p) => p + 1);
    }
  };

  if (!bomId) {
    <Container>
      <Typography>Sorry, Can't find Parts for this BOM</Typography>
    </Container>;
  }

  return (
    <>
      <AddPartModal open={open} onClose={() => setOpen(false)} bomId={bomId} onDone={() => setRefresh((p) => p + 1)} />
      <Container>
        <Box display="flex" alignItems="center" mb={1}>
          <Button kind="add" onClick={() => setOpen(true)}>
            Add Part
          </Button>
          <div style={{ flexGrow: 1 }} />
          <LockButton />
        </Box>
        <NewBaseDataGrid
          url={`/bomrecord?BOMId=${bomId}`}
          columns={columns}
          onRowSelected={() => {}}
          refresh={refresh}
          onEditComplete={(params: any) =>
            handleEdit({ id: params?.data?.id, field: params.columnId, value: params.value })
          }
          editable={!lock}
        />
      </Container>
    </>
  );
}

export default Parts;
