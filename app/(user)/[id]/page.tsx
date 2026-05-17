"use client"
import { logout } from "@/app/auth/actions"
import { useAppContext } from "@/utilis/supabase/AppContext"


export default function Home() {
    const { session } = useAppContext()
    return (
        <div>
            <h1>Hello {session?.user?.email || "no user"}</h1>
            <button className="cursor-pointer" onClick={logout}>Logout</button>
        </div>
    )


}