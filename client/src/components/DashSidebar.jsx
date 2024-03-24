import { useEffect,useState } from 'react'
import {useLocation} from 'react-router-dom'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiDocumentText, HiUser} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

export default function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state=>state.user)
    const [tab,setTab] = useState('')
  
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      console.log(tabFromUrl)
    },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Link to='/dashboard?tab=profile'>
                  <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} 
                  labelColor='dark' as='div'>
                    Profile
                  </Sidebar.Item>
                </Link >
                { currentUser.isAdmin && (
                  <Link to='/dashboard?tab=posts' >
                  <Sidebar.Item active={tab === 'posts'} icon = {HiDocumentText} as='div'>
                    Posts
                  </Sidebar.Item>
                </Link>
                )
                }
                <Sidebar.Item icon={HiArrowSmRight}  labelColor='dark' >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

