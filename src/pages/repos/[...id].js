import Layout from '@/components/Layout';
import { useRouter } from 'next/router'
import React, {useEffect, useState} from 'react';
import { Toaster, toast } from 'sonner';

export default function ReposPage() {
    
    const router = useRouter()
    const {id} = router.query
    console.log(id)
    const [getRepoData, setGetRepoData] = useState([])
    
    const repoData = {
        owner: id[0],
        name: id[1]
    }
    console.log(repoData)

    async function getRepodata() {
        try {
          // Realizar la solicitud a tu API utilizando el método POST
          const response = await fetch("/api/github", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ owner: repoData.owner, repoName: repoData.name }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setGetRepoData(data);
            toast("Data was fully loaded");
          } else {
            toast("Error loading data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          toast("An error occurred", error.message);
        }
      }
    
      useEffect(() => {
        getRepodata();
      }, [id]);

      console.log(getRepoData)

    return (
        <Layout>
            <Toaster/>
           <h1>
            </h1> 
            
        </Layout>
    )
}