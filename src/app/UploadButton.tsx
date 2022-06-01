import React, { ChangeEventHandler, useRef } from "react";
import { PhotoCamera } from "@material-ui/icons";

import Button from "./Button";

const UploadButton = ({
  onChange,
  accept,
  multiple,
  disabled,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
}) => {
  const fileUploader = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <input
        id="custom-file-input"
        hidden
        type="file"
        ref={(e) => (fileUploader.current = e)}
        onChange={onChange}
        multiple={multiple}
        accept={accept}
      />
      <label htmlFor="custom-file-input">
        <Button
          color="primary"
          variant="contained"
          onClick={() => !disabled && fileUploader.current?.click()}
          startIcon={<PhotoCamera />}
          disabled={disabled}
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default UploadButton;
