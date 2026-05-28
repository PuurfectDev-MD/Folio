"use client"
import { editBlog } from "@/app/(user)/blogs/actions"
import { ErrorFeedback } from "@/components/ui/error_feedback"
import { LoadingScreen } from "@/components/ui/loadingScreen"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface EditBlogProps {
    id: string
    title: string
    content: string
}

export function EditBlog({ id, title, content }: EditBlogProps) {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        if (!title || !content) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        console.log("Validation complete.Sending to the db.")
        const post = await editBlog(formData, id)

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
            <div className="flex flex-col gap-4 items-center w-screen justify-center min-h-[85vh]">
                <form className="p-4 flex flex-col gap-y-4 w-full max-w-xl" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" id="title" name="title" defaultValue={title} className="w-full h-10 border border-white transition-all duration-200 focus:scale-[1.03]" />
                    <textarea placeholder="Content" id="content" name="content" defaultValue={content} className="w-full h-64 border-white border transition-all duration-200 focus:scale-[1.03]"></textarea>
                    <button type="submit" className="cursor-pointer">Post</button>
                </form>
            </div>
        </>
    )

}