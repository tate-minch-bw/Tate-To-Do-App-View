import React from "react";

interface propType {
  name: string;
  id: number;
  setUserId: (userId: number) => void;
  deleteButton: (userId: number) => void;
}

export default function UserCard(props: propType) {
  const clickHandler = () => {
    props.setUserId(props.id);
  };

  const deleteButton = () => {
    props.deleteButton(props.id);
  };

  return (
    <div className="p-2 flex">
      <div
        onClick={clickHandler}
        className="bg-white rounded-lg p-4 text-center cursor-pointer w-fit mx-auto"
      >
        <div className="text-black">{props.name}</div>
      </div>
      <button className="bg-blue-500 text-white rounded-lg p-2 text-sm ml-2">
        edit
      </button>
      <button
        onClick={deleteButton}
        className="bg-blue-500 text-white rounded-lg p-2 text-sm ml-2"
      >
        delete
      </button>
    </div>
  );
}
