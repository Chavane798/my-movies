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

export default function Homepage() {
  const { data, error } = useSWR(
    "https://fearless-deer-39d52e19d7.strapiapp.com/api/homepage?populate=*",
    fetcher
  );

  // Mensagens de erro ou carregamento
  if (error) return <p className="text-center text-red-500 mt-10">❌ Falha ao carregar os dados.</p>;
  if (!data) return <p className="text-center text-gray-500 mt-10">⏳ Carregando...</p>;

  // Dados vindos da API
  const { title, description, image } = data.data;

  return (
    <div className="p-6 sm:p-10 bg-gray-50 min-h-screen rounded-md flex flex-col items-center">
      {/* Título */}
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">{title}</h1>

      {/* Descrição */}
      {description && (
        <div className="text-gray-600 mb-6 max-w-2xl text-center">
          {description.map((para, index) => (
            <p key={index} className="mb-4 last:mb-0">{para.children[0].text}</p>
          ))}
        </div>
      )}

      {/* Imagem */}
      {image?.length > 0 && (
        <img
          src={image[0].formats?.medium?.url || image[0].url} // Usa medium se disponível, senão usa original
          alt={image[0].name || "Imagem"}
          className="w-full max-w-lg h-56 object-cover rounded-lg shadow-md"
        />
      )}
    </div>
  );
}
