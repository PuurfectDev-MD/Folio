import { viewBlogById } from "../actions"
import { notFound } from "next/navigation"
import ViewBlog from "@/app/_components/blog/ViewBlog"
import { LoadingScreen } from "@/components/ui/loadingScreen"
import { Suspense } from "react"


export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const result = await viewBlogById(id)

    if ('error' in result) notFound()

    return (
        <Suspense fallback={<LoadingScreen></LoadingScreen>}>
            <ViewBlog blog={result} />
        </Suspense>
    )
}

