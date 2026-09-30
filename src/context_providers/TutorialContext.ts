import { createContext} from "react";
import type { tutorialContextShape } from "../interfaces/interfaces";



export const TutorialContext = createContext<tutorialContextShape>({
    tutorialState: {tutorialActive: true, tutorialStep:0},
    setTutorialState: ()=>{}
})