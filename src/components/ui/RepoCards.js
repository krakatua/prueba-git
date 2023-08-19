import React, {useState, useEffect} from "react";
import { BsFlag, BsFlagFill, BsTrash } from "react-icons/bs";
import { BiGitRepoForked } from "react-icons/bi";
import Languages from "./Languages";
import { months } from "@/constants";
import { Toaster, toast } from "sonner";

function RepoCards({ repo }) {
  const [isSaved, setIsSaved] = useState(false);
  const [saveRepos, setSaveRepos] = useState([]);

  const dateObject = new Date(repo?.updated_at);

  const day = dateObject.getDate();
  const monthAbbreviation = months[dateObject.getMonth()];

  const formattedDate = `Updated on ${day} ${monthAbbreviation}`;

 
const handleAdd = () => {
  onSave(repo); // Aquí llama a la función para guardar el repoCard
  setIsSaved(true);
  toast(`${repo?.full_name} was added to your list`);
}

useEffect(() => {
  const storeRepo = localStorage.getItem("savedRepo");
  if (storeRepo) {
    setSaveRepos(JSON.parse(storeRepo))
  }
}, []);

//Funcion para guardar un Repositorio
const saveRepoCard = (repoCard) => {
  setSaveRepos((prevSaveRepos) => {
    const updatedRepoCards = [...prevSaveRepos, repoCard];
    localStorage.setItem("savedRepo", JSON.stringify(updatedRepoCards));
    toast("Elemento guardado");
    return updatedRepoCards;
  });
}

const removeRepoCard = (repoCard) => {
  const updatedRepoCards = saveRepos.filter((repo) => repo.id !== repoCard.id);
  setSaveRepos(updatedRepoCards);

  localStorage.setItem("savedRepo", JSON.stringify(updatedRepoCards));
  toast("Elemento eliminado");
}

const isRepoSaved = saveRepos.some((repo) => saveRepos.id === repo.id);

console.log(saveRepos)
  

  return (
    <div className="flex border border-gray-500  rounded-md">
      <Toaster/>
      <div className="flex justify-start items-center   max-w-[700px]">
        <div className=" flex flex-col gap-1 p-2 pr-0 w-[320px] lg:w-[700px]">
          <div className="flex justify-start items-center gap-2">
            <picture>
              <img
                className="w-[25px] rounded-full"
                src={repo?.owner?.avatar_url}
              />
            </picture>
            <h1 className="text-[14px] lg:text-[16px] text-[#4551BD] overflow-x-hidden">
              {repo?.full_name}
            </h1>
          </div>
          <div></div>
          <h2 className="text-[10px] lg:text-[14px]">{repo?.description}</h2>
          <Languages lang={repo?.languages_url} />
          <div
            className="flex justify-start items-center gap-2 text-[12px]
        "
          >
            <div className="flex justify-center items-center gap-1 cursor-not-allowed">
              <BiGitRepoForked className="text-gray-500" />
              <h1 className="text-gray-500">{repo?.forks}</h1>
            </div>
            <h2 className="text-[12px] font-extralight text-gray-500">
              {formattedDate}
            </h2>
          </div>
        </div>
      </div>
      {isRepoSaved ? (
      <button
        onClick={() => removeRepoCard(repo)}
        className="w-full h-fit m-auto mr-1"
      >
        <BsTrash className="text-white" />
      </button>
    ) : (
      <button
        onClick={() => saveRepoCard(repo)}
        className="w-full h-fit m-auto mr-1"
      >
        <BsFlag className="text-white" />
      </button>
    )}
    
    </div>
  );
}

export default RepoCards;
