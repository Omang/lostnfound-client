import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Adminmenu from "../components/Adminmenu";
import NotificationContext from "../NotificationContext";

const OwnerPage = () => {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
}
 
  
    async function Logout(){
       const {token} = user;
        await axios.get('/user/logout', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }
          });
         
        
          notificationHandler({type:'warning', message:'LogOut success...Thanks'});
        
        setRedirect('/');
        setUser(null);
    }
    if(!ready){

        return 'Loading...';

    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }
    
    if(redirect){
        return <Navigate to={redirect} />
    }
   
  return (
    <div>
    
      <Adminmenu />
  
        {subpage === 'profile'&&(
            <div className="mt-32 text-center max-w-md mx-auto  text-white">
                Logged in as: {user.lastname} <br />
                <button onClick={Logout} className="rounded-full py-1 px-4 mt-2 hover:bg-gray-50 bg-gray-200 text-black">Logout</button>
          <div className="mt-8 border border-spacing-2 rounded-2xl p-2 border-white-500">
           <h5 className="text-white border-b-2 border-white">{user.firstname}</h5>
           <h5 className="text-white border-b-2 border-white">{user.lastname}</h5>
           <h5 className="text-white border-b-2 border-white">{user.email}</h5>
          </div>
            </div>
       
  )
}
</div>
  )
}

export default OwnerPage
