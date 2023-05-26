import React from "react";

interface propType {
    name:string;
    id:number;
    setUserId: (userId:number) => void;
}

export default function UserCard(props: propType) {
    const clickHandler = () => {
      props.setUserId(props.id);
    };

    return (
      <div className="p-2 flex">
        <div onClick={clickHandler} className="bg-white rounded-lg p-4 text-center cursor-pointer w-44 mx-auto">
          <div className="text-black">{props.name}</div>
        </div>
      </div>
    );
  }



