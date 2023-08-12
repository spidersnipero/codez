
export default async function signUpUser(name:string,email: string, password: string){
    try{
        const val = fetch("http://localhost:8000/sign_up",{
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify({name,email,password}),
            cache:"no-cache"
        }).then(
            (res)=>{
                if(res.ok){
                    return res.json();
                }
                else{
                    if(res.status===401){
                        throw Error("User Already exist");
                    }
                    if(res.status===500){
                        throw Error("Server Problem")
                    }
                }
            }
        ).catch(e =>
            {   
                return {error: e.message};
            }
        );
        return val;
    }
    catch(err){
        return {error: "Server error"};
    }
    
}
