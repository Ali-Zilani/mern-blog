import { useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import {Link} from 'react-router-dom'

function DashSidebar() {
    const location = useLocation()
    const [tab,setTab] = useState('')
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      console.log(tabFromUrl)
    },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                  <Sidebar.Item active={tab === 'profile'} icon={HiUser} label='user' labelColor='dark' >
                    Profile
                  </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight} label={'user'} labelColor='dark' >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar