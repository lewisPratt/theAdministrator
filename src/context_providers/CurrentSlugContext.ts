import { createContext, type Dispatch, type SetStateAction} from "react";
interface currentSlugShape {
  currentSlug: string;
  setCurrentSlug: Dispatch<SetStateAction<string>>;
}


export const CurrentSlugContext = createContext<currentSlugShape>({
    currentSlug: "",
    setCurrentSlug: ()=>{}
})