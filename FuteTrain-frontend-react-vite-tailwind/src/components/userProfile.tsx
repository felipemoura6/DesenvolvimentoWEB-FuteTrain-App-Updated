import React, { useEffect, useState } from 'react';
import { UserResponse } from './types';
import { getUsers } from '../api';
import { EditUserProfile } from './editUserProfile'
import unknown_user from '../assets/images/usersImage/unknown_image.png';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'


interface UserDatasProps {
  token?: string;
}


export const UserProfile: React.FC<UserDatasProps> = ({ token }) => {
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const handleDialogClick = () => {
    setIsDialogOpen(true)
  }


  return (
    <Dialog.Root>
      <div className="bg-gradient-to-t from-slate-950 to-slate-900 w-full h-full fixed block overflow-y-auto">
        <div className="h-px bg-gray-200 mb-1"></div>
        <div className="mt-2 grid grid-flow-col sm:grid-cols-12 grid-cols-2 bg-slate-600 border-2 border-slate-400 mx-3 rounded-md">
          <span className="p-4 col-span-2 " key={userData?.image}>
            <img
              src={userData?.image ? userData.image : unknown_user}
              alt="User image"
              className="p-1 w-full h-auto border-2 border-slate-950 bg-blue-950"
            />
          </span>
          <div className="col-span-10 p-3">
            <h1 className="px-3 text-slate-300 sm:text-lg text-sm">Nome do Usuário: {userData?.nome}</h1>
            <h1 className="px-3 text-slate-300 sm:text-lg text-sm">Email: {userData?.email}</h1>
            <h1 className="px-3 text-slate-300 sm:text-lg text-sm">Id: {userData?.id}</h1>

            <Dialog.Trigger asChild className="flex items-center m-2">
              <button onClick={()=> handleDialogClick()} className='rounded-full bg-slate-400 border border-slate-300 py-1 px-2 hover:bg-slate-300 hover:cursor-pointer transition duration-200 sm:text-lg text-sm'>Edit Profile</button>
            </Dialog.Trigger>
            <Dialog.Overlay className="inset-0 fixed bg-black/50" />
              <Dialog.Portal>
                <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-[#040418ef] md:rounded-lg flex flex-col outline-none overflow-y-auto">
                    <Dialog.Close className="absolute top-0 right-0 bg-slate-800 hover:bg-red-900 p-1.5  text-slate-400 hover:text-slate-100 ">
                        <X className="size-5" />
                    </Dialog.Close>
                    {isDialogOpen && <EditUserProfile token={token}/>} 
                </Dialog.Content>
              </Dialog.Portal>
          </div>       
        </div>
      </div>
    </Dialog.Root>
  );  
}
