import { useEffect, useState, ChangeEvent, FormEvent } from 'react'; // Importando ChangeEvent e FormEvent do pacote 'react'
import { getUsers, updateUser } from '../api';
import { toast } from 'sonner'

interface EditUserProfileProps {
  token?: string;
}

interface EditData {
  nome: string;
  email: string;
}

export function EditUserProfile({ token }: EditUserProfileProps): JSX.Element {
  
  const [editData, setEditData] = useState<EditData>({
    email: '',
    nome: '',
  });


  useEffect(() => {
    
    const fetchUserData = async (token: string) => { 
      try {
        const response = await getUsers(token); // Chama a função getUsers
        setEditData(response);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    if (token) {
      fetchUserData(token); // Garante que fetchUserData é chamada
    }
  }, [token]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert('Token de autorização não fornecido.');
      return;
    }
    try {
      await updateUser(token, editData);
      toast.success(`Usuário ${editData.nome} atualizado com sucesso`);
    } catch (error) {
      alert('Erro ao fazer atualização.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Type your email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={editData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="nome" className="block text-gray-700 text-sm font-bold mb-2">Type your name</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome"
          value={editData.nome}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-center">
        <button type="submit" className="transition duration-200 bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </form>
  );  
}
