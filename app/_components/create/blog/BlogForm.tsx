"use client"

import { postBlog } from "@/app/(user)/create/actions";
import { ErrorFeedback } from "@/components/ui/error_feedback";
import { LoadingScreen } from "@/components/ui/loadingScreen";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function BlogForm() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        if (!title || !content) {
            setError("All fields are required");
            return;
        }
        console.log("Validation complete.Sending to the db.")
        const post = await postBlog(formData)

        if ('error' in post) {
            setLoading(false)
            setError(post.error)
        } else {
            router.push(`/blogs/${post.id}`)
        }


    }
    return (
        <>
            {error && <ErrorFeedback errorMsg={error} reset={() => setError(null)} />}
            {loading && <LoadingScreen />}
            <div className="flex flex-col gap-4 items-center">
                <form className="p-4 flex flex-col gap-y-4" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" id="title" name="title" />
                    <textarea placeholder="Content" id="content" name="content"></textarea>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}