import { Typography } from "@material-ui/core";
import ServiceIndex from "features/FieldService";
import React from "react";
import { useParams } from "react-router-dom";

export default function ServiceDetails() {
  const { serviceId } = useParams<{ serviceId?: string }>();

  if (!serviceId || serviceId === "") {
    return <Typography>404 - Service Not Found</Typography>;
  }

  return <ServiceIndex serviceId={serviceId} />;
}
