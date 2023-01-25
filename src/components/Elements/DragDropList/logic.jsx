import { useState } from "react";

export const [data, setData] = useState(itemData);

export const handleDragEnd = (result) => {
  if (!result.destination) return;
  const items = Array.from(data);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  console.log(items);
  setData(items);
};
