// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Octokit } from "octokit";

export default async function handler (req, res) {
  if (req.method === "POST") {
    const { searchType,  userSearch, page = 1, per_page = 15, username } = req.body;

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const searchEndpoint = searchType === "users" ? "/search/users" : "/search/repositories";

    try {
      let response;
      if (username) {
         response = await octokit.request('GET /users/{username}', {
          username: username,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
      } else {
        response = await octokit.request(`GET ${searchEndpoint}`, {
          q: userSearch,
          page,
          per_page
        });
      }
      

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

  
}