import { createClient } from '@/utilis/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)

        if (!error && data?.session) {
            return NextResponse.redirect(`${origin}/${data.session.user.id}`)
        }
    }

    return NextResponse.redirect(`/auth/login`)
}