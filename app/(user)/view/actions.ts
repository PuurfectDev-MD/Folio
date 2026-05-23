import { createClient } from "@/utilis/supabase/server"


interface BlogCardInfoFetch {
    id: string,
    title: string,
    created_at: string
}


export async function viewAllBlogs(): Promise<{ error: string } | { blogCards: BlogCardInfoFetch[] }> {

    const supabase = await createClient()
    const { data: { user }, error: userFetchError } = await supabase.auth.getUser()
    if (userFetchError) {
        return { error: userFetchError.message };
    }
    if (!user?.id) {
        return { error: "User not authenticated" };
    }
    const author_id = user.id
    const { data, error } = await supabase
        .from("blogs")
        .select("id, title, created_at")
        .eq("author_id", author_id)

    if (error) {
        return { error: error.message };
    }

    if (!data) {
        return { blogCards: [] };
    }
    const blogCards: BlogCardInfoFetch[] = data.map((blog) => ({
        id: blog.id,
        title: blog.title,
        created_at: blog.created_at
    }))

    return { blogCards }
}