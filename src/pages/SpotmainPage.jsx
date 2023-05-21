import { useParams } from "react-router-dom"
import Adminmenu from "../components/Adminmenu"
import axios from "axios";
import {useContext, Fragment, useEffect, useReducer, useState } from "react";
import SpotPage from "../components/SpotPage";
import SpotEditPage from "../components/SpotEditPage";
import { AiOutlineArrowRight } from "react-icons/ai";
import NotificationContext from "../NotificationContext";

const SpotmainPage = () => {
    const {id}= useParams();
    const [spot, setSpot]= useState('');
    const [docs, setDocs] =useState([]);
    const [error, setError] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading]= useState(false);
    const [loadiing, setLoadiing]= useState(false);
    const [editContactid, setEditContactid] = useState(null);
    const {notificationHandler} = useContext(NotificationContext);
   

    const [formeditdata, setFormeditdata] = useState({
        finder: '',
        location: '',
        email: '',
        cipa: '',
        contact: 0,
        nearbyplaces: '',
        transport: ''
  
    });
    
  const handleFormchange = (ev)=>{

    ev.preventDefault();
    const fieldname = ev.target.getAttribute('name');
    const fieldvalue = ev.target.value;

    const newformdata = {...formeditdata};
    newformdata[fieldname] = fieldvalue;

    setFormeditdata(newformdata);


}


    const getspot = ()=>{
       axios.get('/api/user/getfinder/'+id).then(response=>{              
           setSpot(response.data.getfinder);
       }).catch(err=>{
           setError(err.message.data);
           throw err;
       })
    }
    const getdocs = ()=>{
        setLoadiing(true);
        axios.get('/api/doc/getfinderdocs/'+id).then(response=>{
           setLoadiing(false);
           setDocs(response.data);
        })
    }
   const editSpot = ()=>{

   }

    useEffect(()=>{
        if(!id){
            return;
        }
        getdocs();
    },[]);

    useEffect(()=>{
        if(!id){
            return;
        }
        getspot();
    },[])
   const handleEditClick = (ev, spot)=>{
    ev.preventDefault();
    setEditContactid(spot._id);
    const formValues ={

        finder: spot.finder_name,
        location: spot.location,
        email: spot.email,
        cipa: spot.cipa,
        contact: spot.contact,
        nearbyplaces: spot.nearby_places,
        transport: spot.transport_way

    };
    setFormeditdata(formValues);
   }

   const handleEditSubmit = (ev)=>{
    ev.preventDefault();
    const editformvalues ={
         id: editContactid,
        finder_name: formeditdata.finder,
        location: formeditdata.location,
        email: formeditdata.email,
        cipa: formeditdata.cipa,
        contact: formeditdata.contact,
        nearby_places: formeditdata.nearbyplaces,
        transport_way: formeditdata.transport

    }
    axios.put('/api/user/updatefinder/'+ editContactid, editformvalues).then(response=>{
        if(response.data){
            notificationHandler({type:'warning', message:'Spot Updated Added..Thanks'});
         
           const datav = response.data;
            setEditContactid(null);
            setSpot(datav);
        }
    }).catch(err=>{
        notificationHandler({type:'error', message:'Oops!..try again'});
         
        throw err;
    })
   }

  return (
    <div>
        <Adminmenu />
        <div className="mt-32 ml-4 px-4 py-2 grid xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
            <div className="grid border rounded-l">
               <Fragment>
               {editContactid === spot._id ? 
               ( <form onSubmit={handleEditSubmit}>
               <SpotEditPage  formeditdata={formeditdata} handleFormchange={handleFormchange} />
               </form>) : 
               (<SpotPage spot={spot} handleEditClick={handleEditClick} />)}
  
               </Fragment>
                


            </div>
            <div className="grid border">
                
                <table> 
                    <thead className="text-center text-2xl text-white underline">Documents</thead>
                       <tbody>{docs && docs.length > 0 && docs.map(doc=>(
                        <tr className="text-white hover:bg-black ">
                            <td>{doc.doc_type.cat_name}</td>
                            <td>{doc.doc_owner}</td>
                        </tr>
                     ))}</tbody>
                      
                </table>
                
                </div>
            <div className="grid border rounded-r">
            <h2 className="text-2xl text-center underline text-white">Extras</h2>
            </div>
        </div>
    </div>
  )
}

export default SpotmainPage