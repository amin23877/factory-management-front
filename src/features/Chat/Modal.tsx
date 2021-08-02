import React, { useState } from "react";
import { Box } from "@material-ui/core";

import Dialog from "../../app/Dialog";
import EmployeeList from "./List";
import ChatForm from "./Form";
import ChatList from "./ChatList";

export default function ChatModal({ onClose, open }: { open: boolean; onClose: () => void }) {
    const [activeUser, setActiveUser] = useState(0);

    return (
        <Dialog title="Chat" open={open} onClose={onClose} fullWidth maxWidth="xl">
            <Box m={2} height={530} display="grid" gridTemplateColumns="220px 1fr">
                <EmployeeList value={activeUser} onChange={(e, nv) => setActiveUser(nv)} />
                <Box ml={1} display="flex" flexDirection="column">
                    <div style={{ flexGrow: 1 }}>
                        <ChatList user={activeUser} />
                    </div>
                    <ChatForm />
                </Box>
            </Box>
        </Dialog>
    );
}
