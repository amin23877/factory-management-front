import React, { useState } from "react";
import { Box } from "@material-ui/core";

import Button from "../../../app/Button";
import BOMModal from "./Setting";
import BOMTable from "./Table";

function BOM() {
    const [addBomModal, setAddBomModal] = useState(false);
    const [productFamily, setProductFamily] = useState<string>("DE3");

    return (
        <Box display="flex" justifyContent="center" alignItems="flex-top" height="70vh">
            <BOMModal
                open={addBomModal}
                onClose={() => setAddBomModal(false)}
                onDone={(d) => {
                    setProductFamily(d);
                    setAddBomModal(false);
                }}
            />
            {productFamily && <BOMTable productFamily={productFamily} />}
            {!productFamily && (
                <Button variant="outlined" onClick={() => setAddBomModal(true)}>
                    Create new BOM matrice
                </Button>
            )}
        </Box>
    );
}

export default BOM;
