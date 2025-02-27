"use client";
import useSWR from "swr";

// Função fetcher para buscar dados da API
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar dados");
  }
  return res.json();
};

export default function AuthorsPage() {
  const { data, error } = useSWR(
    "https://fearless-deer-39d52e19d7.strapiapp.com/api/authors?populate=*",
    fetcher
  );

  // Mensagens de erro ou carregamento
  if (error) return <p className="text-center text-red-500 mt-10">❌ Falha ao carregar os autores.</p>;
  if (!data) return <p className="text-center text-gray-500 mt-10">⏳ Carregando...</p>;

  return (
    <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">Autores</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((author) => (
          <div
            key={author.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <img
              src={author.avatar?.formats?.medium?.url || author.avatar?.url}
              alt={author.name}
              className="w-32 h-32 object-cover rounded-full shadow"
            />

            {/* Nome e Email */}
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{author.name}</h2>
            <p className="text-gray-600">{author.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
