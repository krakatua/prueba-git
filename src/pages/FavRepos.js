import Layout from "@/components/Layout";
import RepoCards from "@/components/ui/RepoCards";
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import { Toaster, toast } from "sonner";

function FavRepos() {
  const [savedRepoCards, setSavedRepoCards] = useState(
    JSON.parse(localStorage.getItem("savedRepo")) || []
  );
  const router = useRouter()
  const [uniqueList, setUniqueList] = useState([])

  function removeDuplicateObjects(array) {
    const uniqueObjects = [];
    const seenIDs = new Set();
  
    for (const obj of array) {
      if (!seenIDs.has(obj.id)) {
        uniqueObjects.push(obj);
        seenIDs.add(obj.id);
      }
      setUniqueList(uniqueObjects)
    }
  
    return uniqueObjects;
  }

  useEffect (() =>{
    removeDuplicateObjects(savedRepoCards)
  }, [savedRepoCards])

  function clearLocalStorage() {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  }

  return (
    <Layout>
      <Toaster/>
      <div className='flex flex-col justify-center items-center mt-10'>
        <div className='flex gap-3 justify-center items-center mb-5'>

        <h1 className="">Tus Repositorios Guardados</h1>
        <button 
        onClick={clearLocalStorage}
        className='bg-white font-bold p-2 rounded-md hover:bg-red-600 hover:text-white transition-all'>
          Clear List
        </button>
        </div>
        <ul className='flex flex-col gap-2'>
          {uniqueList.map((repoCard, index) => (
            <RepoCards key={repoCard.id} repo={repoCard}/>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default FavRepos;
