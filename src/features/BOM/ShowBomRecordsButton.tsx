import React, { memo } from "react";
import { IconButton } from "@material-ui/core";
import { VisibilityRounded } from "@material-ui/icons";

import { IBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

function ShowBomRecordsButton({ bomRecord }: { bomRecord: IBomRecord }) {
  if (bomRecord?.ItemId?.currentBOM) {
    return (
      <IconButton onClick={() => openRequestedSinglePopup({ url: `/panel/bom/${bomRecord.ItemId.currentBOM}/parts` })}>
        <VisibilityRounded />
      </IconButton>
    );
  }

  return <></>;
}

export default memo(ShowBomRecordsButton);
