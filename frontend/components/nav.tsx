"use client"
import Link from "next/link"
import SignOutButton from "./signOut"

export default function Navbar(){
    return (
        <div>
            <h1>Navbar</h1>
            <Link href="/sign-in">Sign In</Link>
            <br />
            <Link href="/sign-up">Sign Up</Link>
            <br />
            <Link href="/" >Home</Link>
            <br />
            <SignOutButton />
        </div>
    )
}