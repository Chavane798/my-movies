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
    "http://localhost:1337/api/homepage?populate=*",
    fetcher
  );

  // Mensagens de erro ou carregamento
  if (error) return <p className="text-red-500">Falha ao carregar os dados.</p>;
  if (!data) return <p className="text-gray-500">Carregando...</p>;

  // Dados vindos da API
  const { title, description, image } = data.data;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">{title}</h1>
      <div className="text-gray-600 mb-6">
        {description?.map((para, index) => (
          <p key={index}>{para.children[0].text}</p>
        ))}
      </div>
      {image?.length > 0 && (
        <img
          src={`http://localhost:1337${image[0].formats.medium.url}`}
          alt={image[0].name || "Imagem"}
          className="w-full h-56 object-cover rounded-md"
        />
      )}
    </div>
  );
}
