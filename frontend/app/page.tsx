import Token from "@/components/token";
import Navbar from "@/components/nav";
async function Home(){
    return( 
        <div>
            <h1>Home</h1>
            <Token />
            <Navbar />
        </div>
    )
}
export default Home;