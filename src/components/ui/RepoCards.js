import React, {useState, useEffect} from "react";
import { BsFlag, BsFlagFill, BsTrash } from "react-icons/bs";
import { BiGitRepoForked } from "react-icons/bi";
import Languages from "./Languages";
import { months } from "@/constants";
import { Toaster, toast } from "sonner";
import Link from "next/link";

function RepoCards({ repo, onSave }) {
  

  const dateObject = new Date(repo?.updated_at);
  const day = dateObject.getDate();
  const monthAbbreviation = months[dateObject.getMonth()];
  const formattedDate = `Updated on ${day} ${monthAbbreviation}`;


//Funcion para guardar un Repositorio
  const saveCard = () => {
    onSave(repo)
    toast("repository Added")
  }

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
            <Link href={`/repos/${repo?.owner?.login}/${repo?.name}`} className="text-[14px] lg:text-[16px] text-[#4551BD] overflow-x-hidden">
              {repo?.full_name}
            </Link>
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
      
    
      <button
        onClick={saveCard}
        className="w-full h-fit m-auto mr-1"
      >
        <BsFlag className="text-white" />
      </button>
   
    
    </div>
  );
}

export default RepoCards;
