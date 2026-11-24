export default function ProductListSkeleton() {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            aria-hidden="true"
        >
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl border border-gray-100 bg-white p-3 space-y-3 animate-pulse"
                >
                    <div className="h-44 w-full rounded-lg bg-gray-200" />
                    
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    
                    <div className="flex items-center justify-between pt-1">
                        <div className="h-5 w-16 rounded bg-gray-200" />
                        <div className="h-8 w-20 rounded-lg bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}
