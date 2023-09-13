import { useParams } from "react-router-dom";
import { useProductList } from "../../../api/products";

export const ProductDetails = () => {
  const productId = useParams().productId;
  const { status, data: products } = useProductList();

  if (status === "error" || productId === undefined) {
    return <h1>Upps, something went wrong </h1>;
  }
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  const product = products[parseInt(productId) - 1];

  return (
    <div className="flex flex-row">
      <div>
        <img src={product.image} alt={product.title} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <p>
          <span>description:</span> {product.description}
        </p>
      </div>
    </div>
  );
};
