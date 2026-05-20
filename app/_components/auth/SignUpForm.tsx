'use client';

import { signUp } from '@/app/auth/actions';
import { useState } from 'react';
import { ErrorFeedback } from "@/components/ui/error_feedback";
import Link from 'next/dist/client/link';
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

            <div className="flex flex-col gap-y-4 justify-center items-center h-[90vh]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                    <label htmlFor="username">Username
                        <input className="pl-2 border-b-2 border-white" type="text" id="username" name="username" />
                    </label>

                    <label htmlFor="email">Email
                        <input className="pl-2 border-b-2 border-white" type="email" id="email" name="email" />
                    </label>

                    <label htmlFor="password">Password
                        <input className="pl-2 border-b-2 border-white" type="password" id="password" name="password" />
                    </label>

                    <label htmlFor="confirmPassword">Confirm Password
                        <input className="pl-2 border-b-2 border-white" type="password" id="confirmPassword" name="confirmPassword" />
                    </label>

                    <button type="submit" className="cursor-pointer p-2 bg-blue-500 text-white rounded" >Sign Up</button>
                </form>
                <div className="flex gap-x-4 justify-center items-center">
                    <p>Already have an account?</p>
                    <Link href="/auth/login">Log in</Link>
                </div>

            </div>

        </>
    )
}