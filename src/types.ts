export interface UserType {
    email:string;
    id:number;
    name:string;
    tasks:TaskType[];
}

export interface TaskType {
    id:number;
    task:string;
}
