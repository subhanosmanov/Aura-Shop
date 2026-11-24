import Dashboard from "@/components/dashboard/dashboard";
import FilterCard from "@/components/filterCard/filterCard";
import FilterProduct from "@/components/filterCard/filterCard";
import Navbar from "@/components/navbar/navbar";
import ProductCategorySections from "@/components/productCategorySections/productCategory/productCategorySections";

export default function Home() {

  return (
    <div className="p-5">
      <Navbar />
      <FilterCard />
      <Dashboard />
      <main>
        <ProductCategorySections />
      </main>
    </div>
  );
}
