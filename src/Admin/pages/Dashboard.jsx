import { useState, useEffect } from "react"
import axios from "axios"
import AdminNav from "./AdminNav"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        // Adjust endpoint as needed. Example: /api/products?page=1&limit=10
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
          params: { page, limit },
          cancelToken: source.token,
        })

        // Support common response shapes:
        // { products: [...], page, totalPages } OR { data: [...], page, pages }
        const d = res.data
        const items = d.products || d.data || d.results || d.items || []
        setProducts(Array.isArray(items) ? items : [])

        const pages =
          d.totalPages || d.pages || (d.total ? Math.ceil(d.total / limit) : null)
        if (pages) setTotalPages(pages)
        else if (!Array.isArray(items)) setTotalPages(1)
        else if (Array.isArray(items)) {
          // fallback when API doesn't return total: keep current or 1
          setTotalPages((p) => Math.max(1, p))
        }
      } catch (err) {
        if (!axios.isCancel(err)) setError(err.message || "Failed to fetch")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
    return () => source.cancel()
  }, [page, limit])

  return (
    <>
      <AdminNav />
      <div className="md:px-15 px-5">
        <h1 className="mb-4">All Products</h1>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-1">
          {products.map((p) => (
            <Link to={`/admin/edit/${p._id}`}>
              <div key={p._id} className="bg-gray-200 p-4 rounded-lg">
                <div>
                  <img
                    src={p.image.url}
                    alt={p.name}
                    className="h-36 object-cover w-full rounded-md"
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
          <button className="bg-gray-300 cursor-pointer p-1 px-2 rounded-md" onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page <= 1 || loading}>
            Prev
          </button>
          <span className="border-gray-300 border p-2 px-4 rounded-md">
            Page {page} of {totalPages}
          </span>
          <button className="bg-gray-300 cursor-pointer p-1 px-2 rounded-md" onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page >= totalPages || loading}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Dashboard