import React, { useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import { DeleteRounded } from "@material-ui/icons";
import useSWR from "swr";

import { host } from "host";
import { addPhoto, deletePhoto, photoType } from "api/photo";
import Confirm from "./Confirm";
import UploadButton from "app/UploadButton";

import { useLock } from "common/Lock";
import Toast from "app/Toast";

export default function PhotoTab({ id, model }: { model: string; id: string }) {
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
      await addPhoto({ model, id, photo: file });
      setImg(url);

      Toast("Photo uploaded", "success");
    } catch (error) {
      console.log(error);
    } finally {
      mutatePhotos();
    }
  };

  const handleDeletePhoto = async (id: string) => {
    Confirm({
      text: `you are going to delete a Photo !`,
      onConfirm: async () => {
        try {
          await deletePhoto(id);

          Toast("Photo deleted", "success");
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
      <Box mt={1} display="flex" justifyContent="center" alignItems="center" flexDirection="row" gridGap={10}>
        <Box display="flex" justifyContent="center" alignItems="center" gridGap={10} width="100%" flexWrap={"wrap"}>
          {photos &&
            photos.length > 0 &&
            photos.map((photo) => (
              <Box position="relative">
                {!lock && (
                  <IconButton
                    onClick={() => handleDeletePhoto(photo.id)}
                    style={{ position: "absolute", background: "#dbdbdb", right: 0, padding: 4 }}
                  >
                    <DeleteRounded />
                  </IconButton>
                )}
                <img
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: 200,
                    margin: "0px auto",
                  }}
                  alt=""
                  src={img ? img : `${host}${photo.path}`}
                />
              </Box>
            ))}
        </Box>
        {!lock && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <UploadButton onChange={handleFileChange} accept="image/*" />
          </div>
        )}
      </Box>
    </>
  );
}
