"use server"
import { createClient } from "@/utilis/supabase/server";
import { redirect } from "next/navigation";

export async function postBlog(formData: FormData): Promise<{ error: string } | { id: string }> {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const supabase = await createClient()
    const { data: { user }, error: userFetchError } = await supabase.auth.getUser()
    if (userFetchError) {
        return { error: userFetchError.message };
    }
    if (!user?.id) {
        redirect("/login")
    }
    const author_id = user.id
    const { data, error } = await supabase.from("blogs").insert({ title, content, author_id }).select().single()
    if (error) {
        console.log("Error creating blog", error)
        return { error: error.message };
    }
    console.log("Blog created successfully")
    return { id: data.id }
}