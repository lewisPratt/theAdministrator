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
  Shovel,
  Ticket,
  Drone,
  Wrench,
  Hamburger,
  Origami,
  ChessPawn,
  Candy,
  PaperBag,
  Pizza,
  Sandwich,
  HatGlasses,
  Axe,
  Drill,
  RobotArm,
  PlayingCard,
  PlayingCards,
  KeySquare,
  Bitcoin,
  Rose,
  AlarmClock,
  SprayCan,
  Gamepad,
  Dices,
  Puzzle,
  Container,
  Paperclip,
  Disc3
} from "lucide-react";

export function shuffleItems(a: carryableItemsShape[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

export const carryableItems: carryableItemsShape[] = [
  { itemComponent: <Smartphone />, legal: true , description: 'Smartphone. '},
  { itemComponent: <Wallet />, legal: true , description: 'Wallet'},
  { itemComponent: <KeySquare />, legal: true, description: 'Set of keys' },
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
  { itemComponent: <IdCard />, legal: true , description: 'ID card'},
  { itemComponent: <IdCard />, legal: true , description: 'ID card'},
  { itemComponent: <Ticket />, legal: true , description: 'GravRail ticket'},
  { itemComponent: <Hamburger />, legal: true , description: 'A cold Hamburger'},
  { itemComponent: <Origami />, legal: true , description: 'An origami swan'},
  { itemComponent: <ChessPawn />, legal: true , description: 'A loose chess pawn.'},
  { itemComponent: <Candy />, legal: true , description: 'Loose candies'},
  { itemComponent: <Hamburger />, legal: true , description: 'A cold Hamburger'},
  { itemComponent: <PaperBag />, legal: true , description: 'An empty lunch bag'},
  { itemComponent: <Pizza />, legal: true , description: 'A cold slice of pizza'},
  { itemComponent: <Sandwich />, legal: true , description: 'A gross looking sandwich'},
  { itemComponent: <Drill />, legal: true , description: 'A cordless drill'},
  { itemComponent: <PlayingCard />, legal: true , description: 'A single playing card'},
  { itemComponent: <PlayingCards />, legal: true , description: 'A pack of playing cards'},
  { itemComponent: <Bitcoin />, legal: true , description: 'A worthless amount of Bitcoin'},
  { itemComponent: <Rose />, legal: true , description: 'A single rose'},
  { itemComponent: <AlarmClock />, legal: true , description: 'An old fashioned alarm clock'},
  { itemComponent: <Gamepad />, legal: true , description: 'A handheld gaming device'},
  { itemComponent: <Puzzle />, legal: true , description: 'A single jigsaw piece'},
  { itemComponent: <Container />, legal: true , description: 'An empty cardboard box'},
  { itemComponent: <Paperclip />, legal: true , description: 'A paperclip'},



  { itemComponent: <Disc3 />, legal: false , description: 'A disc containing pirated media'},
  { itemComponent: <Dices />, legal: false , description: 'Some loose dice'},
  { itemComponent: <SprayCan />, legal: false , description: 'A half empty spray can'},
  { itemComponent: <RobotArm />, legal: false , description: 'A black market robotic augmentation'},
  { itemComponent: <Axe />, legal: false , description: 'A dangerously sharp axe'},
  { itemComponent: <HatGlasses />, legal: false , description: 'A suspicious outfit'},
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
  { itemComponent: <Shovel />, legal: false , description: 'A dirty shovel'},
  { itemComponent: <Drone />, legal: false , description: 'An unregistered drone'},
  { itemComponent: <Wrench />, legal: false , description: 'A Wrench'},

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
