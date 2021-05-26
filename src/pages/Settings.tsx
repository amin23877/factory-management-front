import React from "react";
import Container from "@material-ui/core/Container";
import UnderDev from "../app/UnderDevelopment";
import { FieldSelect } from "../app/Inputs";
import { getItems } from "../api/items";

export default function Settings() {
    return (
        <Container>
            {/* <UnderDev /> */}
            <FieldSelect request={getItems} itemTitleField="name" itemValueField="id" />
        </Container>
    );
}
