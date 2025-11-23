import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-[#f1f1f1] text-[#222222] rounded-2xl overflow-hidden shadow-xs flex flex-col w-[150px] h-[220px] md:h-auto md:w-[250px] 2xl:w-[350px] 2xl:h-[470px]">
      {/* Image Section */}
      <Link
        to={`/product/${product.id}`}
      >
        <div className="flex items-center justify-center p-2">
          <img
            className="object-cover rounded-xl w-full h-[120px]  md:h-[220px] lg:h-[240px] 2xl:h-[350px]"
            src={product?.image?.url}
            alt={product.name}
          />
        </div>
      </Link>


      {/* Text Section */}
      <div className="flex flex-col flex-grow justify-between px-4 pb-4">
        <div className="flex flex-col">
          <p className="text-[10px] sm:text-xs 2xl:text-base text-[#52b345] uppercase tracking-wide md:mb-1">
            {product.category.name}
          </p>
          <h1 className="text-[11px] sm:text-sm md:text-[15px] font-semibold truncate">
            {product.name}
          </h1>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between md:mt-3 ">
          <div>
            <p className="text-[#1CAC08] font-semibold text-[11px] md:text-base">
              Rs {product.price}
            </p>
            <p className="text-[7px] md:text-xs font-light cursor-default">{product.stock}</p>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="bg-[#222222] text-[#f1f1f1] rounded-full text-[10px] md:text-sm px-3 sm:px-4 py-1.5 hover:bg-[#1CAC08] transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
