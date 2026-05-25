'use client'
import { useAppContext } from "@/utilis/supabase/AppContext";
import Link from "next/link";
import { logout } from "@/app/auth/actions"

export function NavBar() {
    const { session, loading } = useAppContext()
    return (
        <>
            <div className="flex px-3 py-2 justify-between">
                <div>
                    <h1 className="text-4xl">Folio</h1>
                </div>
                {session ? (
                    <div className="flex gap-x-4">
                        <Link href="/">Home</Link>
                        <Link href="/create">Create</Link>
                        <Link href="/view">View</Link>
                    </div>
                ) : null}
                <div className="flex pr-4">
                    {session?.user ? (
                        <button className="cursor-pointer" onClick={logout}>Logout</button>

                    ) : (

                        <Link href="/auth/login">Login</Link>
                    )}
                </div>
            </div>
        </>
    )
}