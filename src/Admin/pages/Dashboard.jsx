import { useState, useEffect } from "react"
import axios from "axios"
import AdminNav from "./AdminNav"
import { Link, useLocation } from "react-router-dom"
import Banners from "./Banners"

const Dashboard = () => {
  const location = useLocation;
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`, {
          params: {
            page,
            limit,
            dashboard: true,
            _t: Date.now()
          }
        }
        );


        const d = res.data;
        const items = d.products || d.data || d.results || d.items || [];

        setProducts(Array.isArray(items) ? items : []);

        const pages =
          d.totalPages ||
          d.pages ||
          (d.total ? Math.ceil(d.total / limit) : null);

        if (pages) setTotalPages(pages);
        else setTotalPages(1);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.message || "Failed to fetch");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // cancel on unmount
  }, [page, limit, location.key]);


  return (
    <>
      <AdminNav />

      <div className="md:px-15 px-5">
        <Link to={"/admin/banners"}>
          <div className="relative group overflow-hidden text-white h-28 p-10 rounded-2xl flex items-center  text-xl uppercase font-semibold tracking-wider">
            <img className="h-full -z-10 w-full absolute object-cover left-0 top-0 object-bottom" src="https://applescoop.org/image/wallpapers/mac/macos-12-monterey-stock-default-dark-17-09-2024-1726606874.jpg" alt="" />
            View Banners <i class="ri-arrow-right-line font-light text-2xl group-hover:ml-3 duration-150 ml-1"></i>
          </div>
        </Link>
        <h1 className="mb-4 mt-5 font-semibold text-xl">All Products</h1>

        {loading && <div className=" flex items-center min-h-24 justify-center">
          <div className="h-10 w-10 border-t-transparent  animate-spin border-4 rounded-full"></div>
        </div>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1">
          {products.map((p) => (
            <Link key={p._id} to={`/admin/edit/${p._id}`}>
              <div key={p._id} className="bg-gray-200 p-4 rounded-lg">
                <div>
                  <img
                    src={p.image.url}
                    alt={p.name}
                    className="xs:h-36 h-[70vw] object-cover w-full rounded-md"
                  />
                </div>
                <h1 className="text-sm font-semibold leading-none mt-2 truncate">{p.name}</h1>
                <div className="text-sm mt-3">{p.price != null ? `$${p.price}` : p.priceText || ""}</div>
                <div className="text-xs truncate">{p.description}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-2 justify-center items-center p-4 text-sm">
          <button className={(page <= 1 || loading) ? `bg-gray-200 text-gray-500 p-1 px-2 rounded-md` : `bg-gray-300 cursor-pointer p-1 px-2 rounded-md`} onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page <= 1 || loading}>
            Prev
          </button>
          <span className="border-gray-300 border p-2 px-4 rounded-md">
            Page {page} of {totalPages}
          </span>
          <button className={(page >= totalPages || loading) ? `bg-gray-200 text-gray-500 p-1 px-2 rounded-md` : `bg-gray-300 cursor-pointer p-1 px-2 rounded-md`} onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page >= totalPages || loading}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Dashboard