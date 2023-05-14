
const SpotPage = ({spot, handleEditClick}) => {
  return (
    <div>
                <h2 className="text-2xl text-center underline text-white">Details</h2>
                <h1 className="mt-2 py-2 px-1 text-lg text-white">{spot.finder_name}</h1>
                <div className="border border-b"></div>
                <h1 className="mt-2 py-2 px-1 text-lg text-white">CIPA: {spot.cipa}</h1>
                <div className="border border-b"></div>
                <h1 className="mt-2 py-2 px-1 text-lg text-white">{spot.email}</h1>
                <div className="border border-b"></div>
                <h1 className="mt-2 py-2 px-1 text-lg text-white">{spot.location}</h1>
                <div className="border border-b"></div>
                <h1 className="mt-2 py-2 px-1 text-lg text-white">{spot.nearby_places}</h1>
                <div className="border border-b"></div>
                <h1 className="mt-2 py-2 px-1 text-lg text-white">{spot.transport_way}</h1>
                <div className="border border-b"></div>
                <button onClick={(ev)=>handleEditClick(ev, spot)}  className="hover:bg-black m-2 text-white px-3 py-1 border rounded-full border-white ">Edit</button>
                
                </div>
  )
}

export default SpotPage