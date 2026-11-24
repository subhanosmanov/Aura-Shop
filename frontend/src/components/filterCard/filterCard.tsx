import FilterContent from "./filterContent";

export default function FilterCard() {

    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Məhsul Filtrləri</h2>
            <FilterContent />
        </div>
    )
};