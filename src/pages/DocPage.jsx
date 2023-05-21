import { useParams } from "react-router-dom"
import Usermenu from "../components/Usermenu"
import axios from "axios";
import {useContext, useEffect, useReducer, useState } from "react";
import NotificationContext from "../NotificationContext";

const DocPage = () => {

    const {id} = useParams();
    const [doc, setDoc]= useState({});
    const [error, setError]= useState(null);
    const [loading, setLoading]= useState(false);
    const [ignored, forceUpdate] = useReducer(x=>x=1, 0);
    const {notificationHandler} = useContext(NotificationContext);
    const collectdoc=(ev, docid)=>{

        ev.preventDefault();
        axios.get('/api/doc/collectdoc/'+docid).then(response=>{
             
            if(response.data){
                notificationHandler({type:'success', message:'Document collected..Thanks'});
           
                forceUpdate();
            }
        }).catch(err=>{
            setError(err.message.data);
            notificationHandler({type:'error', message:'Oops! Sorry...Try again'});
           
            throw err;
        })

    }

    const getdoc = ()=>{
        setLoading(true);
        axios.get('/api/doc/getDoc/'+id).then(response=>{
           setDoc(response.data); 
        }).catch(err=>{
            setLoading(false);
            setError('Error occured');
            throw err;

        })
    }

    useEffect(()=>{
        if(!id){
            return;
        }
        getdoc();
    },[ignored]);

    if(!doc) return '';

  return (
    <div>
      <Usermenu />
      <div className="mt-32 px-8 ml-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
      
        <div className=" grid  mt-6 bg-opacity border rounded-2xl -mx-8 py-2 px-8">
            <h1 className="text-white text-2xl uppercase">{doc.doc_description}</h1>
            <h2 className="text-white my-2 block font-semibold underline uppercase">{doc.doc_owner}</h2>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr]">

                <div>
                    {doc.doc_images?.[0] && (
                        <div>
                            <img className="aspect-square object-cover" src={'https://lostnfound-api.onrender.com/uploads/'+doc.doc_images?.[0]} />
                        </div>
                    )}
                </div>
                <div className="grid gap-2"> {doc.doc_images?.[1] && (
                        <img className="aspect-square object-cover" src={'https://lostnfound-api.onrender.com/uploads/'+doc.doc_images?.[1]} />
                    )}</div>

            </div> 
            {doc.doc_paid?
             <div>
                {doc.collected? 
                <div><div className="flex gap-1 absolute bottom-1 right-0 py-2 px-4 bg-gray-50  rounded-2xl  shadow-md">Collected</div></div>
                : 
                <button onClick={ev=>collectdoc(ev, doc._id)} className="flex gap-1 absolute bottom-1 right-0 py-2 px-4 bg-gray-50  rounded-2xl  shadow-md">Collect</button>
                }
             </div>
             :
              <div className="flex gap-1 absolute bottom-1 right-0 py-2 px-4 bg-gray-50  rounded-2xl  shadow-md">Unpaid</div>
              }
             
           
            </div>
           
            </div>
      
      </div>
    </div>
  )
}

export default DocPage
