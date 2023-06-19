import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { useContext } from 'react'
import { UserContext } from '../UserContext'


const Header = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
        <header className=" flex flex-row  justify-between mt-4 px-4">
            <div className=" border-b border-white-300 text-center">
              {user?.role !== "user"? 
             <> <Link to={user?.role==="admin"? '/owner': '/adminlogin'} className=' font-serif text-white text-2xl font-bold hidden md:block md:text-3xl'>LostNFound</Link>
             <h2 className='text-white text-lg font-bold md:hidden font-serif '>LostNFound</h2></>
               : <><h2 className='text-white text-3xl font-bold hidden md:block'>LostNFound</h2>
                   <h2 className='text-white text-lg font-bold md:hidden'>LostNFound</h2></>}
                
            </div>
            <div className="flex items-center">
              <div className='rounded-full border hidden md:block border-white-500 py-1 px-2'>
                {user?.role !== "admin"?  <Link to={user? '/userpage' : '/login'}>
                 <AiOutlineUser color={'white'} />
                
                 </Link> : <div className='text-white'>{user.firstname}</div>}
                
                 
              
              </div>
              {!!user && (<div className='text-white'>{user.finder_name}</div>)}
            </div>
        </header>
    </div>
  )
}

export default Header