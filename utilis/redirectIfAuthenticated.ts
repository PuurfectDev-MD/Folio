import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"

export async function redirectIfAuthenticated() {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        console.error("Auth check failed:", error.message)
        return
    }
    if (session) {
        redirect(`/${session.user.id}`)
    }
    return
}   