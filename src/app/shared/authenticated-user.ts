import { Privilege } from "./privilege";
import { Address } from "../addresses/shared/address";
 
export class AuthenticatedUser{
    username: string;
    token: string;
    description: string;
   
    constructor(username: string, token: string, description: string){
        this.username = username;
        this.token = token;
        this.description = description;
    }
}