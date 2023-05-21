import Usermenu from '../components/Usermenu'
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "../UserContext"
import axios from 'axios';
import { BarLoader } from 'react-spinners';

const UserPage = ()=>{
  const {user} = useContext(UserContext);
  const [docs, setDocs] = useState([]);
  const [error, setError]= useState('');
  const [loading, setLoading]= useState(false);

  const finderdocs = async()=>{

    await axios.get('/api/doc/finderdocs').then(response=>{
      setDocs(response.data);
    }).catch((err)=>{32
      setError(err.message);
        throw err;
        
    });

  }

  useEffect(()=>{
    finderdocs();
  },[])

    return (
        <div>
          <Usermenu />
          <div className="mt-32 px-4 py-4">
          <div>
          <Link to={'/account/docs/new'} className='hover:bg-black 
          rounded-2xl  border py-2 px-2 border-white text-white '>Add Document</Link>
          </div> 
          {
      loading ?
      <BarLoader color={'white'} loading={loading} size={100} />
      :
         <div className='mt-8 grid gap-6 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {docs && docs.length > 0 && docs.map(doc=>(
          <Link to={'/account/docs/doc/'+doc._id}  key={doc._id}>
          <div className="bg-gray-500 rounded-2xl mb-2 flex ">
          {doc.doc_images.length > 0 && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5000/uploads/'+doc.doc_images[0]} alt="" />
                        )}
          </div>

          <div className="py-2 px-2  ">
                   <h2 className="text-xl uppercase ">{doc.doc_owner}</h2>
                   <div className='border-b '></div> 
                   <p className="text-sm  uppercase ">{doc.doc_description}</p>
                   <div className='border-b '></div>
                   <h2 className="text-sm uppercase flex gap-1 ">P{doc.doc_fee}<p>{doc.doc_paid? 'PAID': 'UNPAID'}</p></h2>
                   <div className='border-b '></div>
                   </div>
          
          </Link>
         ))}
         </div>
}

          </div>
        </div>
    )
}

export default UserPage