import axios from "axios";
import { useContext, useState } from "react"
import { AiOutlineCloseCircle, AiOutlineLogin } from "react-icons/ai"
import { UserContext } from "../UserContext";
import { BarLoader } from "react-spinners";
import { Link, Navigate } from "react-router-dom";
import NotificationContext from "../NotificationContext";
import Notification from "../utils/Notification";
const LoginAdmin = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handlerror, setHandlerror] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const {setUser, setReady} = useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);

    function closeerror(ev){
      ev.preventDefault();
      setHandlerror('');
    }
    async function handleSubmit(ev){
        ev.preventDefault();
        setLoading(true);
       try {
             
    const {data} = await axios.put('/user/login', {email,password});
        
        setUser(data); 
        setReady(true);
        setLoading(false);
        
        notificationHandler({type:'success', message:'Login success...Welcome'});
           
       
        setRedirect(true);
        
       } catch (e) {
        notificationHandler({type:'error', message:'Login Failed...try again'});
         
          setLoading(false);
          console.log(e);
          setHandlerror(e.response.data.message);
       }
    }
    if(redirect){
        return <Navigate to={'/owner'} />
    }   
    
    return (
        <div>
            <div className="mt-12 grow flex items-center justify-around">
            {
      loading ?
      <BarLoader color={'#7ED321'} loading={loading} size={100} />
      :
                <div className="mb-64  border border-spacing-2 rounded-2xl p-2 border-white-500">
                 <Link  to={'/'} className="text-white hover:bg-black transition ">
                        <AiOutlineCloseCircle/></Link>
                        <h1 className="text-4xl text-center  mb-4">Owner Login Only</h1>
               
                   <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                   {!!handlerror && (
       <div className='inline-flex bg-red-400 rounded-md text-center gap-4'>
         <p className='px-4 text-white'>{handlerror}</p><button onClick={closeerror} className='bg-red-500 px-4 text-white'>X</button>
       </div>
      )}
                    <input required='required' type="email"  value={email} onChange={ev =>setEmail(ev.target.value)} id="" />
                    <input required='required' type="password" value={password} onChange={ev =>setPassword(ev.target.value)} id="" />
                    <button type="submit" className="ml-40 hover:bg-black bg-white-300 border px-2 py-1 rounded-full text-white"><AiOutlineLogin color="white" /></button>
                   </form>
                </div>
}
            </div>
            <Notification />
        </div>
    )
}
export default LoginAdmin