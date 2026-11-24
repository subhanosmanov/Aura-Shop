export default function CommentsSkeleton() {
    return (
        <div
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 space-y-6 animate-pulse"
            aria-hidden="true"
        >
            <div className="border-b pb-3 border-gray-100">
                <div className="h-7 w-52 bg-gray-200 rounded-lg" />
            </div>

            <div className="space-y-3">
                <div className="w-full h-24 bg-gray-100 border border-gray-200 rounded-xl" />

                <div className="flex justify-end">
                    <div className="h-9 w-28 bg-gray-200 rounded-lg" />
                </div>
            </div>

            <div className="space-y-4 pt-2">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="p-4 rounded-xl border border-gray-100 space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                <div className="h-4 w-28 bg-gray-200 rounded" />
                            </div>
                            <div className="h-3 w-20 bg-gray-100 rounded" />
                        </div>

                        <div className="space-y-2 pl-10">
                            <div className="h-3.5 w-full bg-gray-200 rounded" />
                            <div className="h-3.5 w-4/5 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
