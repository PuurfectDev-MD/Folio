"use client"
import { logout } from "@/app/auth/actions"
import { useAppContext } from "@/utilis/supabase/AppContext"
import Link from "next/link"

export default function Home() {
    const { session, loading } = useAppContext()
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : session ? (
                <div>
                    <h1>Hello {session?.user?.email || "no user"}</h1>
                    <button className="cursor-pointer" onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>No session found</div>
            )}
            <div className="border-2 border-dashed border-red-500 w-screen">
                <Link className="cursor-pointer p-2" href="/create">Create</Link>
            </div>
        </>
    )


}