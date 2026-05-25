'use client';

import { signUp } from '@/app/auth/actions';
import { useState } from 'react';
import { ErrorFeedback } from "@/components/ui/error_feedback";
import Link from 'next/dist/client/link';
import { LoadingScreen } from '@/components/ui/loadingScreen';
export function SignupForm() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string | null>(null);


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
        setLoading(true)

        try {
            const result = await signUp(formData);
            if (result?.error) {
                console.log(result?.error)
                setError(result.error);
            }
            setMessage("Success! Go check your email to verify to access your account.")
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred. Try again!');
        } finally {
            setLoading(false);
        }

    }
    return (
        <>
            {error && <ErrorFeedback errorMsg={error} reset={() => setError(null)} />}
            {loading && <LoadingScreen></LoadingScreen>}

            {message ? (
                <div className='w-screen h-full flex justify-center'>
                    <div className="flex flex-col items-center gap-y-4 text-center max-w-sm p-6 bg-zinc-900 border border-zinc-800 rounded-lg justify-center ">
                        <p className="text-white text-xl font-semibold">Check your inbox!</p>
                        <p className="text-zinc-300">{message}</p>
                        <Link href="/auth/login" className="mt-2 text-blue-400 hover:underline">
                            Go to Log In
                        </Link>
                    </div>
                </div>
            ) : (

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
                        {!message &&

                            <button type="submit" className="cursor-pointer p-2 bg-blue-500 text-white rounded" >Sign Up</button>
                        }
                    </form>
                    <div className="flex gap-x-4 justify-center items-center">
                        <p>Already have an account?</p>
                        <Link href="/auth/login">Log in</Link>
                    </div>

                </div>
            )}


        </>
    )
}