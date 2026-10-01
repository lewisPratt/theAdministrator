import { createContext } from "react";
import type { playerContextShape } from "../interfaces/interfaces";
import { newPlayerData } from "../models/newPlayerData";




export const PlayerContext = createContext<playerContextShape>({
  playerData: newPlayerData,
  setPlayerData: () => {},
});
