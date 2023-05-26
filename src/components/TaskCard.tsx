import React from "react";

interface propType {
    id:number;
    task:string;
}

export default function TaskCard(props:propType){
    // return (
    //     <div className="p-2 flex">
    //         <div className="bg-white rounded-lg p-4 text-center cursor-pointer w-96 mx-auto">
    //             <div className="text-black">{props.task}</div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="p-2 flex">
          <div className="relative bg-white rounded-lg p-4 text-center w-96 mx-auto">
            <div className="text-black mb-2">{props.task}</div>
            <button className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-lg p-2 text-sm">
              Delete
            </button>
          </div>
        </div>
      );


}
