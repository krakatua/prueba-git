import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Toaster, toast } from 'sonner';
import Followers from '@/components/ui/Followers';
import RepoCards from '@/components/ui/RepoCards';

export default function AccountPage() {
  const [userData, setUserData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [repos, setRepos] = useState([]);
  const [visible, setVisible] = useState(4);

  const showMoreItems = () => {
    setVisible((preVal) => preVal + 4);
  };

  async function getUser() {
    try {
      // Realizar la solicitud a tu API utilizando el método POST
      const response = await fetch("/api/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        toast("Data was fully loaded");
      } else {
        toast("Error loading data");
      }
    } catch (error) {
      console.error("Error fetching user data:", message);
      toast("An error occurred", message);
    }
  }

  useEffect(() => {
    getUser()
  }, [id]);
    
async function getRepos () {
  await userData;

  const response = await fetch(userData?.repos_url)
  const data = await response.json()
  setRepos(data)
}

useEffect(() => {
  getRepos()
}, [userData])



  return (
    <Layout>

      <Toaster/>
      <div className='flex justify-center items-start gap-10 mt-5'>

      <div className='flex justify-center items-center'>

        <div className='flex flex-col gap-3'>
        <img className='rounded-full' src={userData?.avatar_url}/>
          <div>

        <h1>{userData?.name}</h1>
        <h1 className='text-gray-400'>@{userData?.login}</h1>
          <button className='text-white w-full bg-gray-700 p-2 rounded-lg border border-gray-300'>Follow</button>
          </div>
          <div className='flex justify-start items-center gap-2 text-gray-400 text-[18px]'>

        <Followers url={userData?.followers_url}/> Followers
        <span className='text-white'>·</span>
        <br/>
        <h1 className='text-gray-400 text-[18px] font-extralight'>{userData?.following} following</h1>
          </div>
        <h1 className='text-white'>@{userData?.twitter_username}</h1>
        </div>
        
      </div>
      <div>

        <ul className='flex flex-col gap-2'>

        {
          repos?.slice(0, visible).map(repo => (
            <RepoCards key={repo.id} repo={repo}/>
          ))
          }
        </ul>
        
            <button
            className='text-white mt-5 bg-gray-700 border border-gray-400 p-2 rounded-lg hover:bg-white hover:text-black font-bold transition-all'
            id='loadmore'
            onClick={showMoreItems}>
              Load More
            </button>
        
      </div>
      </div>
    </Layout>
  )
}
