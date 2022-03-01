import React, { memo } from "react";
import { IconButton } from "@material-ui/core";
import { VisibilityRounded } from "@material-ui/icons";

import { IBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

function ShowBomRecordsButton({ bomRecord }: { bomRecord: IBomRecord }) {
  if (bomRecord?.ItemId?.currentBOM) {
    return (
      <IconButton
        size="small"
        onClick={() => openRequestedSinglePopup({ url: `/panel/bom/${bomRecord.ItemId.currentBOM}/parts` })}
      >
        <VisibilityRounded fontSize="small" />
      </IconButton>
    );
  }

  return <></>;
}

export default memo(ShowBomRecordsButton);
