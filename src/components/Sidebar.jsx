import {MdOutlineSpaceDashboard} from "react-icons/md"
import {AiOutlineSchedule} from "react-icons/ai"
import { AiOutlineUser } from 'react-icons/ai'

const automenu =[{
    text: "Dashboard",
    icon: <MdOutlineSpaceDashboard />      
},{
    text: "Schedule",
    icon: <AiOutlineSchedule />      
}, {
    text: "Students",
    icon: <AiOutlineUser />      
}];

const Sidebar = () => {
    
  return (
    <div>
      sidebar
    </div>
  )
}

export default Sidebar
