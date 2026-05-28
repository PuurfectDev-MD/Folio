"use client"

import { BlogFetch } from "@/app/(user)/blogs/actions"
import Link from "next/link"
import { PencilSimpleIcon } from "@phosphor-icons/react"

export default function ViewBlog({ blog }: { blog: BlogFetch }) {
    const editUrl = `/blogs/edit/${blog.id}?title=${encodeURIComponent(blog.title)}&content=${encodeURIComponent(blog.content)}`
    return (
        <div className="flex flex-col items-center p-6 gap-y-6 w-screen">
            <div className="flex justify-between w-full">
                <h1 className="text-4xl">{blog.title}</h1>
                <Link href={editUrl}><PencilSimpleIcon size={32}></PencilSimpleIcon></Link>
            </div>
            <div className="flex pt-4 text-center">
                <p>{blog.content}</p>
            </div>


        </div>
    )
}