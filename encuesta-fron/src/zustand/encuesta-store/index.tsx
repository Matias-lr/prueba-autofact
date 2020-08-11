import create,{SetState,GetState} from 'zustand'
import ApiCall from '../../axios'

export default create((setState:SetState<any>,getState:GetState<any>): any =>{
    return{
        encuestas: null,
        getEncuesta: async ()=>{
            await ApiCall('/getEncuestas',null,{
                'Authorization': `Bearer ${localStorage.getItem('token')? localStorage.getItem('token') : sessionStorage.getItem('token')}`
            }).then(
                (response) => setState({encuestas:response.data})
            )
        },
        postEncuesta: async (add:string,escorrecta:string,unoacinco:number,user:number)=>{
            await ApiCall('/postEncuesta',{add,escorrecta,'1a5':unoacinco,'user_id':user},{
                'Authorization': `Bearer ${localStorage.getItem('token')? localStorage.getItem('token') : sessionStorage.getItem('token')}`
            },'post').then(
                (response) => alert("encuesta enviada con exito")
            ).catch((error) => console.log(error))
        }
    }
})