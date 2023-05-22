import axios from "axios"
import { useContext, useEffect } from "react";
import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import Usermenu  from "../components/Usermenu";
import { GridLoader } from "react-spinners";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import PhotoUploader from "./PhotoUploader";



const DocForm = ()=>{
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const [cats, setCats] = useState([]);
    const [addedphotos, setAddedphotos] = useState([]);
    const [doctype, setDoctype] = useState('');
    const [docdes, setDocdes] = useState('');
    const [docowner, setDocowner] = useState('');
    const [docfee, setDocfee] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const finder= user._id;

    const getdoc = async()=>{
        setLoading(true);
        const {data} = await axios.get('/api/doc/getDoc'+id);
        setLoading(false);
        if(data){
            setDoctype(data.doc_type);
            setDocdes(data.doc_description);
            setDocowner(data.doc_owner);
            setDocfee(data.doc_fee);

        }else{
            setError('Error occured, please try again later');
        }
    }
    const addNewdoc = (ev)=>{
        setLoading(true);
        ev.preventDefault();
       if(!id){
        
        const data = {doc_type:doctype, doc_owner:docowner, 
            doc_description:docdes, doc_fee:docfee, doc_images:addedphotos,
            finder:finder};
            
   axios.post('/api/doc/createdoc', data).then((response)=>{
       const doc = response.data;
       if(doc){
        setLoading(false);
        setRedirect('/account/docs');
       }
       
   }).catch((err)=>{
    setLoading(false);
       setError(err.message.data);
   })

       }else{

       }
         
    }
    
    const getCategories = ()=>{
    
       
            axios.get('/api/doc/allcats').then((response)=>{
                setCats(response.data);
           }).catch(err=>{
            setLoading(false);    
            setError(err.message);
           
           });
            
       
    }

    useEffect(()=>{

        getCategories();

    },[])

    useEffect(()=>{
        if(!id){
            return;
        }
        getdoc();
    },[id])

    const onchangeHandler=(e)=>{

        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option =  el.getAttribute('id');
        setDoctype(option);
        console.log(option);

    }
   


    if(redirect){
      return  <Navigate to={redirect} />;
    }
   
    return (
        <div>

<Usermenu />
        
        {error && (
          <div className="mt-32 justify-center  text-center">
            <div className="rounded-full border-white-500">
              <h1 className="text-xl">
                {error}
              </h1>
            </div>
          </div>
        )}
  
          {
        loading ?
        <div className="mt-32 justify-center  text-center">
        <GridLoader color={'#7ED321'} loading={loading} size={20} />
        </div>
        :
  
      <div className="mt-32 max-w-md mx-auto justify- border-white-500 border rounded-2xl">
                  <h2 className="text-2xl mt-4 text-center text-white font-bold">Document Form</h2>
                  <form className='py-2 px-4' onSubmit={addNewdoc}>
                       
                      <h2 className="text-xl text-white mt-4">Document doctype</h2>
                      <select onChange={onchangeHandler} >
                      <option className="">Please Selected an option</option>
                        {cats && cats.length > 0 && cats.map(cat=>(
                            
                         <option className="text-black" key={cat._id} id={cat._id} >{cat.cat_name}</option>
                           
                        )) } 
                        </select>
                       
                      <h2 className="text-xl text-white mt-4">Document Owner</h2>
                      <input  value={docowner}onChange={ev => setDocowner(ev.target.value)} className="border-white-500" type="text" placeholder="Victor Setlhare" />
                      <h2 className="text-xl text-white mt-4">Document images</h2>
                     
                      <PhotoUploader addedphotos={addedphotos} onChange={setAddedphotos}/>
                     
                      <h2 className="text-xl text-white mt-4">Document Description</h2>
                      <textarea value={docdes} onChange={ev => setDocdes(ev.target.value)} className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl" type="text"></textarea>
                      <h2 className="text-xl text-white mt-4">Document Charge Amount</h2>
                      <input value={docfee}onChange={ev => setDocfee(ev.target.value)} className="border-white-500" type="text" placeholder="Victor Setlhare" />
                      <button  className="hover:bg-black justify-center py-2 border border-white px-4 text-white rounded-2xl">Add</button>
                  </form>

                 </div>
  }

        </div>
    )
}

export default DocForm