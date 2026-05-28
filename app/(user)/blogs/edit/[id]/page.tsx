import { EditBlog } from "@/app/_components/blog/EditBlog"

export default async function ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ title: string, content: string }> }) {
    const { id } = await params
    const { title, content } = await searchParams

    return (
        <EditBlog id={id} title={title || ""} content={content || ""}>
        </EditBlog>
    )
}