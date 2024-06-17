// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
// import { getUsers2 } from '../api';
import { UserResponse } from './types';
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate=useNavigate()

  const handleLogout = () => {
    // Limpe o token de autenticação do localStorage
    localStorage.removeItem('token');
    // Redirecione o usuário para a página de login
    navigate("/login");
  };


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersData = await getUsers2();
  //       setUsers(usersData);
  //     } catch (err) {
  //       setError('Erro ao buscar usuários');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // if (loading) {
  //   return <div>Carregando...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nome} - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
