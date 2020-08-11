export interface Props{
    type?:string,
    id:string,
    name:string,
    placeholder:string,
    required:string,
    onChange?:(event: MouseEvent) => void,
    onBlur?:(event: MouseEvent) => void
}