"use client"

import { BlogFetch } from "@/app/(user)/blogs/actions"

export default function ViewBlog({ blog }: { blog: BlogFetch }) {
    return (
        <div className="flex flex-col items-center p-6 gap-y-6 w-screen">
            <div className="flex justify-between w-full">
                <h1 className="text-4xl">{blog.title}</h1>
                <p>By: {blog.username}</p>
            </div>
            <div className="flex pt-4 text-center">
                <p>{blog.content}</p>
            </div>


        </div>
    )
}