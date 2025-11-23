// src/pages/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("utilisateur");
    navigate("/");
  };

  // Données simulées
  const recommendedRecipes = [
    {
      id: 1,
      title: "Crispy Homemade Sugar Waffle Cookies",
      rating: 4.8,
      reviews: 33,
      time: "45 mins",
      calories: "980 kcal",
      image: "https://placehold.co/200x150/FFD700/000?text=Cookies",
    },
    {
      id: 2,
      title: "Chia Seed Pudding with Berries and Coconut Cream",
      rating: 4.6,
      reviews: 29,
      time: "20 mins",
      calories: "430 kcal",
      image: "https://placehold.co/200x150/FFD700/000?text=Pudding",
    },
  ];



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
          <button className="w-full text-left px-4 py-2 rounded bg-yellow-100 text-yellow-800 font-medium">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            My Recipes
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Community
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            AI Recipe Generator
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Meal Planner
          </button>
        </nav>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Analytics</h2>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
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
      <main className="flex-1 p-6 ml-64">
        {/* En-tête */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => navigate("/dashboard/create-recipe")}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              + Create Recipe
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <span className="font-medium">Welcome, User</span>
          </div>
        </header>

        {/* Sections identiques à avant */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recommended Recipes</h2>
            <button className="text-sm text-green-600 hover:underline">See more</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recommendedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        width="16"
                        height="16"
                        src="https://img.icons8.com/skeuomorphism/32/star.png"
                        alt="star"
                        className={`${
                          i < Math.floor(recipe.rating) ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      {recipe.rating} ({recipe.reviews} ratings)
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{recipe.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <div className="mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {recipe.time}
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8v6h-8v-6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h8v6h-8v-6z" />
                      </svg>
                      {recipe.calories}
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-1 rounded hover:bg-green-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Find Recipes in Seconds</h2>
            <button className="text-sm text-green-600 hover:underline">More details</button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Dish Type</label>
              <div className="flex flex-wrap gap-2">
                {["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Brunch"].map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-green-100 text-gray-800 hover:text-green-800"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time</label>
              <div className="flex flex-wrap gap-2">
                {["15 Mins", "30 Mins", "45 Mins", "60 Mins"].map((time) => (
                  <button
                    key={time}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-green-100 text-gray-800 hover:text-green-800"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Diet</label>
              <div className="flex flex-wrap gap-2">
                {["Vegan", "Keto", "Gluten Free", "High Protein"].map((diet) => (
                  <button
                    key={diet}
                    className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-green-100 text-gray-800 hover:text-green-800"
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
              Generate Recipe
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;