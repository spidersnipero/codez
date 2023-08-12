"use client"

import signUpUser from "@/app/api/auth/sign_up";
import { useState } from "react"
import { useAuth } from "@/app/context/auth";

export default function SignUpForm(){
    const {setToken} = useAuth();

    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [cpassword,setCPassword] = useState<string>("");
    const [nameError,setNameError] = useState<string>("");
    const [emailError,setEmailError] = useState<string>("");
    const [passwordError,setPasswordError]= useState<string>("");
    const [cpasswordError,setCpasswordError] = useState<string>("");
    const [formError,setFormError] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);

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
        if(name===""){
            setNameError("Enter name")
            flag = false;
        }
        else{
            setNameError("");
        }
        if(checkString(email)){
               const validateEmail = (email:string) => {
                return String(email)
                    .toLowerCase()
                    .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    );
                };
                if(validateEmail(email)){
                    setEmailError("");
                }
                else{
                    flag = false;
                    setEmailError("enter valid email");
                }
        }
        else{
            setEmailError("should not be any space in email")
            flag = false;
        }
        if(checkString(password)){
            if(password.length < 8) { 
                flag = false;
                setPasswordError("Password must be at least 8 characters"); 
            } 
            else if(password.search(/[a-z]/) < 0) { 
                flag = false;
                setPasswordError(" Password must contain at least one lowercase letter"); 
            } 
            else if(password.search(/[A-Z]/) < 0) { 
                flag = false;
                setPasswordError("Password must contain at least one uppercase letter"); 
            } 
            else if(password.search(/[0-9]/) < 0) { 
                flag = false;
                setPasswordError("Error: Password must contain at least one number"); 
            }
            else{
                setPasswordError("");
            }
        }
        else{
            setPasswordError("should not be any space in password")
            flag=false;
        }
        if(password!==cpassword){
            flag=false;
            setCpasswordError("confrom password is not same as password")
        }
        else{
            setCpasswordError("");
        }
        return flag;
    }

    function handleName(e:React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value)
    }
    function handleEmail(e:React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }
    function handlePassword(e:React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }
    function handleCPassword(e:React.ChangeEvent<HTMLInputElement>){
        setCPassword(e.target.value);
    }

    function handelSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        async function middleFunction(){
            const val  = await signUpUser(name,email,password);
            if(val.token){
                setToken(val.token);
            }
            else if(val.error){
                setFormError(val.error);
            }
        }

        try{
            if(validateForm()){
                setLoading(true)
                middleFunction();
                setLoading(false)
            }
        }
        catch (e){
            console.log(e);
        }
    }

    return (
        <div>
            <h1>sign up</h1>
            <form onSubmit={handelSubmit}>
                <div>
                    <input type="text" name="name" id="name" placeholder="name" onChange={handleName} />
                    {nameError!="" && <p>{nameError}</p>}
                </div>
                <div>
                    <input type="text" name="email" id="email" placeholder="email" onChange={handleEmail} />
                    {emailError!="" && <p>{emailError}</p>}
                </div>
                <div>
                    <div>
                        <input type="password" name="password" id="password" placeholder="password" onChange={handlePassword} />
                        {passwordError!="" && <p>{passwordError}</p>}
                    </div>
                    <div>
                        <input type="password" name="cpassword" id="cpassword" placeholder="conform password" onChange={handleCPassword}  />
                        {cpasswordError!="" && <p>{cpasswordError}</p>}
                    </div>
                </div>
                <div>
                    <button type="submit" >submit</button>
                </div>
                {formError!="" && <p>{formError}</p>}
                {loading && <p>loading...</p>}
            </form>
        </div>
    )

}