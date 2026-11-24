export default function NavbarSkeleton() {
    return (
        <div className="flex items-center gap-4" aria-hidden="true">
            <div className="h-[36px] w-[64px] rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-[36px] w-[82px] rounded-lg bg-gray-200 animate-pulse" />
        </div>
    )
};