"use client"

import { BlogFetch } from "@/app/(user)/blogs/actions"

export default function ViewBlog({ blog }: { blog: BlogFetch }) {
    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <p>By {blog.username}</p>
        </div>
    )
}