

const ImagesModal = ({open, images, onClose}) => {
    const handleOnclose=(e)=>{
       if(e.target.id === 'container'){
        onClose();
       }
       
    }
  if(!open) return null;
  return (

    <div id="container" onClick={handleOnclose} className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="justify-center items-center h-84 w-64 ">
       {images && images.length > 0 && images.map(image=>(
        <div key={image} className="">
           <img src={'https://lostnfound-api.onrender.com/uploads/'+image}  />
        </div>
       ))}
       <p onClick={onClose} className="cursor-pointer bg-green-500">Click green to go BACK  </p>
      </div>
    </div>
  )
}

export default ImagesModal
