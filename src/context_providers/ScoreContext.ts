import { createContext} from "react";
import type { scoreContextShape } from "../interfaces/interfaces";



export const ScoreContext = createContext<scoreContextShape>({
    scoreState: 0,
    setScoreState: ()=>{}
})