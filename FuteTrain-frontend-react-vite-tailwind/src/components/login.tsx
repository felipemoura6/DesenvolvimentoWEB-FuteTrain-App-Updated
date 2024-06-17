import { useState, ChangeEvent, FormEvent } from 'react';
import { loginUser } from '../api.tsx';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate

interface FormData {
  email: string;
  senha: string;
}

export function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response);
      alert('Login realizado com sucesso!');
      navigate("/"); // Use navigate para redirecionar
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      setFormData({
        ...formData,
        senha: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-slate-800 w-screen h-screen flex items-center justify-center'>
      <div className='bg-slate-600 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-white mb-6 text-center'>Login</h2>
        <div className='mb-4'>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        
        <div className='mb-6'>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition duration-300" type="submit">Login</button>
        <div className='text-center mt-4'>
          <Link to="/register" className='text-sm text-blue-300 hover:underline'>Não tenho uma conta</Link>
        </div>
      </div>
    </form>
  );
}
