// import React, { useState } from "react";

// import { Tab, Tabs, Box } from "@material-ui/core";

// import Table from "./Table";
// import Details from "./Details";
// import { IUnit } from "../../../../api/units";

// function Index() {
//     const [selectedUnit, setSelectedUnit] = useState<IUnit | null>(null);
//     const [activeTab, setActiveTab] = useState(0);
//     return (
//         <Box>
//             <Box display="flex">
//                 <Tabs
//                     textColor="primary"
//                     style={{ marginBottom: "1em" }}
//                     value={activeTab}
//                     onChange={(e, nv) => setActiveTab(nv)}
//                 >
//                     <Tab label="List" />
//                     <Tab label="Details" disabled={!selectedUnit} />
//                 </Tabs>
//                 <div style={{ flex: 1 }}></div>
//             </Box>
//             {activeTab === 0 && <Table setActiveTab={setActiveTab} setSelectedUnit={setSelectedUnit} />}
//             {activeTab === 1 && selectedUnit && <Details unit={selectedUnit} />}
//         </Box>
//     );
// }

// export default Index;
