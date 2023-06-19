import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import PayModal from "../components/PayModal";
import { BarLoader } from "react-spinners";

const DocPayPage = () => {
    const {id} =useParams();
    const [paydetails, setPayDetails] = useState([]);
    const [err, setErr] =useState(null);
    const [openModal, setOpenModal]= useState(false);
    const [modaldata, setModaldata] = useState('');
    const [doc, setDoc] = useState('');
    const getdetails = ()=>{
        axios.get('/api/doc/paymentdetails').then(response=>{
            setPayDetails(response.data);
        }).catch(err=>{
            setErr(err.message.data);
            throw err;
        })
    }
    const paydoc=(ev, pay)=>{
        ev.preventDefault();
        if(!id) return;
        
        axios.get('/api/doc/processpayment/'+id).then(response=>{
            
            setModaldata(response.data);
            setOpenModal(true);
            setDoc(response.data);
            
           
        }).catch(err=>{
            setErr(err);
            throw err;
        })
    }
    const getdoc = ()=>{
        if(!id) return;
        axios.get('/api/doc/getDoc/'+id).then(response=>{
           setDoc(response.data);
        }).catch(err=>{
            setErr(err);
            throw err;
        })
    }

    useEffect(()=>{
        getdoc()
    },[])
    useEffect(()=>{
        if(!id) return;
        getdetails();
    },[])
  return (
    <div className="flex flex-col-reverse space-y-6">
     <Link to={'/'} className=" text-white hover:text-red-500  hover:border-b p-2 m-4 w-32">Go Back</Link>   
    {doc.doc_ref ? <div className="flex gap-4 items-center justify-center mt-8 ml-4 mr-4 px-4 py-4 border rounded-sm">
           <h2 className="text-2xl text-white font-bold">PAYMENT MADE..</h2>
    </div> : <>
    {paydetails && paydetails.length >0 && paydetails.map(pay=>(
        <div key={pay._id} className="flex flex-row max-w-sm m-4 space-x-1  items-center justify-center mt-8 border rounded-sm">
           <h2>{pay.fullname}</h2>
           <h2 className="text-red-500">{pay.number}</h2>
           <h2>{pay.broker}</h2>
           <button onClick={(ev)=>paydoc(ev, pay)} className="border rounded-full px-2 hover:bg-red-300 text-white py-1 ">Pay now</button>
        </div>
    ))}
    </>}
    
    <div className="mt-8 m-4 p-4 max-w-sm text-red-500 bg-white items-center text-center border rounded-sm border-red-500">
         <h2 className="underline">HOW TO MAKE A PAYMENT</h2>
         
         <p>1. PRESS PAY NOW ON THE NUM TO PAY TO</p>
         <p>2. COPY REFERENCE NUMBER</p>
         <p>3. MAKE PAYMENT TO THE CELLNUMBER YOU GOT THE REFERENCE FROM.</p>
         <p>4. SMS PAYMENT PROOF AND REFERENCE TO:</p>
         <p>74489232 / 72735320</p>
         <p className="bg-red-500 text-white">YOU WILL GET AN SMS WITH YOUR DOC LOCATION</p>
         <p>GO TO LOCATION, PROVIDE REFERENCE, GET YOU DOCS</p>
    </div>
    <PayModal open={openModal} modaldata={modaldata} onClose={()=>setOpenModal(false)} />
    
    </div>
  )
}

export default DocPayPage