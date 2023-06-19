import { Link, useLocation, useParams } from "react-router-dom";


const Adminmenu = () => {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined){
        subpage = 'profile';
    }
    
    function linkClasses(type=null){
        let classes = 'py-2 hover:text-white px-6 border-white-500 text-black border-b';
       if(type === subpage){
        classes += ' bg-gray-200 text-black';
       }
       return classes;
    }
  return (
    <nav className="fixed w-auto flex justify-center bg-gray-50 bg-opacity-40 mt-16  gap-4 ">
    <Link className={linkClasses('profile')} to={'/owner'}>Account</Link>
    <Link className={linkClasses('spots')} to={'/owner/spots'}>Spots</Link>
    <Link className={linkClasses('payments')} to={'/owner/payments'}>Payments</Link>
 </nav>
  )
}

export default Adminmenu
