import React from "react";
import Container from "@material-ui/core/Container";
import UnderDev from "../app/UnderDevelopment";

import ClientTypeAutocomplete from "../features/Client/ClientTypeAutocomplete";

export default function Settings() {
    return (
        <Container>
            {/* <UnderDev /> */}
            <ClientTypeAutocomplete />
        </Container>
    );
}
