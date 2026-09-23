import { createContext } from "react";

import type { unlockContextShape } from "../interfaces"; 


export const UnlocksContext = createContext<unlockContextShape>({
  playerUnlocks: null,
  setPlayerUnlocks: () => {},
});
