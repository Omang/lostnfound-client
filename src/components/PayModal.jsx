
const PayModal = ({open, modaldata, onClose}) => {
    const handleOnclose=(e)=>{
        if(e.target.id === 'container'){
         onClose();
        }
        
     }
   if(!open) return null;
  return (
    <div id="container" onClick={handleOnclose} className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="justify-center items-center h-64 w-64 ">
     <h2 className="text-2xl bg-red-300 text-white border rounded-sm">
        REFERENECE NUMBER: {modaldata.doc_ref}
     </h2>
     <h2>SMS REFERENCE NUMBER AND PAYMENT CONFIRMATION TO: 74489232 </h2>
     <p onClick={onClose} className="cursor-pointer bg-green-500">Click green to go BACK  </p>
    </div> 
    </div>
  )
}

export default PayModal
