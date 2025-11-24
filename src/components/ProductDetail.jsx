import { Link, useParams } from "react-router-dom";
import PageHeading from "./PageHeading";
import order from "../assets/order.png"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const bgRef = useRef();
  const popUpRef = useRef();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductData()
    gsap.set(bgRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(popUpRef.current, { y: "100%", scale: 0.4 });
  }, []);

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
      let product = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}?populate=true`)
      if (product.status == 200) {
        console.log(product);
        setProduct(product.data)
        console.log("Data Fetched");

      } else {
        console.log("Cannot Fetch Data");
      }
    } catch (err) {
      console.log("Err:" + err);
    }

  }


  if (!product)
    return (
      <div className="h-screen absolute w-screen items-center justify-center text-3xl text-red-500">
        Item not found
      </div>
    );

  return (
    <>
      <div ref={bgRef} className="h-screen  w-screen bg-[#00000050] fixed z-[99999] text-center opacity-0 pointer-events-none">
        <div ref={popUpRef} className="absolute h-[60%] w-[95%] md:h-[450px] md:w-[600px] bg-[#ffffff] rounded-2xl bottom-5 left-[50%] -translate-x-[50%] ">
          <div className="h-[72%] w-full flex flex-col px-4 md:px-10 items-center justify-start pt-4">
            <h1 className="font-extrabold text-2xl md:text-3xl uppercase text-[#52b345] pb-4">Place Order</h1>
            <p>Please click <span className="italic font-semibold">contact button</span> and place order with your preferred <span className="italic font-semibold text-[#52b345]">social media platform</span>.</p>
            <div className="h-[45%] md:h-[150px] w-auto">
              <img className="h-full w-full object-cover" src={order} alt="order.animation" />
            </div>
            <p className="text-sm font-light text-[#444444] cursor-default">Your order is one click away!</p>
          </div>
          <div className="h-[14%] w-full flex items-center justify-center">
            <Link to="/contact" className="bg-[#52b345] text-[#ffffff] text-xl w-[70%] md:w-[40%] h-full flex items-center justify-center rounded-full cursor-pointer font-semibold">Contact</Link>
          </div>
          <div onClick={popUpClose} className="h-[14%] w-full flex items-center justify-center">
            <h1 className="text-lg cursor-pointer w-full h-full flex items-center justify-center">Cancel</h1>
          </div>
        </div>
      </div>
      <div className="pt-14">
        <PageHeading nav="All products" link="/products" title="Detail" desc="Details about the prodcut." />
      </div>
      <div className=" px-10 flex flex-col md:flex-row overflow-x-hidden">
        <div className="md:w-1/2 p-10 md:mt-10">
          <img
            className="h-full object-cover"
            src={product?.image.url}
            alt={product?.name}
          />
        </div>
        <div className="md:w-1/2 md:pt-32 flex flex-col gap-2 md:px-5">
          <div>
            <h1 className="text-2xl">{product.name}</h1>
            <p className="text-sm text-[#666666] font-light capitalize">- {product.category.name}</p>
          </div>
          <div className="">
            <p className="text-xl font-light">Price</p>
            <p className="text-3xl ">Rs {product?.price}</p>
          </div>
          <div className="grid grid-cols-3 gap-1 px-2">
            {
              product.otherImages.map((e)=>(
                  <img key={e.url}  src={e.url} alt="e"  />
              ))
            }
          </div>
          <div className="pt-4 md:pt-16">
            <p className="text-[#666666]">Stock :</p>
            <p className="text-[#1cac08] underline font-light tracking-wide">{product.stock?"Available":"Sold Out"}</p>
          </div>
          <button onClick={popUpOpen} className="bg-[#222222] text-[#f2f2f2] flex items-center justify-center w-[150px] py-1 rounded-full cursor-pointer">
            Place Order
          </button>
          <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-2"></div>
          <p className="text-xs text-[#666666] px-1">{product?.description}</p>
          <div className="w-full h-[1px] bg-[#c5c5c5] rounded-full my-2"></div>
        </div>
      </div>
    </>
  );
};



export default ProductDetail
