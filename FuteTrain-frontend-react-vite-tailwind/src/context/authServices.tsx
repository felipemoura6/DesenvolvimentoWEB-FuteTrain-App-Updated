// services/authService.ts
import axios from 'axios';

export interface FormData {
  email: string;
  senha: string;
}

export const loginUser = async (formData: FormData): Promise<string> => {
  const response = await axios.post('/api/login', formData);
  return response.data.token;
};

export const getUserNameFromToken = (token: string): string => {
  // Decodifique o token para obter o nome do usuário
  // Aqui você pode usar uma biblioteca como jwt-decode para decodificar o token
  // ou implementar sua própria lógica de decodificação
  return 'User'; // Substitua isso pela lógica real
};
