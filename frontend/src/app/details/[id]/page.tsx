import { Suspense } from "react";
import DetailsSpinner from "../detailsSkeleton";
import DetailsContent from "@/components/detailsContent/detailsContent";

type DetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function Details({ params }: DetailsPageProps) {
    return (
        <Suspense fallback={<DetailsSpinner />}>
            <DetailsContent params={params} />
        </Suspense>
    )
};