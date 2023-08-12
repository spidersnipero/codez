"use client"

import { useAuth } from "@/app/context/auth"
import signInUser from "@/app/api/auth/sign_in";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default  function SignInForm(){
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [formError,setFormError] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    
    const {setToken} = useAuth();
    const router = useRouter();

    function checkString(st:string):boolean{
        if(st!=""){
            if(st.split(" ").length==1){
                return true;
            }
        }
        return false;
    }

    function validateForm():boolean{
        var flag = true;
        if(checkString(email)){
                const validateEmail = (email:string) => {
                return String(email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                };
                if(validateEmail(email)){
                    setFormError("");
                }
                else{
                    flag = false;
                    setFormError("enter valid email");
                }
        }
        else{
            setFormError("should not be any space in email")
            flag = false;
        }
        return flag;
    }          

    function handleEmail(e:React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }

    function handlePassword(e:React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        async function middleFunction(){
            const val = await signInUser(email,password);
            if(val.token){
                setToken(val.token);
            }
            else if(val.error){
                setFormError(val.error);
            }
            else{
                setFormError("someting is wrong");
            }
        }

        try{
            if(validateForm())
            {   
                setLoading(true);
                middleFunction();
                setLoading(false);
            }
        }
        catch {

        }

    }

    return (
        <div>
            <h1>Sign In</h1>
            <form  onSubmit={handleSubmit}>
                <div>
                    <input type="email" name="email" placeholder="email" onChange={handleEmail} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="password"  onChange={handlePassword}/>
                </div>
                <div>
                    <button type="submit" >Sign In</button>
                </div>
                {formError!=="" && <p>{formError}</p>}
                <div>
                    {loading && <p>loading...</p>}
                </div>
            </form>
        </div>
    );
}
