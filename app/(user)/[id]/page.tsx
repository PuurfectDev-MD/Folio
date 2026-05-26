import { Quote } from "@/app/_components/dashboard/Quote"
import { Stats } from "@/app/_components/dashboard/Stats"


export default function Home() {
    return (
        <>
            <div className="p-4">
                <Quote></Quote>
            </div>


            <Stats></Stats>

        </>
    )


}

