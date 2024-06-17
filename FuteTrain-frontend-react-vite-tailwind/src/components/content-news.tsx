import axios from "axios"
import { useEffect, useState } from "react"
import { getNews } from "../api";

interface Article {
    id: number;
    title: string;
    content: string;
}

export function ContentNews() {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const usersData = await getNews();
            setNews(usersData);
          } catch (err) {
            setError('Erro ao buscar notícias');
          } finally {
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);


    if (loading) {
    return <div>Loading...</div>;
    }


    return(
        <div className="bg-gradient-to-t from-slate-950 to-slate-900 w-full h-full fixed flex-grow overflow-y-auto pb-[10rem]">
            <div className="h-px bg-gray-200 mb-1"></div>

            <div className="p-4">
                <h2 className="left-auto right-auto  justify-center flex mb-2 text-slate-300 text-bold font-bold text-lg">News</h2>
                {news.length === 0 ? (
                    <p>No news available</p>
                ) : (
                    <ul>
                    {news.map((article) => (
                        <li key={article.id} className="mb-4 p-4 bg-green-200/70 border border-black rounded-md">
                        <h2 className="text-lg font-bold">{article.title}</h2>
                        <p>{article.content}</p>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        </div>
        );
}