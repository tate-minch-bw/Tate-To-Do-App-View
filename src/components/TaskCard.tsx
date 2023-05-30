import React from "react";

interface propType {
  id:number;
  task:string;
}

export default function TaskCard(props:propType){
  return (
      <div className="p-2 flex">
        <div className="relative bg-white rounded-lg p-4 text-center w-96 mx-auto">
          <div className="text-black mb-2">{props.task}</div>
          <button className="bg-blue-500 text-white rounded-lg p-2 text-sm ml-2">
            Edit
          </button>
          <button className="bg-blue-500 text-white rounded-lg p-2 text-sm ml-2">
            Done
          </button>
        </div>
      </div>
    );
}
