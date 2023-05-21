import axios from "axios";
import { Link } from "react-router-dom";
import { useContext, useState } from "react"
import { AiOutlineClear, AiOutlineCloseCircle, AiOutlineLogin } from "react-icons/ai"
import { UserContext } from "../UserContext";
import { BarLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import NotificationContext from "../NotificationContext";
import Notification from "../utils/Notification";

const RegisterAdmin = () => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [handlerror, setHandlerror] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [comparex, setComparex] = useState('');
    const {notificationHandler} = useContext(NotificationContext);
    
    function closeerror(ev){
        ev.preventDefault();
        setHandlerror('');
      }
      
      async function registerSubmit(ev){
          ev.preventDefault();
          setLoading(true);
         try {
             if(comparex === '12345'){
            const {data} = await axios.post('/api/user/register', {email, firstname, lastname, password});
     
         
          setLoading(false);
          setRedirect(true);
          notificationHandler({type:'success', message:'Registered success...Login'});
           

             } else{
                setLoading(false);
                notificationHandler({type:'warning', message:'KEY ERROR!, please contact 73725320 for help'}); 

             } 
        
         } catch (e) {
            
            setLoading(false);
            notificationHandler({type:'error', message:'Oops! registration Failed...Try again'});
          
            console.log(e);
            setHandlerror(e.response.data.message);
         }
      }
      if(redirect){
          return <Navigate to={'/adminlogin'} />
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
                        <AiOutlineCloseCircle /></Link>
                <h1 className="text-4xl text-center  mb-4">Owner Registration</h1>
                   <form onSubmit={registerSubmit} className="max-w-md mx-auto">
                   {!!handlerror && (
       <div className='inline-flex bg-red-400 rounded-md text-center gap-4'>
         <p className='px-4 text-white'>{handlerror}</p><button onClick={closeerror} className='bg-red-500 px-4 text-white'>X</button>
       </div>
      )}
                  
                    <input required type="email" placeholder="Youremail@your.com"  value={email}  onChange={ev =>setEmail(ev.target.value)} id="" />
                    <input required type="text" placeholder="Key from App Owner, no spaces around text"  value={comparex}  onChange={ev =>setComparex(ev.target.value)} id="" />
                    <input required type="text" placeholder="Your Firstname"  value={firstname}  onChange={ev =>setFirstname(ev.target.value)} id="" />
                    <input required type="text" placeholder="Your Lastname"  value={lastname}  onChange={ev =>setLastname(ev.target.value)} id="" />
                    <input required type="password" placeholder="Yourpassword" value={password} onChange={ev =>setPassword(ev.target.value)} id="" />
                    <button type="submit" className="ml-40 hover:bg-black bg-white-300 border px-2 py-1 rounded-full text-white"><AiOutlineLogin color="white" /></button>
                   </form>
                </div>
}
            </div>
    </div>
  )
}

export default RegisterAdmin