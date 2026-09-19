
interface CurrentSlugProps{
    pageName: string
}
export default function CurrentSlug({pageName}: CurrentSlugProps){

    return (
        <div id='slug-container'><p id='slug-p'>Current: <span>{pageName}</span> </p></div>
    )

}