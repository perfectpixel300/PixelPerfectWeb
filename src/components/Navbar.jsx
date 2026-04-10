import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import gsap from "gsap";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navLinks, subNavs } from "../context";

const API_BASE = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const lineRef = useRef(null);
  const burgerRef = useRef(null);
  const crossRef = useRef(null);
  const mobileNavRef = useRef(null);
  const linkLine = useRef([]);
  const searchWrapperRef = useRef(null);
  const debounceTimer = useRef(null);

  const [isOpen, setisOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();

  // ── GSAP setup ──────────────────────────────────────────────
  useEffect(() => {
    gsap.set(linkLine.current, { width: "0%" });
    gsap.set(mobileNavRef.current, { xPercent: 100 });
  }, []);

  const handleEnter = () => gsap.to(lineRef.current, { width: "92%" });
  const handleLeave = () => gsap.to(lineRef.current, { width: "0%" });
  const hoverEnter = (i) => gsap.to(linkLine.current[i], { width: "100%" });
  const hoverLeave = (i) => gsap.to(linkLine.current[i], { width: "0%" });

  const handleOpen = () => {
    gsap.to(mobileNavRef.current, { xPercent: 0, duration: 0.5, ease: "power3.in" });
    setisOpen(true);
  };
  const handleClose = () => {
    gsap.to(mobileNavRef.current, { xPercent: 100, duration: 0.5, ease: "power3.in" });
    setisOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  // ── Click outside to close dropdown ─────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Debounced search fetch ───────────────────────────────────
  const fetchSuggestions = useCallback(async (q) => {
    if (!q.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(q)}&populate=true`);
      const data = await res.json();
      setSuggestions(data.products || []);
      setShowDropdown(true);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setActiveIndex(-1);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  // ── Keyboard navigation ──────────────────────────────────────
  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        goToProduct(suggestions[activeIndex]);
      } else if (query.trim()) {
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setShowDropdown(false);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  const goToProduct = (product) => {
    navigate(`/product/${product._id}`);
    setQuery(product.name);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  return (
    < >
      <div>
        <div className="largeScreen-navbar w-[100vw] flex items-center py-4 md:py-6 lg:py-[10px] px-6 md:px-14 fixed z-50 bg-[#ffffff] gap-2 justify-between">

          {/* Logo */}
          <div className="flex items-start">
            <Link to="/" className="flex items-center justify-center">
              <img className="h-[40px] lg:h-[70px]" src="/logo.png" alt="Pixel Perfect" />
              <div>
                <p className="text-xl lg:text-2xl font-bold flex">PixelPerfect.</p>
                <p className="font-light text-[8px] lg:text-[9px]">Stationery | Gifts | Studio | IT Support</p>
              </div>
            </Link>
          </div>

          {/* ── Search bar (desktop) ── */}
          <div
            ref={searchWrapperRef}
            className="relative hidden md:flex items-center justify-center w-1/3"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* animated bottom line */}
            <div
              ref={lineRef}
              className="absolute w-[0%] h-[2px] bg-[#129900] bottom-0 left-1/2 -translate-x-[50%] rounded-full"
            />

            {/* input */}
            <label
              htmlFor="search"
              className="outline-[#c0c0c0] hover:text-[#129900] outline-1 px-4 py-2 text-sm flex items-center justify-between rounded-full w-full"
            >
              <input
                type="search"
                name="search"
                id="search"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && suggestions.length && setShowDropdown(true)}
                placeholder="Search for products | services"
                className="outline-none w-full"
                autoComplete="off"
              />
              <IoSearch
                className="label-icon cursor-pointer shrink-0"
                onClick={handleSearchSubmit}
              />
            </label>

            {/* ── Dropdown ── */}
            {showDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[9999]">
                {loading ? (
                  <div className="flex items-center gap-3 px-4 py-3 text-gray-400 text-sm">
                    <div className="w-4 h-4 border-2 border-[#129900] border-t-transparent rounded-full animate-spin" />
                    Searching…
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-gray-400 text-sm">No results for "{query}"</div>
                ) : (
                  <ul>
                    {suggestions.map((product, i) => (
                      <li
                        key={product._id}
                        onMouseEnter={() => setActiveIndex(i)}
                        onMouseLeave={() => setActiveIndex(-1)}
                        onClick={() => goToProduct(product)}
                        className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150 ${activeIndex === i ? "bg-[#f0fff0]" : "hover:bg-gray-50"
                          }`}
                      >
                        {/* product image */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          {product.image ? (
                            <img
                              src={product.image.url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">?</div>
                          )}
                        </div>

                        {/* text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                          {product.category?.name && (
                            <p className="text-xs text-gray-400 truncate">{product.category.name}</p>
                          )}
                        </div>

                        {/* price */}
                        {product.price != null && (
                          <span className="text-sm font-semibold text-[#129900] shrink-0">
                            Rs. {product.price}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>


          {/* Nav links */}
          <div className="hidden lg:flex items-center justify-center gap-x-4">
            {navLinks.map((nav, index) => (
              <div
                className="relative"
                key={index}
                onMouseEnter={() => hoverEnter(index)}
                onMouseLeave={() => hoverLeave(index)}
              >
                <Link to={nav.link}>{nav.id}</Link>
                <div ref={(el) => (linkLine.current[index] = el)} className="h-[3px] bg-[#129900] rounded-full" />
              </div>
            ))}
          </div>

          {/* Burger */}
          <div ref={burgerRef} onClick={handleOpen} className="flex items-center justify-center lg:hidden cursor-pointer">
            <i className="ri-menu-line text-3xl" />
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        <div
          ref={mobileNavRef}
          className="mobile-navbar bg-[#222222] text-[#ffffff] h-screen w-screen fixed z-[99999] px-6 lg:hidden overflow-auto"
        >
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl">Navigation</h1>
            <div className="cursor-pointer" ref={crossRef} onClick={handleClose}>
              <i className="ri-close-large-line text-2xl" />
            </div>
          </div>
          <div className="links flex flex-col gap-6 text-2xl pt-10">
            {navLinks.map((nav, i) => (
              <Link className="flex justify-between px-4" key={i} to={nav.link} onClick={handleClose}>
                {nav.id}
                <i className="ri-arrow-right-wide-line" />
              </Link>
            ))}
          </div>
          <div className="h-[1px] bg-[#9b9b9b] rounded-full w-full my-4" />
          <div className="sub-links flex flex-col gap-5 text-2xl py-2 px-4">
            Visit
            {subNavs.map((subNav, i) => (
              <Link className="px-2 text-xl" key={i} to={subNav.link} onClick={handleClose}>
                - {subNav.id}
              </Link>
            ))}
          </div>
          <div className="h-[1px] bg-[#9b9b9b] rounded-full w-full my-4" />
        </div>
      </div>

      <div
        ref={searchWrapperRef}
        className="relative flex md:hidden items-center justify-center top-20 w-[80%] left-1/2 -translate-x-1/2"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* animated bottom line */}
        <div
          ref={lineRef}
          className="absolute w-[0%] h-[2px] bg-[#129900] bottom-0 left-1/2 -translate-x-[50%] rounded-full"
        />

        {/* input */}
        <label
          htmlFor="search"
          className="outline-[#c0c0c0] hover:text-[#129900] outline-1 px-4 py-2 text-sm flex items-center justify-between rounded-full w-full"
        >
          <input
            type="search"
            name="search"
            id="search"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && suggestions.length && setShowDropdown(true)}
            placeholder="Search for products | services"
            className="outline-none w-full"
            autoComplete="off"
          />
          <IoSearch
            className="label-icon cursor-pointer shrink-0"
            onClick={handleSearchSubmit}
          />
        </label>

        {/* ── Dropdown ── */}
        {showDropdown && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[9999]">
            {loading ? (
              <div className="flex items-center gap-3 px-4 py-3 text-gray-400 text-sm">
                <div className="w-4 h-4 border-2 border-[#129900] border-t-transparent rounded-full animate-spin" />
                Searching…
              </div>
            ) : suggestions.length === 0 ? (
              <div className="px-4 py-3 text-gray-400 text-sm">No results for "{query}"</div>
            ) : (
              <ul>
                {suggestions.map((product, i) => (
                  <li
                    key={product._id}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(-1)}
                    onClick={() => goToProduct(product)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150 ${activeIndex === i ? "bg-[#f0fff0]" : "hover:bg-gray-50"
                      }`}
                  >
                    {/* product image */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image.url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">?</div>
                      )}
                    </div>

                    {/* text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                      {product.category?.name && (
                        <p className="text-xs text-gray-400 truncate">{product.category.name}</p>
                      )}
                    </div>

                    {/* price */}
                    {product.price != null && (
                      <span className="text-sm font-semibold text-[#129900] shrink-0">
                        Rs. {product.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;