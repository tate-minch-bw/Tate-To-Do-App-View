import React from "react";

interface propType {
    name:string;
    id:number;
    setUserId: (userId:number) => void;
}

export default function UserCard(props:propType){
    const clickHandler = () => {
        props.setUserId(props.id);
    }
    return <div onClick={clickHandler}>{props.name}</div>
}