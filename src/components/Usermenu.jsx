import { Link, useLocation, useParams } from "react-router-dom";


const Usermenu = () => {

    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage === undefined){
        subpage = 'profile';
    }
    
    function linkClasses(type=null){
        let classes = 'py-2 hover:text-black px-6 border-white-50 text-black border-b';
       if(type === subpage){
        classes += ' bg-green-50 text-black';
       }
       return classes;
    }
  return (
    <nav className="fixed w-auto flex justify-center bg-gray-50 bg-opacity-40 mt-16 -mt-16 gap-4 ">
    <Link className={linkClasses('profile')} to={'/account'}>Account</Link>
    <Link className={linkClasses('docs')} to={'/account/docs'}>Documents</Link>
    <Link className={linkClasses('payment')} to={'/account/payment'}>Payments</Link>
 </nav>
  )
}

export default Usermenu
