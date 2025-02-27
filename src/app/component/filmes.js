"use client";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar filmes");
  }
  return res.json();
};

export default function Filmes() {
  const { data, error } = useSWR(
    "https://fearless-deer-39d52e19d7.strapiapp.com/api/filmes?populate=*",
    fetcher
  );

  if (error) return <p className="text-red-500">Falha ao carregar os filmes.</p>;
  if (!data) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Filmes</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.length > 0 ? (
          data.data.map((filme) => (
            <div key={filme.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800">{filme?.nome || "Nome não disponível"}</h2>
              <p className="text-gray-600">Lançamento: {filme?.lancamento || "Data não disponível"}</p>
              {filme?.imagem?.url && (
                <img
                  src={filme.imagem.url}
                  alt={filme.nome || "Imagem"}
                  className="w-full h-56 object-cover mt-4 rounded-md"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}
