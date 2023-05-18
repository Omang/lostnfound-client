import {useContext,  useEffect,  useState, useReducer } from "react"
import Adminmenu from "./Adminmenu"
import NotificationContext from "../NotificationContext";
import axios from "axios";
import FinderModal from "./FinderModal";
import { Link } from "react-router-dom";

const OwnerPayments = () => {
    const [pay, setPay]= useState(false);
    const [payque, SetPayque] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [ignored, forceUpdate] = useReducer(x=>x=1, 0);
    const [loading, setLoading] = useState(false);
    const {notificationHandler} = useContext(NotificationContext);
   
    const getItems = ()=>{
        axios.get('/doc/allDocs').then(response=>{
            SetPayque(response.data);
          }).catch(err=>{ 
            setErr(err.message.data);
          })
    }

    const acceptPay = (ev, pay)=>{
       ev.preventDefault();
       
       axios.get('/doc/paydoc/'+pay._id).then(response=>{
        notificationHandler({type:'success', message:'Payment Success..Thanks'});

        forceUpdate();

       }).catch(err=>{
        notificationHandler({type:'error', message:'Oops!..Sorry.Try again'});
          throw err;
       })
    }

    const collectFinder = ()=>{

    }

    useEffect(()=>{
        getItems()
    },[ignored])

  return (
    <div>
        <Adminmenu />
        <div className="mt-32 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
             <table className="border rounded-md">
             <th>Fullname</th>
                    <th>Amount</th>
                    <th>Reference Num</th>
                    <th>Accept</th>
                
             {payque && payque.length > 0 && payque.map(payx=>(
              
                <tbody>
                    
                {!!payx.doc_ref && (
                        <tr key={payx._id} className="bg-gray-50 hover:bg-transparent transition bg-opacity-40">
                            <td className="border-l">{payx.doc_owner}</td>
                            <td className="border-l">P{payx.doc_fee}</td> 
                            <td className="border-l">{payx.doc_ref}</td>
                            <td className="border-l">{payx.doc_paid? <Link to={'/owner/payments/collect/finder/'+payx._id} className="border hover:bg-green-300 rounded-sm bg-white">View Finder</Link> :
                             <button onClick={(ev)=>acceptPay(ev, payx)} className="border hover:bg-green-300 rounded-sm bg-white">PAY</button>}</td>
                       </tr>
                        
                    )}
                   
                </tbody>
               
                
             ))}
             </table>
             
        </div>
        
    </div>
  )
}

export default OwnerPayments
