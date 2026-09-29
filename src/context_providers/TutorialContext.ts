import { createContext, type Dispatch, type SetStateAction } from "react";
import type { tutorialContextShape } from "../interfaces/interfaces";



export const TutorialContext = createContext<tutorialContextShape>({
    tutorialState: true,
    setTutorialState: ()=>{}
})