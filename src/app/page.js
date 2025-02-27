"use client";
import AuthorsPage from "./component/author";
import Filmes from "./component/filmes";
import Homepage from "./component/homepage";
import Servicos from "./component/servicos";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 sm:p-20 font-geist">
      <main className="flex flex-col gap-10 w-full max-w-4xl">
        <Filmes />
        <Homepage />
        <Servicos />
        <AuthorsPage />
      </main>
    </div>
  );
}
