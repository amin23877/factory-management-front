import React, { memo } from "react";
import { IconButton } from "@material-ui/core";
import { VisibilityRounded } from "@material-ui/icons";

import { openRequestedSinglePopup } from "logic/window";
import { jobRecordType } from "api/job";

function ShowBomRecordsButton({ jobRecord }: { jobRecord: jobRecordType }) {
  if (jobRecord?.ItemId) {
    return (
      <IconButton
        size="small"
        onClick={() => openRequestedSinglePopup({ url: `/panel/bom/${jobRecord.ItemId}/parts` })}
      >
        <VisibilityRounded fontSize="small" />
      </IconButton>
    );
  }

  return <></>;
}

export default memo(ShowBomRecordsButton);
