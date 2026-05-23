import { ViewAllBlogs } from "@/app/_components/blog/ViewAllBlogs";
import { Suspense } from "react";
import { LoadingScreen } from "../../../components/ui/loadingScreen";

export default function ViewPage() {

    return (
        <>
            <div className="p-4 pt-6"><h2 className="text-5xl">All of your blogs</h2></div>
            <Suspense fallback={<LoadingScreen></LoadingScreen>}>
                <ViewAllBlogs></ViewAllBlogs>
            </Suspense>
        </>
    )
}