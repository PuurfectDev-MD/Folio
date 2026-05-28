"use client"
import { deleteBlogById, viewAllBlogs } from "@/app/(user)/view/actions"
import { ErrorFeedback } from "@/components/ui/error_feedback"
import Link from "next/link"
import { TrashIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { LoadingScreen } from "@/components/ui/loadingScreen"

export default function ViewAllBlogs() {
    const [blogs, setBlogs] = useState<{ id: string; title: string; created_at: string }[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadBlogs() {
            try {
                const result = await viewAllBlogs()

                if ("error" in result) {
                    setError("There was an error fetching the blogs.")
                } else {
                    setBlogs(result.blogCards)
                }
            } catch (err) {
                setError("Failed to communicate with the server.")
            } finally {
                setLoading(false)
            }
        }

        loadBlogs()
    }, [])


    async function handleDelete(id: string) {
        setLoading(true)
        await deleteBlogById(id)
        setLoading(false)
        setBlogs((blogs) => blogs.filter((blog) => blog.id !== id))
    }
    return (
        <>


            {error ? (<ErrorFeedback errorMsg="There was an error fetching the blogs." reset={() => { window.location.reload() }} />) : (
                <div className="flex flex-col gap-y-5 pt-6 p-4 g">
                    {blogs.map((blog: { id: string; title: string; created_at: string }) => (
                        <div className="flex justify-between w-full" key={blog.id}>
                            <Link href={`/blogs/${blog.id}`} className="w-[90%]">
                                <div className="p-4 border rounded-lg shadow-sm " >
                                    <h2 className="text-xl font-bold">{blog.title}</h2>
                                    <p className="text-gray-500 text-sm">{blog.created_at}</p>
                                </div></Link>
                            <div className="p-2 w-[10%] flex justify-center">
                                <button className="cursor-pointer" onClick={() => handleDelete(blog.id)}><TrashIcon size={32}></TrashIcon></button>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            {loading && <LoadingScreen></LoadingScreen>}

        </>
    )
}