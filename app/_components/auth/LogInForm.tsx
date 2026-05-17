"use client"

import { login } from "@/app/auth/actions"
import { useState } from "react"
import { ErrorFeedback } from "@/components/ui/error_feedback"

export function LoginForm() {
    const [error, setError] = useState<string | null>(null)
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!email || !password) {
            setError("All fields are requried")
            return
        }

        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
            return
        }

    }

    return (
        <>
            {error && <ErrorFeedback errorMsg={error} reset={() => setError(null)} />}
            <div>
                <h1>Login Form</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <label htmlFor="email">Email
                    <input type="email" id="email" name="email" />
                </label>

                <label htmlFor="password">Password
                    <input type="password" id="password" name="password" />
                </label>

                <button type="submit" className="cursor-pointer" >Submit</button>
            </form>

        </>
    )
}