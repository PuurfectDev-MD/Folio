"use client"
import { useAppContext } from "@/utilis/supabase/AppContext"
import Link from "next/link"
import { PlusIcon } from "@phosphor-icons/react"

export default function Home() {
    const { session, loading } = useAppContext()
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : session ? (
                <div>
                    <h1>Hello {session.user?.email || "no user"}</h1>
                </div>
            ) : null}
            <div className="flex justify-center w-screen">
                <Link className="cursor-pointer p-2" href="/create"><PlusIcon size={46} /></Link>
            </div>
        </>
    )


}