"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarSearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    function searchTermSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.push(`/search?query=${searchTerm}`);
        setSearchTerm("");
    };
    return (
        <>
            <div className="w-full md:w-1/3">
                <form onSubmit={searchTermSubmit}>
                    <input
                        type="text"
                        value={searchTerm || ""}
                        onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
                        placeholder="Məhsul axtar..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </form>
            </div>
        </>
    )
}
