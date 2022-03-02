import { useCallback, useState } from "react";

import Confirm from "common/Confirm";
import { IItem } from "api/items";

export type lineItemType = {
  group: number;
  line: number;
  ItemId: string;
  ServiceId: string;
  qty: number;
  price: number;
  UnitId: string;
  standardWarranty: boolean;
  unit: boolean;
  text?: string;

  // My fields
  type: "device" | "option" | "service";
  ItemObject?: IItem;
  ServiceObject?: any;
  serviceProgramItemNo?: string;
};

// TODO: maybe some day make this hook a context, Provide it for all the table and remove the props, Then enjoy the beauty :)
export default function useGroupedLineItems() {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number>();

  const addGroup = useCallback(() => {
    setGroups((prev: any[]) => [...prev, []]);
  }, []);

  const deleteGroup = useCallback((index: number) => {
    setGroups((prev: any[]) => prev.filter((_, i) => i !== index));
  }, []);

  const addLineItemToGroup = useCallback((groupIndex: number, data: any) => {
    setGroups((prev: any[]) => {
      const temp = prev.concat();
      if (data.type === "device" && temp[groupIndex].some((l: any) => l.type === "device")) {
        return temp;
      }
      temp[groupIndex].push(data);

      return temp;
    });
  }, []);

  const editLineItem = useCallback((groupIndex: number, lineItemIndex: number, data: any) => {
    setGroups((prev: any[]) => {
      const temp = prev.concat();
      temp[groupIndex][lineItemIndex] = data;

      return temp;
    });
  }, []);

  const deleteLineItem = useCallback(
    (groupIndex: number, lineItemIndex: number) => {
      setGroups((prev: any[]) => {
        const temp = prev.concat();
        if (temp[groupIndex][lineItemIndex].type === "device") {
          Confirm({
            text: "Delete device of group will delete the whole group",
            onConfirm: () => {
              deleteGroup(groupIndex);
            },
          });
        } else {
          temp[groupIndex] = temp[groupIndex].filter((_: any, i: number) => i !== lineItemIndex);
        }

        return temp;
      });
    },
    [deleteGroup]
  );

  const changeGroupUnitId = useCallback((groupIndex: number, UnitId?: string) => {
    setGroups((prev) => {
      const temp = prev.concat();
      temp[groupIndex] = temp[groupIndex].map((li: any) => ({ ...li, UnitId }));

      return temp;
    });
  }, []);

  return {
    groups,
    selectedGroup,
    setSelectedGroup,
    addGroup,
    deleteGroup,
    addLineItemToGroup,
    editLineItem,
    deleteLineItem,
    changeGroupUnitId,
  };
}
