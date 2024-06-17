import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  ExitIcon,
  EnterIcon,
} from '@radix-ui/react-icons';
import { UserResponse } from './types';
import { getUsers } from '../api';
import UserDatas from './userData';
import unknown_user from '../assets/images/usersImage/unknown_image.png';

interface NavbarProps {
  message: string;
}

export function Navbar({ message }: NavbarProps): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState<UserResponse | null>(null);


    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedIn(true);
    }
    }, []);



    useEffect(() => {
    
      const fetchUserData = async (token: string) => { 
        try {
          const response = await getUsers(token); // Chama a função getUsers
          setUserData(response);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };
  
      if (token) {
        fetchUserData(token); // Garante que fetchUserData é chamada
      }
    }, [token]);
    


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <nav className='flex justify-center left-auto right-0 sm:h-[5.5vh] h-[10.5vh]'>
        <div className='flex-grow bg-gray-900'>
          <div className='grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-5 grid-cols-4 gap-[0px] justify-center items-center h-full'>
            <Link to="/" className='flex justify-center items-center text-white hover:text-gray-300 bg-gradient-to-br from-gray-800 to-gray-600 rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 hover:border-blue-600 col-span-1'>FuteTrain</Link>
            <Link 
        to="/training" 
        className={`flex justify-center items-center text-slate-200 hover:text-gray-300 ${
          location.pathname === '/training' 
            ? 'bg-gradient-to-t from-green-700/45 to-green-600/50 text-white' 
            : 'bg-gradient-to-t from-green-800/45 to-green-700/50'
        } rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-t hover:from-green-700/45 hover:to-green-600/50 col-span-1`}
      >
        Training
      </Link>

      <Link 
        to="/progress" 
        className={`flex justify-center items-center text-white hover:text-gray-300 ${
          location.pathname === '/progress' 
            ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-red-900' 
            : 'bg-gradient-to-br from-gray-800 to-gray-600'
        } rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 hover:border-blue-600 col-span-1`}
      >
        Progress
      </Link>

      <Link 
        to="/history" 
        className={`flex justify-center items-center text-white hover:text-gray-300 ${
          location.pathname === '/history' 
            ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-red-900' 
            : 'bg-gradient-to-br from-gray-800 to-gray-600'
        } rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 hover:border-blue-600 col-span-1`}
      >
        History
      </Link>

        <Link 
        to="/teams" 
        className={`flex justify-center items-center text-white hover:text-gray-300 ${
          location.pathname === '/teams' 
            ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-red-900' 
            : 'bg-gradient-to-br from-gray-800 to-gray-600'
        } rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 hover:border-blue-600 col-span-1`}
      >
        Team
      </Link>
      <Link 
        to="/news" 
        className={`flex justify-center items-center text-white hover:text-gray-300 ${
          location.pathname === '/news' 
            ? 'bg-gradient-to-br from-gray-700 to-gray-600 border-red-900' 
            : 'bg-gradient-to-br from-gray-800 to-gray-600'
        } rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 hover:border-blue-600 col-span-1`}
      >
        News
      </Link>

            <Link 
        to="/premium" 
        className={`flex justify-center items-center text-white hover:text-gray-300 ${
          location.pathname === '/premium' 
            ? 'bg-gradient-to-br from-red-900 to-blue-800 border-red-900' 
            : 'bg-gradient-to-br from-red-800 to-blue-700'
        } rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-red-800 hover:to-blue-700 hover:border-blue-600 col-span-1`}
      >
        Premium
      </Link>
            {isLoggedIn ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <div className='flex text-slate-300 hover:text-slate-200 hover:cursor-pointer'>
                  <div className='grid grid-flow-col grid-cols-2'>
                    <div className='flex sm:ml-4 sm:mr-2 ml-2'>
                    <img src={userData?.image ? userData.image : unknown_user} alt="User image" className="sm:size-10 size-6 border border-slate-700"/>
                    </div>
                    <div className='flex items-center justify-center ml-4'>
                      <HamburgerMenuIcon className='size-5 hover:scale-[1.25] transition duration-200 hover:text-slate-200' />
                    </div>
                  </div>
                </div>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-[220px] bg-slate-900/90 border border-slate-300 rounded-md p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}>
                  <DropdownMenu.Label />
                  <DropdownMenu.Item className="my-2 text-slate-200 group text-lg leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                    <div className="border-b border-slate-700 flex w-full">
                      <div className='mb-2'><UserDatas token={token}/></div>
                    </div>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className=" my-2 text-slate-200 hover:text-white hover:cursor-pointer group text-lg leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                    
                    <Link 
                      to="/inventory" 
                      className={`border-b border-slate-700 w-full`}
                    >
                      <h1 className='mb-2'>Inventory</h1>
                    </Link>
                    
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className=" my-2 text-slate-200 hover:text-white hover:cursor-pointer group text-lg leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                    
                    <div className="border-b border-slate-700 w-full">
                      <h1 className='mb-2'>Help ( ? )</h1>              
                    </div>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="my-2 text-slate-200 group text-lg leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                  <div className="border-b border-slate-700 flex w-full">
                    <button 
                      onClick={handleLogout} 
                      className="mb-2 bg-red-500/70 text-white sm:text-sm text-[10px] px-1 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      <ExitIcon/>
                    </button>
                  </div>
                  </DropdownMenu.Item>
                  
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            ) : (
              <Link to="/login" className='text-white hover:text-gray-300 bg-gradient-to-br from-yellow-600/80 to-yellow-600/95 rounded-none h-full border-[0.25px] border-gray-800 hover:bg-gradient-to-br hover:from-yellow-600 hover:to-yellow-500/75 hover:border-blue-600 col-span-1 justify-center items-center flex gap-3'>My account <EnterIcon/></Link>
            )}
          </div>
        </div>
      </nav >
      <h1 className='text-lg font-weight-600 flex justify-center text-slate-900'>{message}</h1>
    </div>
  );
}
