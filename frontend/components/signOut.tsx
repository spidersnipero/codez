"use client"
import signOutUser from "@/app/api/auth/sign_out";
import { useAuth } from "@/app/context/auth"

export default function SignOutButton(){
    const {token,setToken} = useAuth();
    function handelSignout(){
        async function middleFunction(){
            const val  = await signOutUser(token)
            console.log(val);
            if(val){
                setToken("");
            }
            else{
                alert("something went wrong");
            }
            
        }
        middleFunction();
        
    } 
    return (
        <button onClick={handelSignout}>Sign Out</button>
    )
}
