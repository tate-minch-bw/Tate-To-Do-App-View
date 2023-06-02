'use client';
import axios from "axios"
import React, {useEffect, useState, useTransition} from 'react';
import { TaskType, UserType } from "../types";
import UserCard  from "../components/UserCard"
import TaskCard from "../components/TaskCard"

export default function Home(){
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [enteredUsername, setEnteredUsername] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false);

  useEffect(()=> {
    axios.get('http://localhost:8080/users').then(res => {
      setUsers(res.data);
    })
  },[]);

  const userSelector = (userId:number) => {
    if(selectedUser === null || selectedUser !== userId)
      setSelectedUser(userId);
    else if (selectedUser === userId)
      setSelectedUser(null);
  }

  const deleteUserClickHandler = (userId:number) => {
    axios.delete('http://localhost:8080/user/' + userId).then(res => {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setSelectedUser(null);
    });
  };

  const deleteTaskClickHandler = (userId: number, taskId: number) => {
    axios.delete('http://localhost:8080/user/' + userId + '/task/' + taskId).then(res => {
      console.log(res.data);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                tasks: user.tasks.filter(task => task.id !== taskId),
              }
            : user
        )
      );
    });
  };

  const createNewUserHandler:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setShowNewUserForm(true);
  };

  const createNewUserSubmit:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if(enteredUsername !== "" && enteredEmail !== ""){
      const userData = {
        name:enteredUsername,
        email:enteredEmail,
      };
      axios.post('http://localhost:8080/user', userData).then(res => {
        console.log(res);
        setUsers((prevUsers) => [...prevUsers, res.data]);
        setEnteredEmail("");
        setEnteredUsername("");
      });
    }
    setShowNewUserForm(false);
  };
  
  const createNewUserCancel:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setShowNewUserForm(false);
    setEnteredEmail("");
    setEnteredUsername("");
  }

  const usernameHandler:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEnteredUsername(e.target.value);
  };

  const emailHandler:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEnteredEmail(e.target.value);
  };

  const userCard = users.map((u) => {
    return <UserCard key={u.id} name={u.name} id={u.id} setUserId={userSelector} deleteButton={deleteUserClickHandler}/>;
  });

  const user = users.find((u) => u.id === selectedUser);

  let tasks:TaskType[];
  let userTasksId:number;

  if(user === undefined)
    tasks = [];
  else{
    tasks = user.tasks;
    userTasksId = user.id;
  }

  const taskCard = tasks.map((t) => {
    return <TaskCard key={t.id} task={t.task} taskId={t.id} userId={userTasksId} deleteButton={deleteTaskClickHandler} />;
  });

  return(
    <main>
      <div className="flex flex-col h-screen relative">
          <div className={`bg-gray-500 bg-opacity-75 z-10 absolute inset-0 flex items-center justify-center ${showNewUserForm ? "" : "hidden"}`}>
            <div className="bg-white text-black drop-shadow-lg rounded-lg p-2">
              <button className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800" onClick={createNewUserCancel}>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex m-2">
                <div className="mr-2">username:</div>
                <input className="border border-gray-500 rounded-lg px-2" type="text" value={enteredUsername} onChange={usernameHandler}/>
              </div>
              <div className="flex m-2">
                <div className="mr-2">email:</div>
                <input className="border border-gray-500 rounded-lg px-2" type="text" value={enteredEmail} onChange={emailHandler}/>
              </div>
              <button onClick={createNewUserSubmit} className="ml-2 bg-orange-500 text-white rounded-lg text-sm">submit</button>
          </div>
        </div>
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
              <div className="border-b-2 border-orange-500">
                <h2 className="text-lg text-black font-medium mt-0 mb-2 text-center">User List</h2>
                <div className="p-2 flex items-center">
                  <button className="p-2 bg-orange-500 text-white rounded-lg text-sm" onClick={createNewUserHandler}>Create a New User</button>
                </div>
              </div>
              {userCard}
            </div>
          </div>
          <div className="flex bg-gray-300 p-4 w-5/6 text-center text-black relative">
            {selectedUser !== null ? (
              <div className="mx-auto">
                <div className="mb-4 border-b-2 border-orange-500">
                  <div>
                    <span>Tasks</span>
                  </div>
                  <div className="p-2">
                    <button className="p-2 bg-orange-500 text-white rounded-lg text-sm">Create a New Task</button>
                  </div>
                </div>
                {taskCard}
              </div>
            ) : (
              <span className="mx-auto">Select a user to see their tasks</span>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}