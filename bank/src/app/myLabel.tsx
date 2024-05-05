export default function MyLabel(props: any){
    return(
        <label htmlFor={props.htmlFor} className="font-bold text-sky-500 transition delay-50 duration-50 ease-in-out hover:text-sky-400 text-xl mt-2">{props.text}</label>
    )
}