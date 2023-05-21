import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ImagesModal from '../components/ImagesModal';


const WelcomePage = () => {
  const [docs, setDocs]= useState([]);
  const [err, setErr] = useState('');
  const [value, setValue]= useState('');
  const [result, setResult] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [redirect, setRedirect] =useState(null);
  const getdocs = ()=>{
    axios.get('/api/doc/allDocs').then(response=>{
      setDocs(response.data);
    }).catch(err=>{ 
      setErr(err.message.data);
    })
  }
  const onchange = (ev)=>{
    ev.preventDefault();
    setValue(ev.target.value)
  }
  const onSearch = (ev, searchitem, id)=>{
    ev.preventDefault();
    setValue(searchitem);
    console.log(searchitem);
    console.log(id);
    axios.get('/doc/getDoc/'+id).then(response=>{
      setValue('');
      setResult(response.data);
   }).catch(err=>{
    throw err;
   })
  }
  useEffect(()=>{
       getdocs();
  },[])
  return (
    <div className="flex">
      <div className="flex-grow h-screen">
       
        <div className='justify-center max-w-md mx-auto items-center mt-8 text-center'>
      <div className='text-2xl text-white mt-8 '>
       Find your Lost Document
      </div>
      <div className='flex '>
        <input 
      className='mt-4 px-5 py-1 relative'
       placeholder='Type and press on your result item...' 
       type='text' value={value} onChange={onchange} />
       
       </div>
       <div >
        {docs.filter(
          item=>{
            const searchTerm = value.toLocaleLowerCase();
            const fullname = item.doc_owner.toLocaleLowerCase();

            return searchTerm && fullname.startsWith(searchTerm) && fullname !== searchTerm;

          }
        ).slice(0, 10).map(item=> (
          <div onClick={(ev)=>onSearch(ev, item.doc_owner, item._id)} key={item._id} className='cursor-pointer flex px-2 py-2 text-white border border-white '>
            <p className='uppercase'>{item.doc_owner}</p> <p className='ml-3 uppercase text-red-300'>{item.doc_description}</p> 
          </div>
        ))} 
       </div>
      
    </div>
    <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-8 mr-8'> 
      {!!result && value ==='' && (
        <div className='flex border-b mt-8'>
         <div className='border-l px-2 text-white uppercase'>{result.doc_owner}</div>
         <div className="border-l px-2 text-white uppercase">{result.doc_description}</div>
         {result.doc_paid ?
          <div className="border-l px-2 text-white uppercase">{result.collected? 
            <div className='text-green'>collected..thanks</div>:<div>Collect</div>}
            </div>:
          <Link to={'/payment/pay/'+result._id} className="hover:bg-green-300 border-l px-2 uppercase">PAY NOW: {result.doc_fee}</Link>
          }
          <div className="border-l px-2 text-white ">
            {result.doc_images && result.doc_images.length > 0 && (
              <div>
                <button onClick={()=>setOpenModal(true)} className='text-xs text-white hover:scale-95 transition border rounded-2xl m-2 px-2 py-1'>
                  view images</button>
                  
              </div>
            )}  
                   
          </div>
          </div>
      )}
    </div>
      </div>
      <ImagesModal open={openModal}
                   images={result.doc_images}
                    onClose={()=>setOpenModal(false)} />
    </div>
  )
}

export default WelcomePage
