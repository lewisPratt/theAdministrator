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
  { itemComponent: <Smartphone />, legal: true , description: 'Smartphone. '},
  { itemComponent: <Wallet />, legal: true , description: 'Wallet'},
  { itemComponent: <Key />, legal: true, description: 'Set of keys' },
  { itemComponent: <Watch />, legal: true , description: 'Cheap watch'},
  { itemComponent: <Glasses />, legal: true , description: 'Reading Glasses'},
  { itemComponent: <Camera />, legal: true , description: 'Digital camera'},
  { itemComponent: <Umbrella />, legal: true , description: 'Umbrella'},
  { itemComponent: <Banknote />, legal: true , description: 'Cash'},
  { itemComponent: <CreditCard />, legal: true, description: 'Cred Card' },
  { itemComponent: <BookOpen />, legal: true, description: 'Authorized literature' },
  { itemComponent: <Compass />, legal: true , description: 'Compass'},
  { itemComponent: <Map />, legal: true , description: 'Map of the city'},
  { itemComponent: <Backpack />, legal: true , description: 'Backpack'},
  { itemComponent: <Briefcase />, legal: true , description: 'Briefcase'},
  { itemComponent: <Coins />, legal: true , description: 'Change'},
  { itemComponent: <IdCard />, legal: true , description: 'ID papers'},

  { itemComponent: <Newspaper />, legal: false , description: 'Contraband newspaper clipping'},
  { itemComponent: <Radio />, legal: false , description: 'Unauthorized radio device'},
  { itemComponent: <Flashlight />, legal: false , description: 'Non Regulation Flashlight'},
  { itemComponent: <Pill />, legal: false , description: 'Suspiciously Loose pills'},
  { itemComponent: <PillBottle />, legal: false , description: 'Prescription Pills in someone elses name'},
  { itemComponent: <Syringe />, legal: false , description: 'Syringe [empty]'},
  { itemComponent: <Cigarette />, legal: false , description: 'Bootleg Cigarettes'},
  { itemComponent: <PocketKnife />, legal: false , description: 'A pocketknife'},
  { itemComponent: <FlaskConical />, legal: false , description: 'Flask of strong smelling alcohol'},
  { itemComponent: <Scissors />, legal: false , description: 'Surgical scissors'},
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
