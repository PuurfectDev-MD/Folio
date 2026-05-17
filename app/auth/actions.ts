'use server'

import { createClient } from '@/utilis/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData): Promise<{ error: string } | void> {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: { user }, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        throw new Error(error.message)
    }
    revalidatePath('/', 'layout')
    redirect(`/${user?.id}`)
}

export async function signUp(formData: FormData): Promise<{ error: string } | void> {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
                username: formData.get('username') as string,
            },
        },
    });

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect(`/${data.user?.id}`)

}


export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/auth/login')
}