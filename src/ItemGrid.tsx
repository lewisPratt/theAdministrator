import { useEffect, useState } from "react";
import { carryableItems, shuffleItems } from "./CarryableItems";
import { Tooltip } from "react-tooltip";
import type { carryableItemsShape } from "./interfaces";

export default function ItemGrid() {
    const [itemsForGrid, setItemsForGrid] = useState<carryableItemsShape[] | null>(null)
  useEffect(() => {
    const theseItems = carryableItems
    shuffleItems(theseItems);
    setItemsForGrid(theseItems)
  }, []);
  
  return (
    <section id="item-grid">
      {itemsForGrid && 
      itemsForGrid.map((item) => {
        return (
          <div
            className="item-grid-item"
            data-tooltip-id="item-grid-tooltip"
            data-tooltip-content={
              item.description +
              " Status: " +
              (item.legal ? "Legal" : "Illegal")
            }
          >
            {item.itemComponent}
          </div>
        );
      })}
      <Tooltip id="item-grid-tooltip" />
    </section>
  );
}
