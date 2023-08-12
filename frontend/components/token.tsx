"use client"
import { useAuth } from "@/app/context/auth"
export default function Token (){
   
    const {token} = useAuth();
    console.log(token);
    console.log("token");
    return(
        <h1>{token}</h1>
    )
}