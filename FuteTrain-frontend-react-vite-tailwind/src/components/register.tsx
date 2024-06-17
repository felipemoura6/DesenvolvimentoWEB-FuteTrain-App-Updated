import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../api.tsx';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  nome: string;
  email: string;
  senha: string;
}

export function Register() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);

    // Validação em tempo real
    if (formData.senha !== value) {
      setPasswordMessage('As senhas não coincidem.');
    } else {
      setPasswordMessage('As senhas coincidem.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.senha !== confirmPassword) {
      setPasswordMessage('As senhas não coincidem.');
      return;
    }

    setPasswordMessage('');
    try {
      const response = await registerUser(formData);
      alert('Registro realizado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        senha: ''
      });
      setConfirmPassword('');
      navigate("/login");
    } catch (error) {
      alert('Usuário já existente!');
      setFormData({
        nome: '',
        email: '',
        senha: ''
      });
      setConfirmPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-slate-800 w-screen h-screen flex items-center justify-center'>
      <div className='bg-slate-600 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-white mb-6 text-center'>Registrar</h2>
        <div className='mb-4'>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
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
        <div className='mb-4'>
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
        <div className='mb-6'>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {passwordMessage && (
          <p className={`text-sm mb-4 ${formData.senha === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
            {passwordMessage}
          </p>
        )}
        <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200" type="submit">Registrar</button>
        <div className='text-center mt-4'>
          <Link to='/login' className='text-sm text-blue-300 hover:underline'>Já tenho uma conta</Link>
        </div>
      </div>
    </form>
  );
}
