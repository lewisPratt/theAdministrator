import { useContext } from "react"
import { AdminContext } from "./context_providers/AdminContext"
interface CurrentSlugProps{
    pageName: string
}
export default function CurrentSlug({pageName}: CurrentSlugProps){

    const {adminName ,setAdminName } =useContext(AdminContext)
    return (
        <>
        {adminName &&
        <div id='slug-container'><p id='slug-p'>Current: <span>{pageName}</span> </p></div>
        }
        </>
    )

}