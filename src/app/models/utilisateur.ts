import { pays } from "./pays";
import { role } from "./role";

export interface utilisateur{
    id? : number;
    firstname : string;
    lastname: string;
    email: string;
    role: any;
    pays?: any;
    createdAt?: Date;
    updatedAt?: Date;

    nomImageProfil?: string;
    imageProfil?: any; 

}