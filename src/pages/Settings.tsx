import React from "react";
import Container from "@material-ui/core/Container";

import UnderDev from "../app/UnderDevelopment";
import LinkSelect from "../app/Inputs/LinkFields";
import { getAllEmployees } from "../api/employee";

export default function Settings() {
    return (
        <Container>
            {/* <UnderDev /> */}
            {/* <LinkSelect
                request={getAllEmployees}
                getOptionLabel={(emp) => emp.username}
                getOptionValue={(emp) => emp.id}
                label="Assignee"
                url="/panel/sales"
            /> */}
        </Container>
    );
}
