import React, { useState } from "react";
import { Box } from "@material-ui/core";

import Button from "../../../app/Button";
import BOMModal from "./Setting";
import BOMTable from "./Table";

function BOM() {
    const [addBomModal, setAddBomModal] = useState(false);
    const [cluster, setCluster] = useState<string>();
    const [levels, setLevels] = useState<string[]>();
    const [parts, setParts] = useState<number>();

    const canShowTable = cluster && levels && parts;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
            <BOMModal
                open={addBomModal}
                onClose={() => setAddBomModal(false)}
                onDone={(d) => {
                    setCluster(d.cluster);
                    setLevels(["1 " + d.level, "2 " + d.level]);
                    setParts(d.partnumbers);
                    setAddBomModal(false);
                }}
            />
            {canShowTable && cluster && levels && parts && (
                <BOMTable cluster={cluster} levels={levels} partnumbers={parts} />
            )}
            {!canShowTable && (
                <Button variant="outlined" onClick={() => setAddBomModal(true)}>
                    Add new BOM matrice
                </Button>
            )}
        </Box>
    );
}

export default BOM;
