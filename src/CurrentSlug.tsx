import { useContext } from "react"
import { AdminContext } from "./context_providers/AdminContext"
import type { CurrentSlugProps } from "./interfaces/interfaces"
export default function CurrentSlug({pageName}: CurrentSlugProps){

    const {adminName } =useContext(AdminContext)
    return (
        <>
        {adminName &&
        <div id='slug-container'><p id='slug-p'>Current: <span>{pageName}</span> </p></div>
        }
        </>
    )

}