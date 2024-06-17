import { useEffect, useState } from "react";
import { getTeams } from "../api";
import { TeamsResponse } from "./types";
import { Link } from "react-router-dom";

export interface TeamsProps {
  team_id: number;
  team_name: string;
  team_country: string;
  team_skill: number;
  team_icon: string;
}

export function ContentTeams() {
  const [teams, setTeams] = useState<TeamsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (err) {
        setError('Erro ao buscar times');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-t from-slate-950 to-slate-900 flex flex-col items-center py-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6 flex items-center justify-center">Teams</h2>
      <div className="max-w-7xl w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center justify-center">
          {teams.length === 0 ? (
            <p className="text-white text-center col-span-6">No teams available</p>
          ) : (
            teams.map(team => (
              <div key={team.id_team} className="bg-transparent/20 hover:bg-transparent/40 rounded-lg shadow-lg py-4 flex flex-col items-center justify-center hover:cursor-pointer border border-slate-500">
                <h3 className="text-lg font-bold text-gray-300 hover:underline">{team.team_name}</h3>
                <Link to={`/teams/${team.team_name}`}>
                  <img src={team.team_icon} alt={`${team.team_name} icon`} className="w-36 h-36 object-scale-down" />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
  
}
