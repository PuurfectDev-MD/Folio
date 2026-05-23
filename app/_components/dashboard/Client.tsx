"use client"
import { useAppContext } from "@/utilis/supabase/AppContext"
import { PlusIcon } from "@phosphor-icons/react"
import Link from "next/link"

export function DashboardClient() {
    const { session, loading } = useAppContext()

    return (

        <>
            {loading ? (
                <div>Loading...</div>
            ) : session ? (
                <div className="p-6 flex justify-between">
                    <div className="flex flex-col gap-y-1">
                        <h3 className="text-4xl">Welcome back!</h3>
                        <h1 className="text-5xl">{session.user?.email || "no user"}</h1>
                    </div>

                    <Link className="cursor-pointer pr-4 flex justify-center" href="/create"><PlusIcon size={46} /></Link>
                </div>
            ) : null}


        </>

    )
}


