// src/api.ts
import axios from 'axios';
import { UserResponse, UserData, ApiResponse, LoginResponse, NewsResponse, UserInventoryResponse, TeamsResponse, PlayersResponse } from './components/types';

const API_URL = 'http://localhost:3006'; // ou qualquer outra URL da sua API



export const registerUser = async (userData: UserData): Promise<UserResponse> => {
  const response = await axios.post<ApiResponse<UserResponse>>(`${API_URL}/register`, userData);
  return response.data.data;
};

export const loginUser = async (userData: Omit<UserData, 'nome'>): Promise<string> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, userData);
  return response.data.token; // Retorna diretamente o token
};


// export const getUsers2 = async (): Promise<UserResponse[]> => {
//   const response = await axios.get<UserResponse[]>(`${API_URL}/users`);
//   return response.data;
// };

// export const getUsers = async (token: string): Promise<UserResponse[]> => {
//   try {
//     const response = await axios.get<UserResponse[]>(`${API_URL}/users`, {
//       headers: {
//         Authorization: `Bearer ${token}` // Adiciona o token aos headers da requisição
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao buscar usuários:', error);
//     throw error; // Rejeita a promessa em caso de erro
//   }
// };



// export const getUsers = async (token: string): Promise<UserResponse> => {
//   try {
//     const response = await axios.get<UserResponse>(`${API_URL}/users`, {
//       headers: {
//         Authorization: `Bearer ${token}` // Adiciona o token aos headers da requisição
//       }
//     });
//     console.log(response)
//     return response.data;
//   } catch (error) {
//     console.error('Erro ao buscar usuários:', error);
//     throw error; // Rejeita a promessa em caso de erro
//   }
// };

export const getUsers = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token aos headers da requisição
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error; // Rejeita a promessa em caso de erro
  }
};




export const updateUser = async (token: string, newData: Partial<UserResponse>): Promise<void> => {
  try {
    // Faz uma solicitação POST para a rota '/update-user' com os dados do usuário e o token de autorização
    await axios.post(`${API_URL}/update-user`, newData, {
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token aos headers da requisição
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error; // Rejeita a promessa em caso de erro
  }
};




// Busca de itens de usuário através do token
export const getItemsFromUser = async (token: string): Promise<UserInventoryResponse> => {
  try {
    const response = await axios.get<UserInventoryResponse>(`${API_URL}/user-inventory`, {
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token aos headers da requisição
      }
    });
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error; // Rejeita a promessa em caso de erro
  }
};







export const getUserById = async (id: number): Promise<UserResponse> => {
  const response = await axios.get<ApiResponse<UserResponse>>(`${API_URL}/users/${id}`);
  return response.data.data;
};

export const deleteUserById = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`);
};

export const updateUser2 = async (id: number, userData: Partial<UserData>): Promise<UserResponse> => {
  const response = await axios.put<ApiResponse<UserResponse>>(`${API_URL}/users/${id}`, userData);
  return response.data.data;
};

export const getNews = async (): Promise<NewsResponse[]> => {
  const response = await axios.get<NewsResponse[]>(`${API_URL}/news`);
  return response.data;
};

export const getTeams = async (): Promise<TeamsResponse[]> => {
  const response = await axios.get<TeamsResponse[]>(`${API_URL}/teams`);
  return response.data;
}


export const getPlayersFromTeam = async (team_name: string): Promise<PlayersResponse[]> => {
  const response = await axios.get<PlayersResponse[]>(`${API_URL}/teams/${team_name}`);
  return response.data;
}




