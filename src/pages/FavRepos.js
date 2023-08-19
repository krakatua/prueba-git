import Layout from "@/components/Layout";
import RepoCards from "@/components/ui/RepoCards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import debounce from 'lodash/debounce';

function FavRepos() {
  const [savedRepoCards, setSavedRepoCards] = useState([]);
  const router = useRouter();
  const {data:session} = useSession();
  const [repoData, setRepoData] = useState([])

  useEffect(() => {
    const storedRepoCards = localStorage.getItem("savedRepo");
    if (storedRepoCards) {
      setSavedRepoCards(JSON.parse(storedRepoCards));
    }
  }, []);

  useEffect(() => {
    const debouncedFunction = debounce(() => {
      const uniqueObjects = [];
      const seenIDs = new Set();

      for (const obj of savedRepoCards) {
        if (!seenIDs.has(obj.id)) {
          uniqueObjects.push(obj);
          seenIDs.add(obj.id);
        }
      }

      setRepoData(uniqueObjects);
    }, 500);

    debouncedFunction();

    return () => {
      debouncedFunction.cancel();
    };
  }, [savedRepoCards]);

  function clearLocalStorage() {
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
      router.push('/')
    }
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    const filtered = savedRepoCards.filter((item) =>
      item.name.includes(searchTerm)
    );
    const filtered2 = savedRepoCards.filter((item) =>
      item.full_name.includes(searchTerm)
    );
    setFilteredArray(filtered);
    setFilteredArray(filtered2);
  }, [savedRepoCards, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <Layout>
      <Toaster/>
      <div className='flex flex-col justify-center items-center mt-10'>
        <div className='flex flex-col gap-3 justify-center items-center mb-5'>

        <h1 className="">Tus Repositorios Guardados</h1>
        <div className='flex gap-3'>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar por nombre" 
        className='bg-transparent outline-none
          text-white font-bold border p-1 rounded-md'/>
        <button 
        onClick={clearLocalStorage}
        className='bg-white font-bold p-2 rounded-md hover:bg-red-600 hover:text-white transition-all'>
          Clear List
        </button>
        </div>
        
        </div>
        <ul className='flex flex-col gap-2'>
          {filteredArray?.map((repoCard, index) => (
            <RepoCards key={repoCard.id} repo={repoCard}/>
          ))}
        </ul>
      </div>
      {filteredArray.length === 0 ? (
          <div className="flex flex-col justify-center mt-5">
            <h1 className="text-white text-center">
              {`Hi! ${session?.user?.name}, you dont have any repository saved`}
            </h1>
            <img
              className="md:max-w-[1000px] m-auto"
              src="https://github.com/images/modules/search/home-desktop-dark.webp"
            />
          </div>
        ) : (
          <div/>
        )}
    </Layout>
  );
}

export default FavRepos;
