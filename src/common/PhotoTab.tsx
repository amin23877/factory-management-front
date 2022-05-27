import React, { useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import useSWR from "swr";

import { host } from "host";
import { addPhoto, deletePhoto, photoType } from "api/photo";
import Confirm from "./Confirm";
import UploadButton from "app/UploadButton";

import { LockButton, LockProvider, useLock } from "common/Lock";

function PhotoTabContent({ id, model }: { model: string; id: string }) {
  const { data: photos, mutate: mutatePhotos } = useSWR<photoType[]>(`/photo/${model}/${id}`);
  const [img, setImg] = useState<any>();
  const { lock } = useLock();

  const handleFileChange = async (e: any) => {
    try {
      if (!e.target.files) {
        return;
      }
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      await addPhoto({ model: "item", id, photo: file });
      setImg(url);
    } catch (error) {
      console.log(error);
    } finally {
      mutatePhotos();
    }
  };

  const handleDeletePhoto = async (id: string) => {
    Confirm({
      onConfirm: async () => {
        try {
          await deletePhoto(id);
        } catch (error) {
          console.log(error);
        } finally {
          mutatePhotos();
        }
      },
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="start">
        <LockButton />
      </Box>
      <Box mt={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column" gridGap={10}>
        {photos && photos.length > 0 && (
          <Box position="relative">
            <IconButton
              onClick={() => handleDeletePhoto(photos[0].id)}
              style={{ position: "absolute", background: "#dbdbdb", right: 0, padding: 4 }}
              disabled={lock}
            >
              <DeleteRounded />
            </IconButton>
            <img
              style={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: 100,
                margin: "0px auto",
              }}
              alt=""
              src={img ? img : `${host}${photos[0].path}`}
            />
          </Box>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <UploadButton onChange={handleFileChange} accept="image/*" disabled={lock} />
        </div>
      </Box>
    </>
  );
}

export default function PhotoTab({ id, model }: { model: string; id: string }) {
  return (
    <LockProvider>
      <PhotoTabContent id={id} model={model} />
    </LockProvider>
  );
}
