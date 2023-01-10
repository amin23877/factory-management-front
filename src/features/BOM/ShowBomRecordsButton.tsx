import React, { memo } from "react";

import { ReactComponent as NarrowIcon } from "assets/icons/tableIcons/narrowDown.svg";

import { IBomRecord } from "api/bom";
import { openRequestedSinglePopup } from "logic/window";

function ShowBomRecordsButton({ bomRecord }: { bomRecord: IBomRecord }) {
  if (bomRecord?.ItemId?.currentBOM) {
    return (
      <span onClick={() => openRequestedSinglePopup({ url: `/panel/bom/${bomRecord.ItemId.currentBOM}/parts` })}>
        <NarrowIcon />
      </span>
    );
  }

  return <></>;
}

export default memo(ShowBomRecordsButton);
