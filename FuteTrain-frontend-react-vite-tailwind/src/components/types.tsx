export interface UserData {
    nome: string;
    email: string;
    senha: string;
  }
  
export  interface UserResponse {
    id: number;
    nome: string;
    email: string;
    image: string;
  }

  export  interface UserUpdate {
    nome: string;
    email: string;
  }
  
export interface ApiResponse<T> {
    data: T;
    message: string;
  }

export interface LoginResponse {
    token: string;
}

export interface NewsResponse {
  id: number;
  title: string;
  content: string;
}

export interface TeamsResponse {
  id_team: number;
  team_name: string;
  team_country: string;
  team_skill: number;
  team_icon: string;
  players: PlayersResponse[];
}

export interface PlayersResponse {
  id_player: number;
  player_name: string;
  id_team: string;
  player_age: number;
  player_position: string;
  player_skill: number;
  player_nationality: string;
  player_image: string;
  team_icon: string;
}


export interface UserInventoryResponse {
  nome_user: string;
  email_user: string;
  items: Item[];
}

export interface Item {
  item_name: string;
  quantity: string;
  item_icon: string;
  item_id: number;
}
