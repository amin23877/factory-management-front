import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";

import Dialog from "app/Dialog";
import Toast from "app/Toast";
import Button from "app/Button";

import { General } from "./Forms";
import { Box, Tab, Tabs, Tooltip } from "@material-ui/core";
import BaseDataGrid from "app/BaseDataGrid";
import AddPartModal from "./AddPartModal";
import { IItem } from "api/items";
import { GridColumns } from "@material-ui/data-grid";
import { createTask, ITaskList } from "api/taskList";
import { BasePaper } from "app/Paper";
import PhotoTab from "./AddPhoto";
import { addPhoto } from "api/photo";

export default function AddTaskListModal({
  open,
  onClose,
  setRefresh,
}: {
  open: boolean;
  onClose: () => void;
  setRefresh: any;
}) {
  const [addPart, setAddPart] = useState(false);
  const [parts, setParts] = useState<IItem[] | null>(null);
  const [items, setItems] = useState<any>();
  const [photos, setPhotos] = useState<any>([]);

  const handleSubmit = async (data: any) => {
    try {
      let newType = data.type;
      newType = newType.split(" ");
      newType[0] = newType[0].toLowerCase();
      data.type = newType.join("");
      const resp = await createTask({ ...data, relatedParts: items?.map((i: any) => i.id) });
      if (resp && resp.id) {
        if (photos.length <= 0) {
          Toast("Task added successfully", "success");
          setRefresh((refresh: number) => refresh + 1);
          onClose();
          return;
        }
        await photos.forEach(async (file: any) => {
          await addPhoto({ model: "task", id: resp.id, photo: file });
        });
        Toast("Task added successfully", "success");
        setRefresh((refresh: number) => refresh + 1);
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const newArray = parts?.map((item: any) => item.item);
    setItems(newArray);
  }, [parts]);

  const cols = useMemo<GridColumns>(
    () => [
      {
        headerName: "Part Name",
        field: "name",
        width: 140,
        renderCell: (p: any) => (
          <Tooltip title={String(p.value)}>
            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>
              {String(p.value)}
            </span>
          </Tooltip>
        ),
      },
      { field: "no", headerName: "Part NO.", width: 140 },
      {
        field: "description",
        headerName: "Part Description",
        flex: 1,
      },
    ],
    []
  );

  return (
    <Dialog open={open} onClose={onClose} fullScreen title="Add New Task">
      <Formik initialValues={{} as ITaskList} onSubmit={handleSubmit}>
        {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setValues }) => (
          <Form>
            <Box display="grid" gridTemplateColumns="1fr 2fr" style={{ gap: 10 }}>
              <Box display="grid" gridTemplateColumns="1fr" style={{ gap: 10 }}>
                <BasePaper>
                  <General
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    unlock
                  />
                </BasePaper>
                <BasePaper>
                  <Tabs
                    value={0}
                    variant="scrollable"
                    style={{ marginBottom: 16 }}
                    textColor="primary"
                    onChange={(e, v) => {}}
                  >
                    <Tab label="Image" />
                  </Tabs>
                  <PhotoTab setPhotos={setPhotos} />
                </BasePaper>
              </Box>
              <Box>
                <BasePaper>
                  <Button onClick={() => setAddPart(true)} kind="add" style={{ marginBottom: "10px" }}>
                    Add / Edit Related Parts
                  </Button>
                  <AddPartModal open={addPart} onClose={() => setAddPart(false)} parts={parts} setParts={setParts} />
                  <BaseDataGrid rows={items || []} cols={cols} />
                </BasePaper>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent="center" mt={5} width="100%">
              <Button type="submit" kind="add">
                {" "}
                Submit{" "}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
