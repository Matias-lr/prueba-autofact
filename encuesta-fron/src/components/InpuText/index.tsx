import React, {useState, useEffect} from 'react'
import './input.css'
import {Props} from './types'

const InpuText = (props:Props) =>{
    const inputType = props.type
    const inputId = props.id
    const inputName = props.name
    const inputPlaceholder = props.placeholder
    const [inputValue, setInputValue] = useState('')
    const inputRequest = props.required
    /*var valuex:any

    const handleSubmit = (event:any) =>{
        valuex = document.getElementById(inputId) as HTMLInputElement
        if(inputRequest == 'true' && valuex.value !=""){
                event.preventDefault()
                console.log(valuex.value)
                //encontrar forma de validaciones
        }
    }
    document.getElementById(inputId)?.closest("form")?.addEventListener("submit",handleSubmit)
    esta fue casi una buena idea*/
    const handleBlur = (event:any) =>{
        if(props.onBlur) props.onBlur(event)
        if(event.target.value == "" && inputRequest == 'true'){
            event.target.style = "border-bottom:1px solid #c0392b"
        }else{
            event.target.style = "border-bottom:1px solid #2980b9"
        }
    }

    const handleChange = (event:any) =>{
        setInputValue(event.target.value);
        if(props.onChange) props.onChange(event) //<-correccion inportante para tener el state actualizado
    }
    return(
        <div className='input-container'>
            <input type={inputType} value={inputValue} id={inputId} name={inputName} onChange={handleChange} onBlur={handleBlur}/>
            <label>{inputPlaceholder}</label>
        </div>
    )
}
export default InpuText;