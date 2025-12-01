// src/app/page.tsx
import HeroBanner from "./components/HeroBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="font-sans">
      <Header />

      <HeroBanner />

      {/* === Section 2 : Recipe of the Week === */}
      <section className="py-12 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Recipe<br />
            <span className="text-green-600">of the week</span>
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* ---- LEFT ---- */}
            <div className="lg:w-2/3 bg-gray-100 rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="h-64 bg-gray-300 rounded-lg"></div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <img width="20" height="20" src="https://img.icons8.com/ios/50/time--v1.png" />
                      <span className="text-sm">2025/11/10</span>
                    </div>

                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(4)].map((_, i) => (
                        <img key={i} width="25" height="25" src="https://img.icons8.com/skeuomorphism/32/star.png" />
                      ))}
                      <span className="ml-1 text-sm">4.7 (19)</span>
                    </div>

                    <h3 className="text-xl font-bold mb-1">Rhubarb Muffins</h3>
                    <p className="text-sm text-green-600 mb-4">by ArwensThermoPics</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/rice-bowl.png" />
                        <span className="text-sm">Preparation time</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/time--v1.png" />
                        <span className="text-sm">Total time</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/meal.png" />
                        <span className="text-sm">Portion --</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <img width="30" height="30" src="https://img.icons8.com/wired/64/chef-hat.png" />
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

            {/* ---- RIGHT ---- */}
            <div className="lg:w-1/3">
              <h3 className="text-xl font-bold mb-4">Previous Recipes of the Week</h3>
              <div className="space-y-4">
                {[
                  { title: "Rhubarb Muffins", date: "2025/11/10" },
                  { title: "Carola's Brussels Sprout Delight", date: "2025/11/03" },
                  { title: "Minted Lamb Burgers / Patties", date: "2025/10/27" },
                  { title: "Smokey rub", date: "2025/10/20" },
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

      <Footer />
    </div>
  );
}
