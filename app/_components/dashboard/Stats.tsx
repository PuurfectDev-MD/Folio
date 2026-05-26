"use server"
import { createClient } from "@/utilis/supabase/server";
import { redirect } from "next/navigation";
import { CreateButton } from "./CreateButton";

export async function Stats() {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (!user || authError) {
        redirect("/auth/login")
    }
    const { count: userStats, error } = await supabase.from("blogs").select("*", { count: "exact", head: true }).eq("author_id", user.id)

    return (
        <>
            <div className="p-4">
                <h3 className="text-4xl">Hello there</h3>
                <h1 className="text-5xl">{user?.user_metadata.username || "no username"} !</h1>
            </div>



            <div className="flex w-full justify-between max-h-200 p-4">
                <div className="card p-4 w-100 h-64 flex flex-col justify-between">
                    <h1 className="text-8xl py-3">{userStats ? userStats : "0"}</h1>

                    <div className="py-3">
                        <h4 className="text-3xl ">Notes written</h4>
                        <p className="italic">**Thats not enough..</p>
                    </div>

                </div>

                <div className="flex justify-center items-center">
                    <CreateButton></CreateButton>
                </div>



            </div>
        </>
    )
}