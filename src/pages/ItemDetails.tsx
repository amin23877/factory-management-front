import React from "react";
import { LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import ItemsDetails from "features/Items/Details";
import { IItem } from "api/items";

function ItemsDetailsPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: selectedRow } = useSWR<IItem>(itemId ? `/item/${itemId}` : null);

  if (!selectedRow) {
    return <LinearProgress />;
  }

  return <ItemsDetails selectedRow={selectedRow} onDocSelected={() => {}} onNoteSelected={() => {}} />;
}

export default ItemsDetailsPage;
