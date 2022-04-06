import React, { useState } from "react";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { Box } from "@material-ui/core";
import { Form, Formik } from "formik";

import TextField from "app/TextField";
import Button from "app/Button";
import Dialog from "app/Dialog";

interface ITag {
  name: string;
  inputValue?: string;
}

const filter = createFilterOptions<ITag>();

export default function TagsAutocomplete({ setFieldValue, value }: { value: any; setFieldValue: any }) {
  const [tags, setTags] = useState<ITag[]>([{ name: "1" }]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue[newValue.length - 1] === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setOpen(true);
            });
          } else if (newValue[newValue.length - 1] && newValue[newValue.length - 1].inputValue) {
            setOpen(true);
          } else {
            setFieldValue("tags", newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params) as ITag[];

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        options={tags}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        freeSolo
        multiple
        renderInput={(params) => <TextField {...params} name="tags" label="Tags" />}
      />

      <TagDialog
        open={open}
        onClose={() => setOpen(false)}
        onDone={(tag) => {
          setTags((prev) => [...prev, tag]);
          setFieldValue("tags", value.concat(tag));
        }}
      />
    </>
  );
}

const TagDialog = ({
  onClose,
  onDone,
  open,
}: {
  open: boolean;
  onClose: () => void;
  onDone: (tag: { name: string }) => void;
}) => {
  const handleSubmit = (data: any) => {
    onDone(data);
    onClose();
  };

  return (
    <Dialog title="Add tags" open={open} onClose={onClose}>
      <Box m={1}>
        <Formik initialValues={{} as ITag} onSubmit={handleSubmit}>
          {({ getFieldProps, errors, touched }) => (
            <Form>
              <TextField {...getFieldProps("name")} error={Boolean(errors.name && touched.name)} />
              <Button kind="add" type="submit">
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
