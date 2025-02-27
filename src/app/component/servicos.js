"use client";
import useSWR from "swr";
import Image from "next/image";

// Função fetcher para buscar dados da API
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar dados");
  }
  return res.json();
};

export default function ServicosPage() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/services?populate=*",
    fetcher
  );

  // Mensagens de erro ou carregamento
  if (error) return <p className="text-center text-red-500 mt-10">❌ Falha ao carregar os serviços.</p>;
  if (!data) return <p className="text-center text-gray-500 mt-10">⏳ Carregando...</p>;

  return (
    <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">Serviços</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((servico) => (
          <div
            key={servico.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
          >
            {/* Imagem */}
            <Image
              src={`http://localhost:1337${servico.image?.formats?.medium?.url || '/uploads/default-image.jpg'}`}
              alt={servico.title}
              width={750}
              height={422}
              className="object-cover rounded-md mb-4"
            />

            {/* Título e Descrição */}
            <h2 className="text-xl font-semibold text-gray-800 mt-4">{servico.title}</h2>
            <p className="text-gray-600">
              {servico.description && servico.description.length > 0
                ? servico.description[0]?.children[0]?.text
                : "Descrição não disponível"}
            </p>

            {/* Categoria */}
            <p className="text-gray-500 mt-2">Categoria: {servico.category?.name || 'Não especificada'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
