import React, { useMemo } from "react";
import { Container, Typography } from "@material-ui/core";
import { GridColumns } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useHistory } from "react-router-dom";

import BaseDataGrid from "../app/BaseDataGrid";

function Parts() {
    const { bomId } = useParams<{ bomId: string }>();
    const { data: bomRecords } = useSWR(bomId ? `/bomrecord?BOMId=${bomId}` : null);
    let history = useHistory();

    const bomRecordCols = useMemo<GridColumns>(
        () => [
            { field: "no", headerName: "No.", valueFormatter: (params) => params.row?.ItemId?.no, width: 120 },
            { field: "name", headerName: "Name", valueFormatter: (params) => params.row?.ItemId?.name, flex: 1 },
            { field: "revision", headerName: "Revision", width: 120 },
            { field: "usage", headerName: "Usage", width: 80 },
            { field: "fixedQty", headerName: "Fixed QTY", type: "boolean", width: 120 },
        ],
        []
    );

    if (!bomId) {
        <Container>
            <Typography>Sorry, Can't find Parts for this bom</Typography>
        </Container>;
    }

    return (
        <Container>
            <BaseDataGrid
                cols={bomRecordCols}
                rows={bomRecords || []}
                onRowSelected={(d) => {
                    history.push(`/panel/inventory/${d.ItemId.id}`);
                }}
            />
        </Container>
    );
}

export default Parts;
