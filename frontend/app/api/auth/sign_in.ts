export default async function signInUser(email: string, password: string) {
    try{
        const val = await  fetch("http://localhost:8000/sign_in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-cache"
        }).then(
            (res) => {
                if(res.ok) {
                    return res.json();
                }
                else{
                    if(res.status === 401){
                        throw  Error("Invalid credentials");
                    }   
                    if(res.status === 500){
                        throw  Error("Server error");
                    }
                }
                
            }
        ).catch(err=>{ return {error: err.message};});
        return val;
    }
    catch(err){
        return { error: "Server error" };
    }
    
}
