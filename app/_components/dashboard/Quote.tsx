"use server"
import { Suspense } from "react"

export async function Quote() {
    const response = await fetch("https://quotesapi.prayushadhikari.com.np/api/quotes?categories=wisdom,motivation&limit=1")
    if (!response.ok) {
        return <p className="text-sm text-gray-400 text-center">Failed to fetch a fresh quote.</p>
    }
    const { data } = await response.json()

    if (!data[0].quote) {

        return <p className="text-sm text-gray-400 text-center">No quote available right now.</p>
    }
    console.log(data[0].quote)

    return (
        <div className="w-full flex shrink py-4 px-6 text-center bg-zinc-800 border border-zinc-800 rounded-lg">
            <Suspense fallback={<p>Loading....</p>}>
                <h1 className="text-6xl">{data[0].quote}</h1>
            </Suspense>

        </div>
    )
}