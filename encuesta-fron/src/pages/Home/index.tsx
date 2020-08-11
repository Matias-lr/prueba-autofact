import React, { useEffect, useState, FormEvent } from 'react'
import useMyUserStore from '../../zustand/user-store'
import useEncuestaStore from '../../zustand/encuesta-store'
import { Redirect } from 'react-router-dom'

const [useStore] = useMyUserStore
const [useEncuesta] = useEncuestaStore

export default () =>{
    const logout = useStore(state => state.logoutUser)
    const user = useStore(state => state.user)

    const handleLogout=async()=>{
        await logout()
    }
    return(
        <>
            {!localStorage.getItem('token') && <Redirect to="/login"></Redirect>}
            <a onClick={handleLogout}>Logout</a>
            <div>
                Nombre {user?.name} <br></br>
                email {user?.email}
            </div>
            {(user?.type ==='admin')? <div><Form/><Admin/></div> : <div><Form/></div>}
        </>
    )
}
const Admin = () =>{
    const getEncuesta = useEncuesta(state => state.getEncuesta)
    const encuestas = useEncuesta(state => state.encuestas)
    useEffect(()=>{
        (async function x(){
            await getEncuesta()
        })()
    },[])
    return(
        <div className="Card">
            <table>
                <tr>
                    <th>Que le agregaria al informe?|</th>
                    <th>la info es correcta|</th>
                    <th>de 1 a 5|</th>
                    <th>usuario|</th>
                </tr>
            {encuestas && 
            encuestas.map((encuesta:any)=>{
                return  <tr>
                            <td>{encuesta.agregarlealinforme}</td>
                            <td>{encuesta.escorrecta}</td>
                            <td>{encuesta["1a5"]}</td>
                            <td>{encuesta["user_id"]}</td>
                        </tr>
            })}
            </table>
        </div>
    )
}
const Form = () =>{
    const user = useStore(state => state.user)
    const [datos,setState] =useState({
        add: '',
        escorrecta:'',
        '1a5': 0,
        user:user?.id
    })
    const postEncuesta = useEncuesta(state =>state.postEncuesta)
    const handleChange = (e:any) =>{
        setState({
            ...datos,
            [e.target.name]:e.target.value})
    }
    const handleSubmit=async(e:FormEvent) => {
        e.preventDefault()
        await postEncuesta(datos.add,datos.escorrecta,datos["1a5"],datos.user)
    }
    return(
        <div className="Card">
            <div className="Card-Header">
        <h1>form {user?.name}</h1>
            </div>
            <div className="Card-body">
                <form onSubmit={handleSubmit}>
                    <div style={{width:'100%'}}>
                        <label htmlFor="">Que te gustaria que agregaramos al informe ?</label>{"\n"}
                        <textarea name="add" id="add" onChange={handleChange} rows={2} required />
                    </div>
                    <div style={{width:'100%'}}>
                        <label htmlFor="">la informacion es correcta?</label>
                        <select name="escorrecta" id="escorrecta" onChange={handleChange}>
                            <option value="si">si</option>
                            <option value="no">no</option>
                            <option value="Mas o Menos">Mas o Menos</option>
                        </select>
                    </div>
                    <div style={{width:'100%'}}>
                        <label htmlFor="">de 1 a 5,es rapido el sitio?</label>
                        <select name="1a5" id="1a5" onChange={handleChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div style={{width:'100%'}}>
                        <input type="submit" value="Enviar encuesta"/>
                    </div>
                </form>
            </div>
            
        </div>
    )
}