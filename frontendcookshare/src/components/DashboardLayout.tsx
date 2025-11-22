// src/components/DashboardLayout.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("utilisateur");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Menu latéral FIXE */}
      <aside
        className="w-64 bg-white shadow-md p-6 fixed left-0 top-0 h-full overflow-y-auto"
        style={{ zIndex: 10 }}
      >
        <div className="flex items-center mb-8">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEwLjY2NjY3LDEwLjY2NjY3KSI+PHBhdGggZD0iTTksMmMtMy44NTQxNSwwIC03LDMuMTQ1ODUgLTcsN2MwLDMuODU0MTUgMy4xNDU4NSw3IDcsN2MxLjc0OCwwIDMuMzQ1MDEsLTAuNjUxOTggNC41NzQyMiwtMS43MTg3NWwwLjQyNTc4LDAuNDI1Nzh2MS4yOTI5N2w1LjU4NTk0LDUuNTg1OTRjMC41NTIsMC41NTIgMS40NDgsMC41NTIgMiwwYzAuNTUyLC0wLjU1MiAwLjU1MiwtMS40NDggMCwtMmwtNS41ODU5NCwtNS41ODU5NGgtMS4yOTI5N2wtMC40MjU3OCwtMC40MjU3OGMxLjA2Njc3LC0xLjIyOTIxIDEuNzE4NzUsLTIuODI2MjIgMS43MTg3NSwtNC41NzQyMmMwLC0zLjg1NDE1IC0zLjE0NTg1LC03IC03LC03ek05LDRjMi43NzMyNywwIDUsMi4yMjY3MyA1LDVjMCwyLjc3MzI3IC0yLjIyNjczLDUgLTUsNWMtMi43NzMyNywwIC01LC0yLjIyNjczIC01LC01YzAsLTIuNzczMjcgMi4yMjY3MywtNSA1LC01eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <h1 className="text-xl font-bold text-yellow-500">CookShare</h1>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-4 py-2 rounded bg-yellow-100 text-yellow-800 font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/dashboard/my-recipes")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            My Recipes
          </button>
          <button
            onClick={() => navigate("/dashboard/community")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Community
          </button>
          <button
            onClick={() => navigate("/dashboard/ai-generator")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            AI Recipe Generator
          </button>
          <button
            onClick={() => navigate("/dashboard/meal-planner")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Meal Planner
          </button>
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Analytics</h2>
          <button
            onClick={() => navigate("/dashboard/saved-recipes")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Saved Recipes
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Others</h2>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-red-600"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Contenu principal — décalé pour ne pas être caché par le menu fixe */}
      <main className="flex-1 p-6 ml-64">{children}</main>
    </div>
  );
};

export default DashboardLayout;