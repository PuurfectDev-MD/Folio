import { redirectIfAuthenticated } from "@/utilis/redirectIfAuthenticated"
import Home from "./_components/index/Home"

export default async function Page() {
  await redirectIfAuthenticated()
  return <Home />
}