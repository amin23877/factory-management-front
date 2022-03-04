import React from "react";
import { Container } from "@material-ui/core";

import UnderDev from "app/UnderDevelopment";
// import LinesTable from "components/LinesTable";
// import { ILineItem } from "api/lineItem";
// import { IItem } from "api/items";

export default function Settings() {
  // const [createdItems, setCreatedItems] = useState<any>([]);

  // const handleAddItem = (d: ILineItem, i?: IItem) => {
  //   if (d) {
  //     console.log({ d, i });

  //     setCreatedItems((prev: any) => prev.concat({ ...d, i }));
  //   }
  // };

  // const handleEdit = (d: ILineItem, index: number, i: any, belongsTo?: number, itemId?: string) => {
  //   if (d) {
  //     const newArray = createdItems.slice();
  //     if (belongsTo) {
  //       newArray[index] = { ...d, i, belongsTo: belongsTo, belongsToItemId: itemId };
  //     } else {
  //       newArray[index] = { ...d, i };
  //     }
  //     setCreatedItems(newArray);
  //   }
  // };

  // const handleAddService = (d: ILineItem, index: any, i: any, itemId?: string) => {
  //   if (d) {
  //     let first = createdItems.slice(0, index);
  //     let second = createdItems.slice(index);
  //     setCreatedItems(first.concat({ ...d, i, belongsTo: index, belongsToItemId: itemId }, second));
  //   }
  // };

  // const handleDeleteItem = async (index: number) => {
  //   setCreatedItems((prev: any) => prev.filter((item: any, ind: number) => ind !== index));
  // };

  return (
    <Container>
      <UnderDev />
      {/* <button onClick={() => console.log({ createdItems })}>Log</button>
      <div style={{ height: 600 }}>
        <LinesTable
          createdItems={createdItems}
          handleAddService={handleAddService}
          handleDelete={handleDeleteItem}
          handleEdit={handleEdit}
          handleSubmit={handleAddItem}
        />
      </div> */}
    </Container>
  );
}
