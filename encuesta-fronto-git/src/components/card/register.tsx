import './card.css'
import React, { useState, FormEvent, ChangeEvent } from 'react'
import Input from'../InpuText'
import useMyUserStore from '../../zustand/user-store'

const [useStore] = useMyUserStore;

export default () =>{
        const [datos,setState] =useState({
            name: '',
            email: '',
            password: '',
            type:''
        })
        const register = useStore(state => state.regUser)
        const handleChange = (e:any) =>{
            setState({
                ...datos,
                [e.target.name]:e.target.value})
        }
        const handleSubmit = (e: FormEvent) =>{
            e.preventDefault()
            register(datos.name,datos.password,datos.email,datos.type)
        }
        return(
            <div className="Card">
                <div className="Card-header">
                    <h1>Registro</h1>
                </div>
                <div className="Card-body">
                    <form action="" id="formRegister" onSubmit={handleSubmit}>
                        <Input type="text" placeholder="ingrese su nombre" name="name" id="name" required="true" onChange={handleChange}/>
                        <Input type="text" placeholder="ingrese su email" name="email" id="email" required="true" onChange={handleChange}/>
                        <Input type="password" placeholder='ingrese su email' name="password" id="password" required="true" onChange={handleChange}/>
                        <select name="type" id="type" onChange={handleChange}>
                            <option value="admin">admin</option>
                            <option value="comun">comun</option>
                        </select>
                        <input type="submit" value="Registrarse"/>
                    </form>
                </div>
            </div>
    )
}