"use server"
import { createClient } from "@/utilis/supabase/server";

export async function postBlog(formData: FormData): Promise<{ error: string } | { id: string }> {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    const supabase = await createClient()
    const { data, error } = await supabase.from("blogs").insert({ title, content }).select().single()
    if (error) {
        console.log("Error creating blog", error)
        return { error: error.message };
    }
    console.log("Blog created successfully")
    return { id: data.id }
}