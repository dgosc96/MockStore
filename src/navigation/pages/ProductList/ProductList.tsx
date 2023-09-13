import { useProductList } from "../../../api/products";
import { ProductTileLink } from "./components/ProductTileLink";

function ProductListPage() {
  const { status, error, data: products } = useProductList();

  if (status === "loading") return <h1>Loading...</h1>;

  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <div className="mx-auto my-4 grid w-fit grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((val) => (
        <ProductTileLink key={val.id} data={val} />
      ))}
    </div>
  );
}
export { ProductListPage as Component };
