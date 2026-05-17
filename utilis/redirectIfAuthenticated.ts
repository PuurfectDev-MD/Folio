import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"

export async function redirectIfAuthenticated() {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
        console.error("Auth check failed:", error.message)
        return
    }
    if (user) {
        redirect(`/${user.id}`)
    }
}   