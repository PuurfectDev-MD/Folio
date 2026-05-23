
import { viewAllBlogs } from "@/app/(user)/view/actions"
import { ErrorFeedback } from "@/components/ui/error_feedback"
import Link from "next/link"


export async function ViewAllBlogs() {

    const result = await viewAllBlogs()
    if ("error" in result) {
        return
    }
    return (
        <>

            {"error" in result ? (<ErrorFeedback errorMsg="There was an error fetching the blogs." reset={() => { window.location.reload() }} />) : (

                <div className="space-y-4 pt-6 p-4">
                    {result.blogCards.map((blog: { id: string; title: string; created_at: string }) => (
                        <Link href={`/blogs/${blog.id}`} key={blog.id}>
                            <div className="p-4 border rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                <p className="text-gray-500 text-sm">{blog.created_at}</p>
                            </div></Link>
                    ))}
                </div>
            )}

        </>
    )
}