import { getMeProfile } from "@/services/auth/getMeProfile";
import Link from "next/link";

export default async function NavbarAction() {
    const { user } = await getMeProfile();
    return (
        user ?
            (
                <div className="flex items-center gap-4">
                    <Link className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm" href="/profile">Profil</Link>
                    <Link className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm" href="/basket">Sebetim</Link>
                </div>
            )
            : (<div className="flex gap-3">
                <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Daxil Ol
                </a>
                <a href="/register" className="px-4 py-2 border rounded-lg text-sm">
                    Qeydiyyat
                </a>
            </div>)
    )
}
