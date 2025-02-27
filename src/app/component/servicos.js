"use client";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Erro ao buscar serviços");
  }
  return res.json();
};

export default function Servicos() {
  const { data, error } = useSWR(
    "http://localhost:1337/api/services?populate=*",
    fetcher
  );

  if (error) return <p className="text-red-500">Falha ao carregar os serviços.</p>;
  if (!data) return <p className="text-gray-500">Carregando...</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Serviços</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.length > 0 ? (
          data.data.map((servico) => (
            <div key={servico.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800">{servico.attributes?.title || "Título não disponível"}</h2>
              <p className="text-gray-600">{servico.attributes?.description || "Descrição não disponível"}</p>
              {servico.attributes?.image?.data?.attributes?.url && (
                <img
                  src={`http://localhost:1337${servico.attributes.image.data.attributes.url}`}
                  alt={servico.attributes.title || "Imagem"}
                  className="w-full h-56 object-cover mt-4 rounded-md"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum serviço encontrado.</p>
        )}
      </div>
    </div>
  );
}
