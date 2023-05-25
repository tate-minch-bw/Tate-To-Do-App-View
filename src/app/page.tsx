'use client';
import axios from "axios"
import React, {useEffect, useState} from 'react';
import { TaskType, UserType } from "../types";
import UserCard  from "../components/UserCard"

export default function Home(){
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(()=> {
    axios.get('http://localhost:8080/users').then(res => {
      setUsers(res.data);
    })
  },[]);

  const userClickHandler = (userId:number) => {
    setSelectedUser(userId);
  }

  const userCard = users.map((u) => {
    return <UserCard key={u.id} name={u.name} id={u.id} setUserId={userClickHandler}/>;
  });

  const user = users.find((u) => u.id === selectedUser);
  let tasks:TaskType[];
  if(user === undefined){
    tasks = [];
  }else{
    tasks = user.tasks;
  }

  return(
    <main>
      <div className="flex flex-col h-screen">
        <div className="bg-gradient-to-l from-black to-gray-600 p-4 text-left">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white py-2 px-4 mb-2">TodoManager</h1>
            <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
              <li className="mr-6 p-1 border-b-2 border-orange-500 hover:border-transparent">
                <a className="text-white cursor-pointer" href="https://github.com/tate-minch-bw/Tate-To-Do-App-View">Git Repo</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-grow flex">
          <div className="flex bg-gray-200 p-4 w-1/6 border-r border-gray-400">
            <div className="ml-4 flex flex-col">
              <h2 className="text-lg text-black font-medium mt-0 mb-2 border-b-2 border-orange-500">User List</h2>
              {userCard}
            </div>
          </div>
          <div className="flex bg-gray-300 p-4 w-5/6 text-center text-black">
            <span className= "mx-auto">{selectedUser !== null ? tasks.map((t) => <div key={t.id}>{t.task}</div>) : "Select a user to see their tasks"}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
