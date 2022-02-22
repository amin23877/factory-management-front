import React from "react";
import { Container, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import PartsTable from "features/BOM/PartsTable";

function Parts() {
  const { bomId } = useParams<{ bomId: string }>();

  if (!bomId) {
    <Container>
      <Typography>Sorry, Can't find Parts for this BOM</Typography>
    </Container>;
  }

  //   const { data: bomRecords } = useSWR<{ result: IBomRecord[]; total: number }>(`/bomrecord?BOMId=${bomId}`);
  //   let history = useHistory();

  //   const bomRecordCols = useMemo<GridColumns>(
  //     () => [
  //       { field: "no", headerName: "No.", valueFormatter: (params) => params.row?.ItemId?.no, width: 120 },
  //       { field: "name", headerName: "Name", valueFormatter: (params) => params.row?.ItemId?.name, flex: 1 },
  //       { field: "revision", headerName: "Revision", width: 120 },
  //       { field: "usage", headerName: "Usage", width: 80 },
  //       { field: "fixedQty", headerName: "Fixed QTY", type: "boolean", width: 120 },
  //     ],
  //     []
  //   );

  return (
    <Container>
      {/* <BaseDataGrid
        cols={bomRecordCols}
        rows={bomRecords?.result || []}
        onRowSelected={(d) => {
          history.push(`/panel/inventory/${d.ItemId.id}`);
        }}
      /> */}
      <PartsTable bomId={bomId} />
    </Container>
  );
}

export default Parts;
