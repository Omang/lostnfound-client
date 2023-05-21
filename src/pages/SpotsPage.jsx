import { useContext, useEffect, useState } from "react"
import Adminmenu from "../components/Adminmenu";
import axios from "axios";
import { Link } from "react-router-dom";
import NotificationContext from "../NotificationContext";


const SpotsPage = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading]= useState(false);
    const [formload, setFormload] = useState(false);
    const [createnew, setCreatenew] = useState(false);
    const [error, setError] = useState(null);
    const {notificationHandler} = useContext(NotificationContext);
    const [formdata, setFormdata] = useState({
        finder: '',
        location: '',
        email: '',
        password: '',
        cipa: '',
        contact: 0,
        nearbyplaces: '',
        transport: ''

    });

    const handleFormchange = (ev)=>{

        ev.preventDefault();
        const fieldname = ev.target.getAttribute('name');
        const fieldvalue = ev.target.value;

        const newformdata = {...formdata};
        newformdata[fieldname] = fieldvalue;

        setFormdata(newformdata);


    }

    const allspots = ()=>{
        setLoading(true);
        axios.get('/api/user/findall').then(response=>{
           setSpots(response.data);
           setLoading(false); 
        }).catch(err=>{
            setError(err.message.data);
            throw err;
        })
    }
    const addnewSpot = (ev)=>{
        ev.preventDefault();
        setCreatenew(false);
        axios.post('/api/user/addfinder',{finder_name:formdata.finder,
        location:formdata.location,
      cipa: formdata.cipa,
    email: formdata.email,
        nearby_places: formdata.nearbyplaces,
        transport_way: formdata.transport,
    password:formdata.password,
contact:formdata.contact}).then(response=>{
            const datax = response.data;
            
            setSpots(oldspots=>[...oldspots, datax]);
            notificationHandler({type:'success', message:'New Spot Added..Thanks'});
         
           
        }).catch(err=>{
            setError(err.message.data);
            notificationHandler({type:'error', message:'Something wrong happend, try again'});
            throw err;
        })

    }

    useEffect(()=>{
        allspots();
    },[])

  return (
    <div>
        <Adminmenu />

      <div className="mt-32 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
         <div className="grid">
          {createnew ? <div className=" m-4 px-2 py-1 justify- border-white-500 border rounded-2xl">
            <h2 className="text-center text-2xl underline text-white">Add new Spot</h2>
            <form onSubmit={addnewSpot}>
                <h2 className="text-2xl text-white">Spot Name</h2>
                <input onChange={handleFormchange}  name="finder" required="required"
                type="text" placeholder="Vic Internet Cafe" />
                <h2 className="text-2xl text-white">Password</h2>
                <input onChange={handleFormchange} name="password" required="required"
                type="password" placeholder="set new password" />
                <h2 className="text-2xl text-white">Email</h2>
                <input onChange={handleFormchange}  name="email" required="required"
                 type="email" placeholder="youremail@yours.com" />
                <h2 className="text-2xl text-white">Location</h2>
                <input onChange={handleFormchange} name="location" required="required" type="text" placeholder="Main mall, Gaborone" />
                <h2 className="text-2xl text-white">Contact Number</h2>
                <input onChange={handleFormchange} name="contact"
                 className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl"
                  type="number" placeholder="26773725320" />
                <h2 className="text-2xl text-white">CIPA Number</h2>
                <input onChange={handleFormchange}  name="cipa" required="required" type="text" placeholder="BW00000001" />
                <h2 className="text-2xl text-white">Nearby Places</h2>
                <textarea onChange={handleFormchange}  name="nearbyplaces" required="required"
                  className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl" placeholder="plot/office:1234, next to spar, along CashBazzer."></textarea>
                <h2 className="text-2xl text-white">Transport Way</h2>
               <textarea onChange={handleFormchange}  name="transport" required="required"
                 className="w-full border text-white border-white-500 my-2 py-2 px-2 bg-transparent rounded-2xl" placeholder="Broadhurst-route-5, Mogoditshane-route-6..."></textarea>
                <button type="submit" className="hover:bg-black m-2 text-white px-3 py-1 border rounded-full border-white ">Add</button>
                

            </form>
            </div> 
          : 
          <div className="grid sm:grid-cols-4 md:grid-cols-4 lg:grid-col-8">
            <button onClick={(ev)=>setCreatenew(true)} className="border-b text-white hover:text-black">Add new Spot</button>
            </div>}
          
            
         </div>
         <div className="grid">
            <div className=" m-4 px-2 py-1 justify border-white-500  border-l">
               <h2 className="text-center text-white text-2xl underline">Spots</h2>
               {spots && spots.length > 0 && spots.map(spot=>(
                <Link to={'/owner/spots/spot/'+spot._id} key={spot._id} className="mt-4 ">
                    <h2 className="hover:text-black text-white">{spot.finder_name}, {spot.location}</h2>
                    <div className="border-white-500  border-b"></div>

                </Link>
               ))}
            </div>
            </div>
      </div>
    </div>
  )
}

export default SpotsPage
