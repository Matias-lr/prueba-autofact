import React, { FormEvent, useState, useEffect } from 'react'
import platform from 'platform'
import './card.css'
import Register from './register'
import Input from'../InpuText'
import useMyUserStore from '../../zustand/user-store'
import { Redirect } from 'react-router-dom'

const [useStore] = useMyUserStore;

export default () =>{
    const login = useStore(state => state.loginUser)
    const [datos,setState] =useState({
        email: '',
        password: ''
    })
    const handleSubmit=(event:FormEvent) =>{
        var device_name:string | undefined = platform.description
        event.preventDefault()
        console.log(device_name)
        login(datos.email,datos.password,device_name)
    }
    const handleChange = (e:any) =>{
        setState({
            ...datos,
            [e.target.name]:e.target.value})
    }
    return(
        <>
        {localStorage.getItem('token') && <Redirect to="/home"></Redirect>}
        <div className="Card">
            <div className="Card-header">
                <h1>Login</h1>
            </div>
            <div className="Card-body">
                <form onSubmit={handleSubmit}>
                    <Input type="text" name="email" id="email" placeholder="ingrese su email" required="true" onChange={handleChange}/><br></br>
                    <Input type="password" name="password" id="password" placeholder="ingrese su pass" required="true" onChange={handleChange}/><br></br>
                    <input type="submit" value="ingresar"/>
                </form>
            </div>
        </div>
        <Register/>
        </>
    )
}