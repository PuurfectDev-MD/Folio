'use client';

import { signUp } from '@/app/auth/actions';
import { useState } from 'react';
import { ErrorFeedback } from "@/components/ui/error_feedback";
export function SignupForm() {
    const [error, setError] = useState<string | null>(null);



    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const result = await signUp(formData);
            if (result?.error) {
                setError(result.error);
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred. Try again!');
        }

    }
    return (
        <>
            {error && <ErrorFeedback errorMsg={error} reset={() => setError(null)} />}
            <div>
                <h1>Form</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <label htmlFor="username">Username
                    <input type="text" id="username" name="username" />
                </label>
                <label htmlFor="email">Email
                    <input type="email" id="email" name="email" />
                </label>

                <label htmlFor="password">Password
                    <input type="password" id="password" name="password" />
                </label>
                <label htmlFor="confirmPassword">Confirm Password
                    <input type="password" id="confirmPassword" name="confirmPassword" />
                </label>

                <button type="submit" className="cursor-pointer" >Submit</button>
            </form>

        </>
    )
}