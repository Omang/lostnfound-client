import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { useContext } from 'react'
import { UserContext } from '../UserContext'


const Header = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
        <header className=" flex  justify-between mt-8 px-4">
            <div className=" border-b border-white-300 text-center">
              {user?.role !== "user"? 
              <Link to={user?.role==="admin"? '/owner': '/adminlogin'} className='text-white'>LostNFound</Link>
               : <h2 className='text-white'>LostNFound</h2>}
                
            </div>
            <div className="flex items-center">
              <div className='rounded-full border border-white-500 py-1 px-2'>
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