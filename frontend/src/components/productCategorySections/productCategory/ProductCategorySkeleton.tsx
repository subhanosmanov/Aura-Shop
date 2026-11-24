export default function ProductCategorySkeleton() {
    return (
        <div className="space-y-4" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <div key={sectionIndex} className="flex flex-col gap-4 p-3">
                    <div className="flex justify-between items-center animate-pulse">
                        <div className="h-6 w-40 rounded bg-gray-200" />
                        <div className="h-4 w-24 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    )
};