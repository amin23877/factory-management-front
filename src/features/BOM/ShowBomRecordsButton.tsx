import React, { memo } from "react";
import { IconButton } from "@material-ui/core";

import { ReactComponent as NarrowIcon } from "assets/icons/tableIcons/narrowDown.svg";

import { IBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

function ShowBomRecordsButton({ bomRecord }: { bomRecord: IBomRecord }) {
  if (bomRecord?.ItemId?.currentBOM) {
    return (
      <IconButton
        size="small"
        onClick={() => openRequestedSinglePopup({ url: `/panel/bom/${bomRecord.ItemId.currentBOM}/parts` })}
      >
        <NarrowIcon />
      </IconButton>
    );
  }

  return <></>;
}

export default memo(ShowBomRecordsButton);
