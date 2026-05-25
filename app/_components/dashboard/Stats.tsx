import { createClient } from "@/utilis/supabase/server";
import { redirect } from "next/navigation";

export async function Stats() {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (!user || authError) {
        redirect("/auth/login")
    }
    const { count: userStats, error } = await supabase.from("blogs").select("*", { count: "exact", head: true }).eq("author_id", user.id)

    return (
        <>
            <div className="grid grid-cols-3 gap-x-5 p-4">
                <div className="card">
                    <h1>{userStats ?? 0}</h1>
                    <h4>Notes written</h4>
                </div>
                <div className="card">
                    <h1>{userStats ? userStats : "0"}</h1>
                    <h4>Notes written</h4>
                </div>
                <div className="card">
                    <h1>{userStats ? userStats : "0"}</h1>
                    <h4>Notes written</h4>
                </div>
            </div>
        </>
    )
}