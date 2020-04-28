import { Privilege } from "../../shared/privilege";
import { Address } from "../../addresses/shared/address";
import { Skill } from "../../skills/shared/skill";

enum Sex {
    M = 'Male',
    F = 'Female',
    NA = 'Prefer not to answer'
}

export class User{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    sex: Sex;
    telephone: string;
    privilege: Privilege;
    dob: string;
    age: number;
    addresses: Address[];
    skills: Skill[];
}