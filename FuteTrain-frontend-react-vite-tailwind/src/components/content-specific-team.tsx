import { useEffect, useState } from "react";
import { getPlayersFromTeam } from "../api";
import { PlayersResponse } from "./types";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

interface RouteParams {
    [key: string]: string | undefined;
}  

  

export function ContentSpecificTeam() {
  const { team_name } = useParams<RouteParams>();
  const [players, setPlayers] = useState<PlayersResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSkillColor = (Skill: number) => {
    if (Skill >= 90) return 'bg-orange-600';
    if (Skill >= 85) return 'bg-red-700';
    if (Skill >= 80) return 'bg-red-500';
    if (Skill >= 75) return 'bg-cyan-600';
    if (Skill >= 40) return 'bg-lime-600';
    return 'bg-lime-500';
  };


  useEffect(() => {
    if (team_name) {
      const fetchPlayers = async () => {
        try {
          const playersData = await getPlayersFromTeam(team_name);
          if (Array.isArray(playersData)) {
            setPlayers(playersData);
          } else {
            setError("Dados recebidos não são uma lista de jogadores.");
          }
        } catch (error) {
          console.error("Erro ao buscar jogadores do time:", error);
          setError("Erro ao buscar jogadores do time.");
        } finally {
          setLoading(false);
        }
      };

      fetchPlayers();
    }
  }, [team_name]);

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-t from-slate-950 to-slate-900 flex flex-col items-center py-6">
      <div className="grid grid-flow-col grid-cols-2">
          <Link to='/teams' className="text-white h-16 w-16 flex items-center justify-center">
            <ArrowLeftIcon className='size-5 hover:scale-[1.25] transition duration-200 hover:cursor-pointer hover:text-slate-400'/>
          </Link>
          <h1 className="text-white text-3xl font-semibold flex justify-center items-center">Elenco: {team_name}</h1>
      </div>
      <div className="h-px bg-slate-500 w-full mb-10 mt-4 px-3"></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mx-6">
        {players.map((player) => (
          <div key={player.id_player} className="relative bg-slate-300 rounded-lg p-2 shadow-md h-40 overflow-hidden">
            <img 
              src={player.team_icon} 
              alt={`${team_name} icon`} 
              className="absolute inset-0 w-full h-full object-scale-down opacity-10"
            />
            <div className="h-px bg-slate-700 mt-0"></div>
            <div className="relative z-10">
              <h2 className="mt-4 text-gray-800 font-semibold">{player.player_name}</h2>
              <div className="grid grid-flow-col grid-cols-2">
                <div className="text-sm">
                  <p className="mt-3 text-gray-600">Pos: {player.player_position}</p>
                  <p className="text-gray-600">Age: {player.player_age}</p>
                </div>
                <div className="flex justify-center items-center">
                  <img 
                    src={player.player_image} 
                    alt="player image" 
                    className="w-[86px] h-20 rounded-lg object-scale-down"
                  />
                </div>
              </div>
            </div>
            <div className={`absolute top-[1px] right-[1px] text-white rounded-full w-8 h-8 flex items-center justify-center border border-slate-700 ${getSkillColor(player.player_skill)} z-20`}>
                {player.player_skill}
            </div>
            <div className="h-px bg-slate-700 mt-6"></div>
          </div>
        ))}
      </div>



    </div>
  );
}