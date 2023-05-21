import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NotificationContext from "../NotificationContext";
import Adminmenu from "../components/Adminmenu";


const FinderDetailsPage = () => {
    const {id} = useParams();
    const [locationdetails, setLocationdetails] = useState('');
    const [loading, setLoading] = useState(false);
    const {notificationHandler} = useContext(NotificationContext);

    const getDetails = ()=>{
        setLoading(true)
        axios.get('/api/doc/getDoc/'+id).then(response=>{
            setLoading(false);
            setLocationdetails(response.data);

        }).catch(err=>{
            setLoading(false);
            notificationHandler({type:'error', message:'Oops!..Network error.Refresh a Page'});
            throw err;
        })

    }
    useEffect(()=>{
        if(!id) return;
        getDetails();
    },[])
  return (
    <div>
      
        <Adminmenu />
        <div className="mt-32 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {!!locationdetails.finder && (
            <div className="text-center m-8 bg-black bg-opacity-50 border rounded-xl">
              <p className="text-2xl font-serif underline text-white">{locationdetails.finder.finder_name}</p> 
              <p className="text-2xl font-serif underline text-white">{locationdetails.finder.location}</p>
              <p className="text-2xl font-serif underline text-white">{locationdetails.finder.nearby_places}</p>
              <p className="text-2xl font-serif underline text-white">{locationdetails.finder.transport_way}</p> 
            </div>
          )}
        </div>
    </div>
  )
}

export default FinderDetailsPage
