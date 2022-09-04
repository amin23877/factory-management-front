import React, { useCallback, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Container, Typography, Box, useMediaQuery, Tooltip } from "@material-ui/core";

import { ReactComponent as SettingIcon } from "assets/icons/tableIcons/setting.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/tableIcons/delete.svg";

import NumericEditor from "@inovua/reactdatagrid-community/NumericEditor";
import BoolEditor from "@inovua/reactdatagrid-community/BoolEditor";

import Button from "app/Button";
import NewBaseDataGrid from "app/NewDataGrid";
import Toast from "app/Toast";
import { LockButton, useLock } from "common/Lock";
import Confirm from "common/Confirm";

import ShowBomRecordsButton from "features/BOM/ShowBomRecordsButton";
import AddPartModal from "features/BOM/AddPart";

import { deleteBomRecord, updateBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

function Parts() {
  const { bomId } = useParams<{ bomId: string }>();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");
  const history = useHistory();
  const { lock } = useLock();

  const handleDelete = useCallback((data: any) => {
    Confirm({
      text: `you are going to delete a BOM Record with number ${data?.ItemId?.no} !`,
      onConfirm: async () => {
        try {
          await deleteBomRecord(data.id);
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
      {
        name: "no",
        header: "Item NO.",
        render: ({ data }: any) => (
          <Tooltip title={data?.ItemId?.no}>
            <span>{data?.ItemId?.no}</span>
          </Tooltip>
        ),
        editable: false,
      },
      {
        name: "name",
        header: "Item Name",
        render: ({ data }: any) => (
          <Tooltip title={data?.ItemId?.name}>
            <span>{data?.ItemId?.name}</span>
          </Tooltip>
        ),
        editable: false,
      },
      {
        name: "description",
        header: "Item Description",
        flex: 1,
        render: ({ data }: any) => (
          <Tooltip title={data?.ItemId?.description}>
            <span>{data?.ItemId?.description}</span>
          </Tooltip>
        ),
        editable: false,
      },
      { name: "usage", header: "Usage", defaultWidth: 100, editor: NumericEditor },
      { name: "fixedQty", header: "Fixed Qty", type: "boolean", defaultWidth: 100, editor: BoolEditor },
      {
        name: "actions",
        header: "",
        editable: false,
        render: ({ data }: any) => {
          return (
            <div style={{ display: "flex", justifyContent: "end", gap: 8, alignItems: "center" }}>
              <ShowBomRecordsButton bomRecord={data} />
              <div
                onClick={() => {
                  if (phone) {
                    history.push(`/panel/inventory/items/${data?.ItemId?.id}`);
                  } else {
                    openRequestedSinglePopup({ url: `/panel/inventory/items/${data?.ItemId?.id}` });
                  }
                }}
              >
                <SettingIcon />
              </div>
              <div
                onClick={() => {
                  if (!lock) {
                    handleDelete(data);
                  }
                }}
              >
                <DeleteIcon />
              </div>
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
          <Button kind="add" onClick={() => setOpen(true)} disabled={lock}>
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
