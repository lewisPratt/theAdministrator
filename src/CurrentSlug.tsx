
interface CurrentSlugProps{
    pageName: string
}
export default function CurrentSlug({pageName}: CurrentSlugProps){

    return (
        <p id='slug-p'>Current: <span>{pageName}</span> </p>
    )

}