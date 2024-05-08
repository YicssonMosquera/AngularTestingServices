export interface User{
    id:string;
    email:string;
    password:string;
    namerole:'customer' | 'admin';
}