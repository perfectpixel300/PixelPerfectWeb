import React from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="p-10 flex w-screen items-center justify-between">
      <h1 className="text-3xl font-bold mb-5">Welcome Admin</h1>
      <button onClick={handleLogout} className="px-5 py-2 bg-[#430081] text-white rounded-lg cursor-pointer">
        Logout
      </button>
    </div>
  );
}
