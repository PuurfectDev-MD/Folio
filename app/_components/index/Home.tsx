"use client"
import { logout } from "@/app/auth/actions"
import { useAppContext } from "@/utilis/supabase/AppContext"

export default function Home() {
    const { session } = useAppContext()
    return (
        <>
            <div>
                <h1>Hello {session?.user?.email || "no user"}</h1>
                <button className="cursor-pointer" onClick={logout}>Logout</button>
            </div>
            <div className="bg-amber-100 w-full h-20">
                <a className="cursor-pointer p-2">Create</a>
            </div>
        </>
    )
}