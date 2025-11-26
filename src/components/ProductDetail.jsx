import { Link, useParams } from "react-router-dom";
import PageHeading from "./PageHeading";
import order from "../assets/order.png";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const bgRef = useRef();
  const popUpRef = useRef();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pop-up animation
  const popUpOpen = () => {
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 0.4,
      pointerEvents: "auto",
    });
    gsap.to(popUpRef.current, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power4.inOut",
      delay: 0.1,
    });
  };

  const popUpClose = () => {
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.4,
      pointerEvents: "none",
    });
    gsap.to(popUpRef.current, {
      y: "100%",
      scale: 0.4,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}?populate=true`
      );
      if (response.status === 200) {
        const productData = response.data;
        setProduct(productData);

        const allImages = [productData.image, ...(productData.otherImages || [])];
        setMainImage(allImages[0]);
      } else {
        console.log("Cannot fetch data");
      }
    } catch (err) {
      console.log("Err: " + err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProductData();
  }, [id]);

  // Image switch with fade animation
  const handleImageClick = (img) => {
    gsap.to("#main-image", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setMainImage(img);
        gsap.to("#main-image", { opacity: 1, duration: 0.3 });
      },
    });
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-72 h-96 bg-gray-200 animate-pulse rounded-xl"></div>
      </div>
    );

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center text-3xl text-red-500">
        Item not found
      </div>
    );

  const allImages = [product.image, ...(product.otherImages || [])];

  return (
    <>
      {/* Pop-up */}
      <div
        ref={bgRef}
        className="h-screen w-screen bg-[#00000050] fixed z-[99999] text-center opacity-0 pointer-events-none"
      >
        <div
          ref={popUpRef}
          className="absolute h-[60%] w-[95%] md:h-[450px] md:w-[600px] bg-[#ffffff] rounded-2xl bottom-5 left-[50%] -translate-x-[50%]"
        >
          <div className="h-[72%] w-full flex flex-col px-4 md:px-10 items-center justify-start pt-4">
            <h1 className="font-extrabold text-2xl md:text-3xl uppercase text-[#52b345] pb-4">
              Place Order
            </h1>
            <p>
              Please click{" "}
              <span className="italic font-semibold">contact button</span> and
              place order with your preferred{" "}
              <span className="italic font-semibold text-[#52b345]">
                social media platform
              </span>
              .
            </p>
            <div className="h-[45%] md:h-[150px] w-auto">
              <img
                className="h-full w-full object-cover"
                src={order}
                alt="order.animation"
              />
            </div>
            <p className="text-sm text-[#444444] cursor-default">
              Your order is one click away!
            </p>
          </div>
          <div className="h-[14%] w-full flex items-center justify-center">
            <Link
              to="/contact"
              className="bg-[#52b345] text-[#ffffff] text-xl w-[70%] md:w-[40%] h-full flex items-center justify-center rounded-full cursor-pointer font-semibold"
            >
              Contact
            </Link>
          </div>
          <div
            onClick={popUpClose}
            className="h-[14%] w-full flex items-center justify-center"
          >
            <h1 className="text-lg cursor-pointer w-full h-full flex items-center justify-center">
              Cancel
            </h1>
          </div>
        </div>
      </div>

      <div className="pt-14">
        <PageHeading
          nav="All products"
          link="/products"
          title="Detail"
          desc="Details about the product."
        />
      </div>

      <div className="px-10 flex flex-col  md:flex-row overflow-x-hidden gap-10 md:gap-0">
        {/* Left - Main Image */}
        <div className="md:w-1/2 flex flex-col gap-4 md:mt-10">
          <div
            id="main-image"
            className="h-[300px] md:h-[500px] w-full overflow-hidden rounded-lg cursor-zoom-in"
          >
            <img
              src={mainImage?.url}
              alt={product.name}
              className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Thumbnails */}

        </div>

        {/* Right - Details */}
        <div className="md:w-1/2 md:pt-16 flex flex-col gap-4 pl-10">
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-sm text-gray-600 font-light capitalize">
              - {product.category.name}
            </p>
          </div>

          <div>
            <p className="text-xl font-light">Price</p>
            <p className="text-3xl font-semibold">Rs {product.price}</p>
          </div>

          <div className="pt-2">
            <p className="text-gray-600">Stock:</p>
            <p className={`font-light ${product.inStock ? "text-green-600" : "text-red-500"}`}>
              {product.inStock ? "Available" : "Sold Out"}
            </p>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {allImages.map((img, i) => (
              <div
                key={i}
                className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${img.url === mainImage?.url ? "border-[#52b345]" : "border-gray-300"
                  } cursor-pointer`}
                onClick={() => handleImageClick(img)}
              >
                <img
                  src={img.url}
                  alt={`thumb-${i}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <button
            onClick={popUpOpen}
            className="bg-[#222222] text-[#f2f2f2] flex items-center justify-center w-[150px] py-2 rounded-full cursor-pointer mt-4"
          >
            Place Order
          </button>

          <div className="w-full h-[1px] bg-gray-300 rounded-full my-2"></div>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="w-full h-[1px] bg-gray-300 rounded-full my-2"></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
