import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="">
      <div className="bg-[#e9e9e9] text-[#222222] rounded-2xl py-5 md:py-2">
        <div className="px-2 flex items-center justify-center">
          <img
            className="object-cover rounded-xl w-[250px] md:w-auto"
            src={product.img}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col my-3 px-5 md:px-2">
          <p className="md:text-[10px] text-[#52b345]">{product.category}</p>
          <h1 className="text-xl md:text-sm">{product.name}</h1>
        </div>
        <div className="flex mb-1 px-5 md:px-2 w-full items-end">
          <div className="text-lg md:text-sm w-1/3 text-[#1CAC08]">Rs {product.price}</div>
          <Link
            className="w-2/3 flex items-center justify-center bg-[#222222] text-[#e9e9e9] rounded-full text-sm py-2"
            to={`/product/${product.id}`}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
