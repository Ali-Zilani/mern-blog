import { Navbar ,TextInput ,Button, Dropdown, Avatar, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react'
import {Link , useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon,FaSun} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import {toggleTheme} from '../redux/theme/themeSlice'

function Header() {
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state=>state.user)
  const {theme} = useSelector(state=>state.theme)
  const dispatch = useDispatch();

  return (
    <Navbar className='border-b-2'>

      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl
      font-semibold dark:text-white '>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500
        to-pink-500 rounded-lg text-white'>Apna</span>Blog
      </Link>

      <form >
        <TextInput
        type='text' placeholder='Search Blog..' rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
        />
      </form>

     <Button className='w-12 h-10 lg:hidden rounded-full' color='gray' pill>  {/*  pill means round the serch icon */}
        <AiOutlineSearch />
      </Button>

      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          { theme === 'light' ? <FaMoon/> : <FaSun/> }
        </Button>
        {/* conditional rendering for drop down menu or sign in button */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item >Sign out</Dropdown.Item>
          </Dropdown>
          ):
          (<Link to='/sign-in' >
              <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
              </Button>
            </Link>)
        }
        <Navbar.Toggle /> 
      </div>
      {/*  as={'div'} used bcz Navbar.Link and Link both are anchor tag on a single element that cause error  */}
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header