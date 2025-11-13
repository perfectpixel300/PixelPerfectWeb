import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#f1f1f1] text-[#222222] rounded-2xl overflow-hidden shadow-xl flex flex-col w-[250px] 2xl:h-[460px]">
      {/* Image Section */}
      <Link
        to={`/product/${product.id}`}
      >
        <div className="flex items-center justify-center p-2">
          <img
            className="object-cover rounded-xl w-full h-[220px] sm:h-[200px] md:h-[220px] lg:h-[240px] 2xl:h-[350px]"
            src={product.img}
            alt={product.name}
          />
        </div>
      </Link>


      {/* Text Section */}
      <div className="flex flex-col flex-grow justify-between px-4 pb-4">
        <div>
          <p className="text-[10px] sm:text-xs text-[#52b345] uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h1 className="text-base sm:text-sm md:text-[15px] font-semibold truncate">
            {product.name}
          </h1>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-[#1CAC08] font-semibold text-sm sm:text-base">
              Rs {product.price}
            </p>
            <p className="text-xs font-light cursor-default">{product.stock}</p>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="bg-[#222222] text-[#f1f1f1] rounded-full text-[12px] sm:text-sm px-3 sm:px-4 py-1.5 hover:bg-[#1CAC08] transition-colors duration-300"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
