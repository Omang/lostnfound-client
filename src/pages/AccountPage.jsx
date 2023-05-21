import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Usermenu from "../components/Usermenu"
import NotificationContext from "../NotificationContext";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  const {notificationHandler} = useContext(NotificationContext);
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
}
 
  
    async function Logout(){
      
          notificationHandler({type:'warning', message:'LogOut success...Next time'});
          
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
    

      <Usermenu />
        
        {subpage === 'profile'&&(
            <div className=" text-center mt-32 px-4 py-4 text-white">
                Logged in as: {user.finder_name} <br />
                <button onClick={Logout} className="rounded-full py-1 px-4 mt-2 hover:bg-gray-50 bg-gray-200 text-black">Logout</button>
          <div className="mt-8 border border-spacing-2 rounded-2xl p-2 border-white-500">
           <h5 className="text-white border-b-2 border-white">{user.finder_name}</h5>
           <h5 className="text-white border-b-2 border-white">{user.email}</h5>
           <h5 className="text-white border-b-2 border-white">{user.location}</h5>
           <h5 className="text-white border-b-2 border-white">{user.nearby_places}</h5>
           <h5 className="text-white border-b-2 border-white">{user.cars_way}</h5>
           <h5 className="text-white ">{user.transport_way}</h5>
          </div>
            </div>
        )}
        
    
    </div>
     

  )
}

export default AccountPage
