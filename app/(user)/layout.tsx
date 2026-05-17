import { redirect } from "next/navigation"
import { createClient } from "@/utilis/supabase/server"
export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
        redirect('/auth/login')
    }
    return (
        <section>{children}</section>
    )
}