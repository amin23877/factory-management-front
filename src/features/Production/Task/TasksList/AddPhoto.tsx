import React, { useState } from "react";
import { Box } from "@material-ui/core";

import UploadButton from "app/UploadButton";

export default function PhotoTabContent({ setPhotos }: { setPhotos: any }) {
  const [images, setImages] = useState<any>([]);
  const handleFilesChange = async (e: any) => {
    const selectedFiles: any[] = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    setPhotos(targetFilesObject);
    targetFilesObject.map((file) => {
      return selectedFiles.push(URL.createObjectURL(file));
    });
    setImages(selectedFiles);
  };

  return (
    <>
      <Box mt={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column" gridGap={10}>
        <Box display="flex" justifyContent="center" alignItems="center" gridGap={10} width="100%" flexWrap={"wrap"}>
          {images &&
            images.length > 0 &&
            images.map((photo: any) => (
              <img
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  maxHeight: 100,
                  margin: "0px auto",
                }}
                alt=""
                src={photo}
              />
            ))}
        </Box>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <UploadButton onChange={handleFilesChange} accept="image/*" multiple />
        </div>
      </Box>
    </>
  );
}
