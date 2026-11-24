import { Suspense } from "react";
import SearchSkeleton from "./searchSkeleton";
import SearchContent from "@/components/search/searchContent";

type SearchPageProps = {
    searchParams: Promise<{ query: string }>;
};

export default async function Search({ searchParams }: SearchPageProps) {
    return (
        <Suspense fallback={<SearchSkeleton />}>
            <SearchContent searchParams={searchParams} />
        </Suspense>
    )
};