import { Suspense } from 'react';
import NavbarSearch from './navbarSearch';
import NavbarAction from './navbarAction';
import NavbarSkeleton from './navbarSkeleton';

export default function Navbar() {

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center py-4 px-3 border-b gap-4">
          
            <div className="font-bold text-xl">AuraShop</div>

            <NavbarSearch />

            <Suspense fallback={<NavbarSkeleton />}>
                <NavbarAction />
            </Suspense>
        </nav>
    )
};