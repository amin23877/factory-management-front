import { useCallback, useState } from "react";

export function useCart<T>({ isEqual }: { isEqual: (a: T, b: T) => boolean }) {
  const [selectedItems, setSelectedItems] = useState<{ item: T; usage: number }[]>([]);

  const handleAddItem = useCallback(
    (item: T) => {
      const index = selectedItems.findIndex((i) => isEqual(i.item, item));
      if (index > -1) {
        setSelectedItems((p) => {
          const temp = p.concat();
          temp[index] = { ...temp[index], usage: temp[index].usage + 1 };
          return temp;
        });
      } else {
        setSelectedItems((p) => p.concat([{ item, usage: 1 }]));
      }
    },
    [isEqual, selectedItems]
  );

  const handleRemove = (item: T) => {
    const index = selectedItems.findIndex((i) => isEqual(i.item, item));
    if (index > -1) {
      setSelectedItems((p) => {
        const temp = p.concat();
        if (temp[index].usage > 1) {
          temp[index] = { ...temp[index], usage: temp[index].usage - 1 };
          return temp;
        } else if (temp[index].usage === 1) {
          return temp.filter((i) => !isEqual(i.item, item));
        }
        return temp;
      });
    }
  };

  const handleDeleteItem = (item: T) => {
    setSelectedItems((p) => p.filter((i) => !isEqual(i.item, item)));
  };

  return { selectedItems, setSelectedItems, handleAddItem, handleRemove, handleDeleteItem };
}
