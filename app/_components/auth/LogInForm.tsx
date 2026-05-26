"use client"

import { login } from "@/app/auth/actions"
import { useState } from "react"
import { ErrorFeedback } from "@/components/ui/error_feedback"
import Link from "next/link"
import { LoadingScreen } from "@/components/ui/loadingScreen"

export function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!email || !password) {
            setError("All fields are requried")
            return
        }
        setLoading(true)


        try {
            const result = await login(formData);
            if (result?.error) {
                console.log(result?.error)
                setError(result.error);
                setLoading(false)
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred. Try again!');
            setLoading(false)
        }

    }

    return (
        <>
            {error && <ErrorFeedback errorMsg={error} reset={() => setError(null)} />}
            {loading && <LoadingScreen></LoadingScreen>}
            <div className="flex flex-col gap-y-4 justify-center items-center h-[90vh]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                    <label htmlFor="email">Email
                        <input className="pl-2 border-b-2 border-white" type="email" id="email" name="email" />
                    </label>

                    <label htmlFor="password">Password
                        <input className="pl-2 border-b-2 border-white" type="password" id="password" name="password" />
                    </label>

                    <button type="submit" className="cursor-pointer p-2 bg-blue-500 text-white rounded" >Log In</button>
                </form>
                <div className="flex gap-x-4 justify-center items-center">
                    <p>Don't have an account?</p>
                    <Link href="/auth/signup">Sign up</Link>
                </div>

            </div>


        </>
    )
}