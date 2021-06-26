import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";

import { SearchBar } from "../app/TextField";


export default function Unit() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <Box display="flex" alignItems="center" my={2}>
                <SearchBar />
                <div style={{ flexGrow: 1 }} />
            </Box>
            slam
        </Container>
    );
}
