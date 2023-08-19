import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Layout from "@/components/Layout";
import RepoCards from "@/components/ui/RepoCards";
import UserCards from "@/components/ui/UserCards";
import { Toaster, toast } from "sonner";
import Skeleton from "@/components/ui/Skeleton";
import { useSession } from "next-auth/react";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const {data:session} = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("users");
  const [loading, setLoading] = useState(true);


  //Hago esto para prevenir que cuando se cambie el valor del select no haga una peticion a la api.
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchResults([]);
    setSearchTerm("")
  };

  //el HandleSearch se hara cargo de mandar la request al api para poder conseguir la informacion deseada.
  const handleSearch = async (e, page = 1) => {
    e.preventDefault(); //Evitar el envio del formulario

    if (searchTerm === "") {
      toast.error("Type something in order to get data");
      return;
    }
    //Hacer el request al api para poder obtener los datos y con este poder hacer una paginacion
    const response = await fetch("/api/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchType, userSearch: searchTerm, page }),
    });

    //chequeamos si hay algun tipo de error
    if (response.ok) {
      const data = await response.json();
      setSearchResults(data);
      setCurrentPage(page);
      setLoading(false)
    } else {
      toast('Internal Server Error')
    }
  };

  // Cargar los datos almacenandos desde que se inicia
 



  

  //Verificar si con el filtro que estamos pasando hay que generar la tabla users o Repositories
  const renderResults = () => {
    if (searchType === "users") {
      return (
        <div
          className={`${
            searchResults === 0 ? "hidden" : "block"
          } flex flex-col mb-2 gap-2 p-2`}
        >
          {
              searchResults?.items?.map((user) => (
                <UserCards key={user?.id} user={user} /> || <Skeleton key={index}/>
              ))
          }
        </div>
      );
    } else {
      return (
        <div
          className={`${
            searchResults === 0 ? "hidden" : "block"
          } flex flex-col mb-2 gap-2 p-2`}
        >
          {searchResults?.items?.map((repo) => (
            <RepoCards key={repo.id} repo={repo} />
          ))}
        </div>
      );
    }
  };



  return (
    <Layout>
      <Toaster />
      <div className="h-fit mt-10 flex flex-col items-center">
        <div className="p-5 flex justify-center items-center gap-5">
          <form
            className="flex flex-wrap justify-center items-center gap-5"
            onSubmit={handleSearch}
          >
            <div></div>
            <div
              className="border p-2 w-fit rounded-lg flex justify-center items-center
          focus:"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-[350px] bg-transparent outline-none
          text-white font-bold"
                placeholder={
                  searchType === "users"
                    ? "Search users"
                    : "Search repositories"
                }
              />
              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                className="bg-white border rounded shadow-sm p-2 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="users">users</option>
                <option value="repositories">Repos</option>
              </select>
              <button
                className={`text-white text-[34px] hover:scale-105 transition-all`}
                type="submit"
              >
                <AiOutlineSearch />
              </button>
            </div>
          </form>
        </div>
        <div
          className={`${
            searchResults ? "block" : "hidden"
          } + flex gap-5 justify-around items-center mb-5`}
        >
          <h1
            className={`${
              searchResults?.total_count === 0 ? "block" : "hidden"
            } text-2xl font-extralight`}
          >
            {searchResults?.total_count} Results{" "}
          </h1>
        </div>
        {renderResults()}
        {
          //Verificar si hay datos para poder mostrar los botones de paginacion
        }
        {searchResults.length === 0 ? (
          <div className="flex flex-col justify-center mt-5">
            <h1 className="text-white text-center">
              {searchType === "users"
                ? `Hi! ${session?.user?.name}, Search users in GitHub`
                : `Hi! ${session?.user?.name}, Search Repositories in GitHub`}
            </h1>
            <img
              className="md:max-w-[1000px] m-auto"
              src="https://github.com/images/modules/search/home-desktop-dark.webp"
            />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5">
            <button
              className="btn-pagination"
              disabled={currentPage === 1}
              onClick={(e) => handleSearch(e, currentPage - 1)}
            >
              Anterior
            </button>
            <button
              className="btn-pagination"
              onClick={(e) => handleSearch(e, currentPage + 1)}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;
