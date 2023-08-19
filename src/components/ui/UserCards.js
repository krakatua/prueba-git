import Link from 'next/link'
import React from 'react'
import Reposi from './Reposi'
import Followers from './Followers'

function UserCards({user}) {
  return (
    <div className="mt-1 animate-fade-right animate-once animate-ease-in-out">
          <div className="p-1 max-w-[700px]">
            <ul className="flex flex-col justify-center items-center gap-5">
          
                <li
                  key={user?.id}
                  className="w-[320px] lg:w-[700px] border border-gray-500  rounded-2xl hover:scale-105  transition-all "
                >
                  <Link
                    href={`/accounts/${user?.login}`}
                    className="p-2 flex items-center gap-5"
                  >
                    <img
                      src={user?.avatar_url}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div>
                      <h1>
                        {user?.login} {user?.id}
                      </h1>
                      <div
                        className="flex justify-start gap-2
                    "
                      >
                        <Reposi url={user?.repos_url} />
                        <Followers url={user?.followers_url} />
                      </div>
                    </div>
                  </Link>
                </li>
              
            </ul>
          </div>

        </div>
  )
}

export default UserCards