import { createClient } from "@/utilis/supabase/server"

export interface BlogFetch {
    id: string
    title: string
    content: string
    created_at: string
    author_id: string
    username: string | null
}
export async function viewBlogById(id: string): Promise<{ error: string } | BlogFetch> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("blogs").select(`id, title, content, created_at, author_id, users(username)`

    ).eq("id", id).single()
    if (error) {
        console.log("Error fetching blog", error)
        return { error: error.message }
    }
    const user = (data.users as unknown) as { username: string } | null

    const blog: BlogFetch = {
        id: data.id,
        title: data.title,
        content: data.content,
        created_at: data.created_at,
        author_id: data.author_id,
        username: user?.username || null
    }
    return blog
}