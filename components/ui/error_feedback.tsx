export function ErrorFeedback({ errorMsg, reset }: { errorMsg: string, reset: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={reset}
        >
            {/* Modal */}
            <div
                className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full mx-4"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h2>
                <p className="text-gray-700 mb-4">{errorMsg}</p>
                <button
                    onClick={reset}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    )
}