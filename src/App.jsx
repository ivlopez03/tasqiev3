import './App.css'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router'

function App() {

  return (
    <>
    <div className='flex'>
     
      <Outlet/>
    </div>
    </>
  )
}

export default App