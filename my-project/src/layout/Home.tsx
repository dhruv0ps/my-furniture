import { Outlet } from 'react-router-dom';
import NavSideBar from './Sidebar';
import NavBar from './Nav';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';



const Home = observer(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
 



  return (
    <div className="flex flex-col h-screen overflow-hidden">
   
    <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    
    <div className="flex flex-1 overflow-hidden">
      
      <NavSideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
     
      <main className="flex-1 overflow-y-auto p-5">
        <Outlet />
      </main>
    </div>
  </div>
  )
})

export default Home