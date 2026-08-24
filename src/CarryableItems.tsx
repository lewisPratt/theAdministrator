import type { carryableItemsShape } from "./interfaces";
import {
  Smartphone,
  Wallet,
  Key,
  Watch,
  Glasses,
  Camera,
  Umbrella,
  Flashlight,
  Banknote,
  CreditCard,
  BookOpen,
  Newspaper,
  Compass,
  Map,
  Backpack,
  Briefcase,
  Coins,
  Radio,
  IdCard,
  Pill,
  PillBottle,
  Syringe,
  Cigarette,
  PocketKnife,
  FlaskConical,
  Scissors,
} from "lucide-react";

function shuffleItems(a: carryableItemsShape[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

const carryableItems: carryableItemsShape[] = [
  { itemComponent: <Smartphone />, legalStatus: 1 },
  { itemComponent: <Wallet />, legalStatus: 1 },
  { itemComponent: <Key />, legalStatus: 1 },
  { itemComponent: <Watch />, legalStatus: 1 },
  { itemComponent: <Glasses />, legalStatus: 1 },
  { itemComponent: <Camera />, legalStatus: 1 },
  { itemComponent: <Umbrella />, legalStatus: 1 },
  { itemComponent: <Banknote />, legalStatus: 1 },
  { itemComponent: <CreditCard />, legalStatus: 1 },
  { itemComponent: <BookOpen />, legalStatus: 1 },
  { itemComponent: <Compass />, legalStatus: 1 },
  { itemComponent: <Map />, legalStatus: 1 },
  { itemComponent: <Backpack />, legalStatus: 1 },
  { itemComponent: <Briefcase />, legalStatus: 1 },
  { itemComponent: <Coins />, legalStatus: 1 },
  { itemComponent: <IdCard />, legalStatus: 1 },

  { itemComponent: <Newspaper />, legalStatus: -1 },
  { itemComponent: <Radio />, legalStatus: -1 },
  { itemComponent: <Flashlight />, legalStatus: -1 },
  { itemComponent: <Pill />, legalStatus: -1 },
  { itemComponent: <PillBottle />, legalStatus: -1 },
  { itemComponent: <Syringe />, legalStatus: -1 },
  { itemComponent: <Cigarette />, legalStatus: -1 },
  { itemComponent: <PocketKnife />, legalStatus: -1 },
  { itemComponent: <FlaskConical />, legalStatus: -1 },
  { itemComponent: <Scissors />, legalStatus: -1 },
];
export function createItems() {
  const numberOfItems = Math.random() * 4;
  let itemsArray = [];
  for (let index = 0; index < numberOfItems; index++) {
    shuffleItems(carryableItems);
    itemsArray.push(carryableItems[0]);
  }
  return itemsArray
}
