export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center  backdrop-blur-2xl w-screen h-screen z-50 fixed top-0 left-0">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    )
}