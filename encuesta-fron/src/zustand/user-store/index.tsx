import create,{SetState,GetState} from 'zustand'
import ApiCall from '../../axios'

interface State{
    isAuth: boolean,
    AuthError:string | undefined | number,
    AuthErrorText:string,
    user:user | null,
    getUser:()=>void,
    regUser:(name:string,password:string,email:string,type:string)=>void,
    loginUser:(email:string,password:string,device_name:string | undefined)=>void,
    logoutUser:()=>void
}
interface user{
    id:number,
    name:string,
    email:string,
    email_verifed_at:null,
    type:string,
    created_at:string,
    updated_at:string
}

export default create((setState:SetState<State>,getState:GetState<State>): any =>{
    return{
        isAuth: async ()=>{return await getState().getUser()},
        AuthError: '',
        AuthErrorText: '',
        user: null,
        getUser: async ()=>{
            await ApiCall('/user',null,{
                'Authorization': `Bearer ${localStorage.getItem('token')? localStorage.getItem('token') : sessionStorage.getItem('token')}`
            })
            .then((response)=>{
                var user = response.data
                setState({user})
                setState({isAuth:true})
            })
            .catch((error)=>{
                setState({isAuth:false})
                setState({user:null})
            })
        },
        regUser: async (name:string,password:string,email:string,type:string)=>{
            await ApiCall('/register',{name,password,email,type},null,'post')
            .then((response)=>alert('register complete'))
            .catch((error)=>alert(error))
        },
        loginUser: async (email:string,password:string,device_name:string | undefined)=>{
            await ApiCall('/loginUser',{email,password,device_name},null,'post')
            .then((r) => {
                localStorage.removeItem('token')
                localStorage.setItem('token',r.data)
                getState().getUser()
            })
            .catch((error)=>{
                alert(error.message)
                setState({AuthError:error})
                getState().getUser()
            })
        },
        logoutUser: async ()=>{
            await ApiCall('/logout',null,{
                'Authorization': `Bearer ${localStorage.getItem('token')? localStorage.getItem('token') : sessionStorage.getItem('token')}`
            })
            .then((response)=>{
                localStorage.removeItem('token')
                getState().getUser()
            })
        }
    }
})