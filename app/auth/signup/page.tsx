
import { SignupForm } from "@/app/_components/auth/SignUpForm";
import { redirectIfAuthenticated } from "@/utilis/redirectIfAuthenticated";

export default async function SignupPage() {
    await redirectIfAuthenticated()
    return <SignupForm />;
}


