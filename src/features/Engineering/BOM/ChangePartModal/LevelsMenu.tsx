import React from "react";
import { Box, CircularProgress, Popover } from "@material-ui/core";
import useSWR from "swr";

import { ILevel } from "api/level";
import { ArraySelect } from "app/Inputs";

export default function LevelsMenu({
  anchorEl,
  clusterId,
  levelFilters,
  setLevelFilters,
  onClose,
  setFieldValue,
}: {
  anchorEl?: HTMLElement;
  clusterId?: string;
  levelFilters: any;
  setLevelFilters: any;
  onClose: () => void;
  setFieldValue?: any;
}) {
  const { data: levels } = useSWR<{ result: ILevel[]; total: number }>(
    clusterId ? `/level?clusterId=${clusterId}` : null
  );

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {!levels && (
        <Box p={1} width="45vw" height="25vh" display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {levels && levels?.result && (
        <Box p={1} width="45vw" height="25vh" display="grid" gridTemplateColumns="repeat(3, 1fr)" style={{ gap: 8 }}>
          {levels.result.map((l) => (
            <ArraySelect
              key={l.id}
              label={l.name}
              items={l.valid.map((val) => val.value + "‌" + val.uom) || []}
              value={levelFilters && levelFilters[l.name]}
              onChange={(e) => {
                setLevelFilters((p: any) => ({ ...(p || {}), [l.name]: e.target.value }));
                if (setFieldValue)
                  setFieldValue(l.name, { value: e.target.value.split("‌")[0], uom: e.target.value.split("‌")[1] });
              }}
            />
          ))}
        </Box>
      )}
    </Popover>
  );
}
