export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-md">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200/50"></div>
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent"></div>
                </div>
                <p className="animate-pulse text-sm font-semibold tracking-widest text-gray-700 uppercase">
                    Loading...
                </p>
            </div>
        </div>
    )
}