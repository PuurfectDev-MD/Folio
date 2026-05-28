"use server"
import { createClient } from "@/utilis/supabase/server"
import { redirect } from "next/navigation"

export interface BlogFetch {
    id: string
    title: string
    content: string
    created_at: string
    author_id: string
}
export async function viewBlogById(id: string): Promise<{ error: string } | BlogFetch> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("blogs").select(`id, title, content, created_at, author_id`

    ).eq("id", id).single()
    if (error) {
        console.log("Error fetching blog", error)
        return { error: error.message }
    }


    const blog: BlogFetch = {
        id: data.id,
        title: data.title,
        content: data.content,
        created_at: data.created_at,
        author_id: data.author_id,

    }
    return blog
}



export async function editBlog(formData: FormData, blogId: string): Promise<{ error: string } | BlogFetch> {
    const supabase = await createClient()
    const { data: { user }, error: userFetchError } = await supabase.auth.getUser()
    if (userFetchError) {
        return { error: userFetchError.message };
    }
    if (!user?.id) {
        redirect("/login")
    }

    const author_id = user.id

    const title = formData.get("title") as string
    const content = formData.get('content') as string

    const { data, error: editError } = await supabase.from("blogs").update({
        title,
        content
    }).select().eq("id", blogId).eq("author_id", user.id).single()

    if (editError) {
        return { error: editError.message }
    }

    const blog: BlogFetch = {
        id: data.id,
        title: data.title,
        content: data.content,
        created_at: data.created_at,
        author_id: data.author_id,

    }
    return blog
}