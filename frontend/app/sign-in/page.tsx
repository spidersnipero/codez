import SignInForm from "@/components/signIn";
import Token from "@/components/token";
import Navbar from "@/components/nav";
function SignIn(){
    return (
        <div>
            <Navbar />
            <SignInForm />
            <Token />
        </div>
    )
}
export default  SignIn;