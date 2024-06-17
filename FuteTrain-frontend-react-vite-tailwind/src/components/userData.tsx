import React, { useEffect, useState } from 'react';
import { getUsers } from '../api'; // Importa a função getUsers da API
import { Link } from 'react-router-dom';

interface UserDatasProps {
    token?: string | null;
}

const UserDatas: React.FC<UserDatasProps> = ({ token }) => { 
    const [userData, setUserData] = useState<{ nome: string }>({ nome: '' });

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

    return (
        <div>
            {userData.nome ? (
                <Link to={`/account/${userData.nome}`} className=' hover:text-slate-100 duration-400 hover:cursor-pointer'>{userData.nome} - My perfil</Link>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDatas;
