import { LoginForm } from "@/app/_components/auth/LogInForm";
import { redirectIfAuthenticated } from "@/utilis/redirectIfAuthenticated";


export default async function LoginPage() {
    await redirectIfAuthenticated()
    return <LoginForm></LoginForm>

}