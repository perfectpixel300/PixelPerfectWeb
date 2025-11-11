import { useParams } from "react-router-dom";
import { mostSoldProducts, newlyAddedProducts, } from "../context";

const ProductDetail = () => {
  const { id } = useParams();

  const allProducts = [...mostSoldProducts, ...newlyAddedProducts]
  const product = allProducts.find((item) => item.id === id);

  if (!product)
    return (
      <div className="h-screen w-screen items-center justify-center text-3xl text-red-500">
        Item not found
      </div>
    );

  return (
    <div className="pt-14 px-10 flex flex-col md:flex-row overflow-x-hidden">
      <div className="md:w-1/2 md:mt-10">
        <img
          className="h-full object-cover"
          src={product.img}
          alt={product.name}
        />
      </div>
      <div className="md:w-1/2 md:pt-32 flex flex-col gap-2">
        <div>
          <h1 className="text-2xl">{product.name}</h1>
          <p className="text-sm text-[#666666] font-light">- {product.category}</p>
        </div>
        <div className="">
          <p className="text-xl font-light">Price</p>
          <p className="text-3xl font-semibold">Rs {product.price}</p>
        </div>
        <div className="pt-4 md:pt-16">
          <p className="text-[#666666]">Stock</p>
          <p className="text-[#1cac08] underline font-light tracking-wide">{product.avaibility}</p>
        </div>
        <button className="bg-[#222222] text-[#f2f2f2] flex items-center justify-center w-[150px] py-1 rounded-full">
          Buy Now
        </button>
        <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-2"></div>
        <p className="text-xs text-[#666666]">{product.description}</p>
        <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-2"></div>
      </div>
    </div>
  );
};

export default ProductDetail;
