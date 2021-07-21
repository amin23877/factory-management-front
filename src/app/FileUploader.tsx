import React, { ChangeEventHandler, useRef } from "react";
import { PhotoCamera } from "@material-ui/icons";

import Button from "./Button";

const FileUploader = ({
    onChange,
    accept,
    multiple,
}: {
    onChange?: ChangeEventHandler<HTMLInputElement>;
    multiple?: boolean;
    accept?: string;
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
                    onClick={() => fileUploader.current?.click()}
                    startIcon={<PhotoCamera />}
                >
                    Upload
                </Button>
            </label>
        </div>
    );
};

export default FileUploader;
