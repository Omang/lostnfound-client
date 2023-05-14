import React, { useState } from 'react'

const SpotEditPage = ({formeditdata, handleFormchange}) => {
  const [error, setError] = useState(null);
 

  return (
    <div className='m-4'>
      <h2 className="text-center text-2xl underline text-white">Add new Spot</h2>
            
                <h2 className="text-2xl text-white">Spot Name</h2>
                <input value={formeditdata.finder} onChange={handleFormchange}  name="finder" required="required"
                type="text" placeholder="Vic Internet Cafe" />
          
                <h2 className="text-2xl text-white">Email</h2>
                <input value={formeditdata.email} onChange={handleFormchange}  name="email" required="required"
                 type="email" placeholder="youremail@yours.com" />
                <h2 className="text-2xl text-white">Location</h2>
                <input value={formeditdata.location} onChange={handleFormchange} name="location" required="required" type="text" placeholder="Main mall, Gaborone" />
                <h2 className="text-2xl text-white">Contact Number</h2>
                <input value={formeditdata.contact} onChange={handleFormchange} name="contact"
                 className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl"
                  type="number" placeholder="26773725320" />
                <h2 className="text-2xl text-white">CIPA Number</h2>
                <input value={formeditdata.cipa} onChange={handleFormchange}  name="cipa" required="required" type="text" placeholder="BW00000001" />
                <h2 className="text-2xl text-white">Nearby Places</h2>
                <textarea value={formeditdata.nearbyplaces} onChange={handleFormchange}  name="nearbyplaces" required="required"
                  className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl" placeholder="plot/office:1234, next to spar, along CashBazzer."></textarea>
                <h2 className="text-2xl text-white">Transport Way</h2>
               <textarea value={formeditdata.transport} onChange={handleFormchange}  name="transport" required="required"
                 className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl" placeholder="Broadhurst-route-5, Mogoditshane-route-6..."></textarea>
                <button type="submit" className="hover:bg-black m-2 text-white px-3 py-1 border rounded-full border-white ">Save</button>
              
      
    </div>
  )
}

export default SpotEditPage
