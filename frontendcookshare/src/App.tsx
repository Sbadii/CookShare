import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import backgroundImg from "./assets/background.jpg";
import Dashboard from './pages/Dashboard';
import CreateRecipePage from './pages/CreateRecipePage';




// ===============
// PAGE D'ACCUEIL
// ===============
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, motDePasse: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("utilisateur", JSON.stringify(data));
        setShowLoginModal(false);
        navigate("/dashboard");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="font-sans">
      {/* === Section 1 : Hero Banner === */}
      <section className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <header className="absolute top-0 w-full flex justify-between items-center p-6 z-10">
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:underline">Browse</a>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Help</a>
          </nav>
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:underline">
              <div>
                <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEwLjY2NjY3LDEwLjY2NjY3KSI+PHBhdGggZD0iTTksMmMtMy44NTQxNSwwIC03LDMuMTQ1ODUgLTcsN2MwLDMuODU0MTUgMy4xNDU4NSw3IDcsN2MxLjc0OCwwIDMuMzQ1MDEsLTAuNjUxOTggNC41NzQyMiwtMS43MTg3NWwwLjQyNTc4LDAuNDI1Nzh2MS4yOTI5N2w1LjU4NTk0LDUuNTg1OTRjMC41NTIsMC41NTIgMS40NDgsMC41NTIgMiwwYzAuNTUyLC0wLjU1MiAwLjU1MiwtMS40NDggMCwtMmwtNS41ODU5NCwtNS41ODU5NGgtMS4yOTI5N2wtMC40MjU3OCwtMC40MjU3OGMxLjA2Njc3LC0xLjIyOTIxIDEuNzE4NzUsLTIuODI2MjIgMS43MTg3NSwtNC41NzQyMmMwLC0zLjg1NDE1IC0zLjE0NTg1LC03IC03LC03ek05LDRjMi43NzMyNywwIDUsMi4yMjY3MyA1LDVjMCwyLjc3MzI3IC0yLjIyNjczLDUgLTUsNWMtMi43NzMyNywwIC01LC0yLjIyNjczIC01LC01YzAsLTIuNzczMjcgMi4yMjY3MywtNSA1LC01eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
              </div>
              <span>Search</span>
            </button>
            <button
              className="flex items-center space-x-2 hover:underline"
              onClick={() => setShowLoginModal(true)}
            >
              <div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYUlEQVR4nO2ay29McRTHb6l60xZFkLAUItOwJkKaoo1XQiq2tKvRWLBSYkcTkkr/EUFjJSWqY7yqXu14JISFiJ0aLfnIyZyb/BbTmfv43Tu3k35Xk8z9nfM99/zO+Z3zO9dxZlGlAJYCLcBlYAB4DnwGfgF/gJ/AW+A20AscBBqcJACoBQ4p8b/4h6y5C5wE5lfCgHnAWeCrQUre+kPgir7tFLABWKTPNwCb1fAe4B6QN9aLLJG5IC4j9gCvDQLyOw3UB5BVD5wCnhjy3gP7ovZCv6HwHdBqUX6rxpWLfuveAZqAQVUwAZwD6qwqKeiZC5xRHYIssNqW8PXAJxUsWWi7FcGldW4DxlRnDtgUVuAKIx6GrL0d77qHDWOC6QYWGoJk7y63zrY8h8UGh2ygmAGuG1lkTSRMvXtmzE0AfhfvAv7p2ZCKjKW/mJlQY7xlSjlhgY+66IKTEADdRryU32JApy54ISWIkxBQKIeEk6DbSx4XiwVHnYQB2K/cvpX0CnBcH5QqdY5FAve1DGkKKacGeKocT5R6UAq638CRMAqLyH2sykctGNOpsgbsMfRX4ozaMIZCFS3ZdKoSZ5sQWAW8NLbu2hCyBlVOu12WMXsGuKQyrtpnGaNngMO6/mY0LGPyDLDF7YmiYxmDZ4CVuu57sT8fUFlkfRgiZZQgX72GJGBreW4VdG3xrRUnqiLYCeEJF1JCVTT9VsWBiAVPFClR2pwZXDQ2GkXjslJlfD6CMj5rwwgB0KWy7jjTATgWUWP1yGJj9Uw5dpRrdccT3Oq2KbcvZccQwGl9eCSBlw8jyi3t9fiXSzlBj5MQUJidoJd13oZCwE69oJsEmiNnWZ5PSu8SBC1+F1/ThR/CtKWWzp+ccukLeok9ZMSL74lUWABLgIxyyASeM+rh80oFDcd5mU3BE64R42FTtwhcp9vLTXs7rLEtHRM5w4iNNt+OTGHRoDsf0eitVrOTG9iZ0J6YZhh6QxW4afCAnLYWZNeorBFDfl+ks3dgt1EAuuWMXPk3BozBLqPscLeSvxQbcgukdTjqYlJrql5tfJqNDwbqdPK0Vf+7qKW4VLEY8Zeu1BcQUpu16/clUlb7xZSu7aiIASVy/l7t3m7pdjE/qvkBvJH2VDo7fQHF+4lZODMf/wHUHcAzzrrdQQAAAABJRU5ErkJggg=="
                  alt="login-rounded-right--v1"
                  width="30"
                  height="30"
                />
              </div>
              <span>Login</span>
            </button>
          </div>
        </header>

        <div className="text-center z-10 px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Welcome to the CookShare®
          </h1>
          <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-400 mb-4">
            Recipe Community!
          </h2>
          <p className="text-xl mb-8">32,681 recipes and counting!</p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg flex items-center p-2">
            <input
              type="text"
              placeholder="Insert an ingredient, recipe name etc. in here"
              className="flex-1 px-3 py-2 outline-none text-black"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDEwLjY2NjY3LDEwLjY2NjY3KSI+PHBhdGggZD0iTTksMmMtMy44NTQxNSwwIC03LDMuMTQ1ODUgLTcsN2MwLDMuODU0MTUgMy4xNDU4NSw3IDcsN2MxLjc0OCwwIDMuMzQ1MDEsLTAuNjUxOTggNC41NzQyMiwtMS43MTg3NWwwLjQyNTc4LDAuNDI1Nzh2MS4yOTI5N2w1LjU4NTk0LDUuNTg1OTRjMC41NTIsMC41NTIgMS40NDgsMC41NTIgMiwwYzAuNTUyLC0wLjU1MiAwLjU1MiwtMS40NDggMCwtMmwtNS41ODU5NCwtNS41ODU5NGgtMS4yOTI5N2wtMC40MjU3OCwtMC40MjU3OGMxLjA2Njc3LC0xLjIyOTIxIDEuNzE4NzUsLTIuODI2MjIgMS43MTg3NSwtNC41NzQyMmMwLC0zLjg1NDE1IC0zLjE0NTg1LC03IC03LC03ek05LDRjMi43NzMyNywwIDUsMi4yMjY3MyA1LDVjMCwyLjc3MzI3IC0yLjIyNjczLDUgLTUsNWMtMi43NzMyNywwIC01LC0yLjIyNjczIC01LC01YzAsLTIuNzczMjcgMi4yMjY3MywtNSA1LC01eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center z-10">
          <div className="h-8 w-8 border-2 border-white rounded-full flex items-center justify-center mb-2">
            <div className="h-3 w-1 bg-white"></div>
          </div>
          <p className="text-sm">Scroll down</p>
        </div>
      </section>

      {/* MODALE DE LOGIN */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">
                Vous n’avez pas de compte ?{" "}
                <a
                  href="/register"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Inscrivez-vous.
                </a>
              </p>
            </div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* === Section 2 : Recipe of the Week === */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Recipe
            <br />
            <span className="text-green-600">of the week</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 bg-gray-100 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="h-64 bg-gray-300 rounded-lg"></div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div><img width="20" height="20" src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/></div>
                      <span className="text-sm">2025/11/10</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(4)].map((_, i) => (
                        <img width="25" height="25" src="https://img.icons8.com/skeuomorphism/32/star.png" alt="star"/>
                      ))}
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC2UlEQVR4nO2XS2jTcBzHq4Kg3id6niCKO4iPkx48eVSmInpR8eJh3jwog6JuugebQmfRrY+tq+1MZ03SpmvWdEkfSZM262KWbd3abgcZCDKcD9zAx0/+gmOTbqzpQwR/8IHA//d90CaEGAz/8szltKtzOe3KXwlX1cTufE5bms1ry5OT8p6qF5jJKE35nAaImYxyv6rh8/Pyzukp5V12RgXEdGZsQVGUXVUroCrSzemMAqtRVamhKuEA2LaJ8VR2ajINq9HGU7PorOIFZDl2YUKToRCyHDtf8QLpUSExriahEGmZT1U0nOfDJ1+PJUBVxIKgMzHOnChDEF0jCMxhPsqckQS2QRTYlpQU6U8lo7NKWoCNQDtoF2mQFnn88uLpmnUDBYE5lkxwYSnBZVNSZElORmE0FYO0HC8LyAt5Im+UgbJ4PnR0pUCUpc9JCfYHWqoGKCsyEqxf8ytwXPCaKIx8TYocVBJRYL+x4cCNgn8Fw/jO8rHQF1EYgUogxJlllvFd3PAGpKmXp6JccFGIM1BOYpHgp1CQOL2pp4AJEHVsmJqPR4ehHHBs4C2Fe44YihmCwGoZmsxG2SCUAkOTcyQ5uN+gZ3DctTcUwJVIOAB6QFrkYShlKAJ7yIb8oAc//uKBodTx49hwmCZBDxSB0SWFA8AWP+5ZCA3hoAeK8CwgD90FBp/b9gVID9CUVxdIizkctboLDDgsl4d8g1AKbmfPJd0FMLe9kyIwKATpdX/3uO19CHS93h7y0F/A1RfxvRqA1ZBeN2Cu3qSt27zy3rc+6zo+4LTF0Nmf+5irl9MVbjQat7qd1g9erB9+43Za3th6TNfXu7Es5sf1LkdPfo2m3/YReRVdoK3NWGe3msFhfwrWbtPnJ6b25o6Ojh2bKL6961HrLUu3aRFpe61maGm5d6joAo2NjQc725vft7XetTQ13Sn6ywdpkBZ5GI23DxRd4P8YqjQ/AReaLMq3hNR6AAAAAElFTkSuQmCC"
                        alt="star"
                        width="25"
                        height="25"
                      />
                      <span className="ml-1 text-sm">4.7 (19)</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Rhubarb Muffins</h3>
                    <p className="text-sm text-green-600 mb-4">by ArwensThermoPics</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <div><img width="30" height="30" src="https://img.icons8.com/ios/50/rice-bowl.png" alt="rice-bowl"/></div>
                        <span className="text-sm">Preparation time</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div><img width="30" height="30" src="https://img.icons8.com/ios/50/time--v1.png" alt="time--v1"/></div>
                        <span className="text-sm">Total time</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div><img width="30" height="30" src="https://img.icons8.com/ios/50/meal.png" alt="meal"/></div>
                        <span className="text-sm">Portion --</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div><img width="30" height="30" src="https://img.icons8.com/wired/64/chef-hat.png" alt="chef-hat"/></div>
                        <span className="text-sm">Level easy</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                    View recipe
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3">
              <h3 className="text-xl font-bold mb-4">Previous Recipes of the Week</h3>
              <div className="space-y-4">
                {[
                  { title: "Rhubarb Muffins", date: "2025/11/10", image: "https://placehold.co/80x80" },
                  { title: "Carola's Brussels Sprout Delight", date: "2025/11/03", image: "https://placehold.co/80x80" },
                  { title: "Minted Lamb Burgers / Patties", date: "2025/10/27", image: "https://placehold.co/80x80" },
                  { title: "Smokey rub", date: "2025/10/20", image: "https://placehold.co/80x80" },
                ].map((recipe, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded">
                    <div className="h-12 w-12 bg-gray-300 rounded"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{recipe.title}</p>
                      <p className="text-xs text-gray-500">{recipe.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="#" className="text-green-600 hover:underline">All Recipes</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Section 3 : Cook on TM7/TM6 === */}
      <section className="py-12 px-4 md:px-8 bg-gray-100 rounded-t-3xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Cook these recipes step-by-step</h2>
            <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-4">on the screen of your CookShare® TM7 and TM6</h3>
            <p className="mb-6">Import your favourite recipes with just one click.</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Learn more</button>
          </div>
        </div>
      </section>

      {/* === Section 4 : Latest recipes === */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-purple-600">Latest</span>
            <br />
            recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Coconut Lemon Truffels", author: "stefludik", rating: 5 },
              { title: "Oma's Heavenly Mud - Thermie and Friends Janine Smith", author: "Janine Smith", rating: 5 },
              { title: "Gingerbread Houses", author: "Oinmoor61", rating: 5 },
              { title: "Mint and apple sauce", author: "alli2510", rating: 5 }
            ].map((recipe, index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-100"></div>
                <div className="p-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <img width="25" height="25" src="https://img.icons8.com/skeuomorphism/32/star.png" alt="star"/>
                    ))}
                  </div>
                  <h3 className="font-semibold mb-1">{recipe.title}</h3>
                  <p className="text-sm text-green-600">by {recipe.author}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-6 h-1 bg-gray-300 rounded"></div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="text-center mt-8">
            <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-50 font-medium">All Recipes</button>
          </div>
        </div>
      </section>

      {/* === Section 5 : Most popular recipes === */}
      <section className="py-12 px-4 md:px-8 bg-gray-100 rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-pink-600">Most popular<br/>recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Vegetarian Sweet Potato Sausage Rolls", author: "Seryn", rating: 5, image: "https://placehold.co/300x200" },
              { title: "Vegetarian or Vegan Mexican Lasagna", author: "Seryn", rating: 5, image: "https://placehold.co/300x200" },
              { title: "Pot of Gold", author: "carliemareeTM7", rating: 5, image: "https://placehold.co/300x200" },
              { title: "Creamy Mushroom Pasta", author: "ChefAlex", rating: 5, image: "https://placehold.co/300x200" }
            ].map((recipe, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <img width="25" height="25" src="https://img.icons8.com/skeuomorphism/32/star.png" alt="star"/>
                    ))}
                    <span className="ml-1 text-sm">5.0 (1)</span>
                  </div>
                  <h3 className="font-semibold mb-1">{recipe.title}</h3>
                  <p className="text-sm text-green-600">by {recipe.author}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button className="text-gray-500 hover:text-gray-700">.</button>
            <div className="w-6 h-1 bg-gray-300 rounded"></div>
            <button className="text-gray-500 hover:text-gray-700">.</button>
          </div>
        </div>
      </section>

      {/* === Section 6 : Newest Members === */}
      <section className="py-12 px-4 md:px-8 bg-gray-100 rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Newest<br/>
            <span className="text-blue-600">Members</span>
          </h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-6">
            {[
              { name: "Lauren Indrisie", since: "5 months ago", avatar: "https://placehold.co/40x40" },
              { name: "Megan Rogan", since: "5 months ago", avatar: "https://placehold.co/40x40" },
              { name: "Chantelle Grace", since: "5 months ago", avatar: "https://placehold.co/40x40" }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">Member since {member.since}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="text-gray-500 hover:text-gray-700">
                    <div className="h-5 w-5 ">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChklEQVR4nO2XTUhUURTHf6ZUKET0IdnCTVKGi4iQksqFSCuLJIkKCaJNEKJE5CpqKRKEQkQu2gTirqJNhJs+rISCtgYFhhUWURRmSfniwhk4zcxz7oxv3hf3B5eZeXPfefd/3z3/ey44HA6HIyK8lDRSJySpeKkV0kDyaMgn5Auwn+SwG5j1S/ZfwDHiTyfw0y/Zr8vnX6CP+HJOxqjHnJPsvarTELCC+FAJDMvYFoHLhVzriHptt4FqoqcauKuW/wlb+90DfJLrk0At0bEeeKIMqbXYfWQLMCX/vQG2EY29vpYxvAUaS90QzWw8jsieW4DPFqvCemdfBYyFbM9dwLxlnhZVolSIS2Q7RjnoLdI5S6q1zEP+SP8RoIpg7fWamqz+cheNh4E5uedOQPZcA9yTmGZJHQ2r+tV1zvNl2nMd8FJizUrsUMv4nWqZlWrPTcC0xDCxTEzCFNKk9pjFJTarpWgDvmbFmJLYoQg5BHyTe14B24FR+f0b6LaIcVL6Zux1qyxRD/hR7hwxrjKoZu+WSnRjkVfU7F70sU1z7ZKKcVX1Ww3cVDEG5ZmBCtkAjEu/BaDHp99ZlTcPgQ5go7SDwCOVD34xzqi3NS7PDkTILpWQH4F9BQIfAD5kHXp0ew+0W5QnM9J/WsawLCGnVKkwAWzGjrXABVn3c9KeAeeBNZYxNqk3OC9jKVqI2bEH1H83gJWET5XFOHyFmFl/qmbiNNFzXFUTL4D6QkL2qvX9DmgmPuyQjdeTQ5/Zh/IK6RFHMt8fyFkkbqwD7me5Z46QjH8PWPp3VFRIZZwp9XOEfJcDTVLoUCXOf0LynYfjTmMQ1W9c8FIrxEt4IzVCHA6Hw0HY/AN8XwJoJc/SDAAAAABJRU5ErkJggg==" alt="secured-letter--v1"></img>
                    </div>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <div className="h-5 w-5 ">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABlklEQVR4nO2Vzy4DURTGf9NFIwQ7O6nnsFIL6UbCxp8lEi0SL8BWWPmbCp7Bgu4aPADpO5SFathgg5BUbnImOWFmOqZzh0i/ZJJ2vnPO77tz77TQVlt/VClgGigBNeADuAfOgRmgw6PH3JsFLoAH6TG9p8CkzAylAaACNAKuOjCmesblXlDPFZAJA69LQxWYB/qBtHhLwI0augasq+/XwKLUpqW3IPeNfxcUIqVWXga6ferMo14F3hXYfF7x2RqjHuBMai/9tmNKrdwPrjUMPAGPQDZEfa96ehNeBSUx84TXkFxhtSCMEy+zJqbZN1vKCOPWy3wTs9NigC5hvHqZVTEHLQbIqnP2TdtiHlsMUBbGnpfZBzxLwZwFeF5mvwSds4IqysUIz8m+m9nLzYo3Yw6Rk1lm5lbYpg1pMG/GaAvwkSjwuEJouDngzk8HOMBOxBAafhAF3kqI2OBRQmj4YRxwV2bQbpMQ1uBhQmj4kQ14UIjE4K4MoKh+rFx4MQm4K0f+UBpJrvyrDHBfrsThrpzfhPMv9AmOeJf9ULW3GwAAAABJRU5ErkJggg==" alt="like--v1"></img>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-50">Newest members</button>
          </div>
        </div>
      </section>

      {/* === Section 7 : Footer "Stay up to date" === */}
      <footer className="bg-gray-700 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Stay up to date</h2>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Subscribe to our newsletter
            </button>
          </div>
          <hr className="border-gray-600 my-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Recipe</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Search for recipes</a></li>
                <li><a href="#" className="hover:underline">Categories</a></li>
                <li><a href="#" className="hover:underline">Latest recipes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">My Recipes (For Registered Users Only)</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Login</a></li>
                <li><a href="#" className="hover:underline">Register</a></li>
                <li><a href="#" className="hover:underline">Forgot password!</a></li>
                <li><a href="#" className="hover:underline">Recent posts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Search</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Recipe search</a></li>
                <li><a href="#" className="hover:underline">User search</a></li>
                <li><a href="#" className="hover:underline">RSS</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">CookShare®</h3>
              <div className="flex space-x-4">
                <img width="30" height="30" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook"/>
                <img width="30" height="30" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram"/>
                <img width="30" height="30" src="https://img.icons8.com/color/48/youtube-play.png" alt="youtube"/>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kobold</h3>
              <div className="flex space-x-4">
                <img width="30" height="30" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook"/>
                <img width="30" height="30" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram"/>
                <img width="30" height="30" src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest"/>
                <img width="30" height="30" src="https://img.icons8.com/color/48/youtube-play.png" alt="youtube"/>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">CookShare® In The World</h3>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm">
            <p>&copy;2025 Vorwerk • <a href="#" className="hover:underline">Contact</a> • <a href="#" className="hover:underline">Terms of use</a> • <a href="#" className="hover:underline">Privacy policy</a> • <a href="#" className="hover:underline">Help</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};



// ===============
// INSCRIPTION
// ===============
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    nomUtilisateur: "",
    email: "",
    motDePasse: "",
    confirmationMotDePasse: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.motDePasse !== formData.confirmationMotDePasse) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (formData.motDePasse.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          nomUtilisateur: formData.nomUtilisateur,
          email: formData.email,
          motDePasse: formData.motDePasse,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("utilisateur", JSON.stringify(data));
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError(data.message || "Erreur lors de l’inscription");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
            Compte créé ! Redirection...
          </div>
        )}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Prénom *</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nom *</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nom d’utilisateur *</label>
            <input
              type="text"
              name="nomUtilisateur"
              value={formData.nomUtilisateur}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-600"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe *</label>
            <input
              type="password"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-600"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirmer le mot de passe *</label>
            <input
              type="password"
              name="confirmationMotDePasse"
              value={formData.confirmationMotDePasse}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Créer mon compte
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Déjà inscrit ?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 font-medium hover:underline"
            >
              Connectez-vous
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// ===============
// APP PRINCIPAL
// ===============
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/create-recipe" element={<CreateRecipePage />} />
      <Route path="/dashboard/create-recipe" element={<CreateRecipePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;