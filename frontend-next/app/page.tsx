// app/page.tsx
import HeroBanner from "./components/HeroBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />

        {/* === Section 2 : Recipe of the Week === */}
        <section className="py-12 px-4 md:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Recipe<br />
              <span className="text-green-600">of the week</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* ---- LEFT ---- */}
              <div className="lg:w-2/3 bg-gray-100 rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/2">
                    <div className="h-56 bg-gray-300 rounded-lg"></div>
                  </div>

                  <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          width="20"
                          height="20"
                          src="https://img.icons8.com/ios/50/time--v1.png"
                          alt="Date"
                        />
                        <span className="text-sm text-gray-600">2025/11/10</span>
                      </div>

                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(4)].map((_, i) => (
                          <img
                            key={i}
                            width="20"
                            height="20"
                            src="https://img.icons8.com/skeuomorphism/32/star.png"
                            alt="Star"
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-700">4.7 (19)</span>
                      </div>

                      <h3 className="text-xl font-bold mb-1">Rhubarb Muffins</h3>
                      <p className="text-sm text-green-600 mb-4">by ArwensThermoPics</p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          { icon: "rice-bowl", label: "Prep time" },
                          { icon: "time--v1", label: "Total time" },
                          { icon: "meal", label: "Portion --" },
                          { icon: "chef-hat", label: "Level easy" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <img
                              width="24"
                              height="24"
                              src={`https://img.icons8.com/ios/50/${item.icon}.png`}
                              alt={item.label}
                              className="opacity-80"
                            />
                            <span className="text-sm text-gray-700">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full md:w-auto bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                      View recipe
                    </button>
                  </div>
                </div>
              </div>

              {/* ---- RIGHT ---- */}
              <div className="lg:w-1/3">
                <h3 className="text-xl font-bold mb-4">Previous Recipes of the Week</h3>
                <div className="space-y-3">
                  {[
                    { title: "Rhubarb Muffins", date: "2025/11/10" },
                    { title: "Carola's Brussels Sprout Delight", date: "2025/11/03" },
                    { title: "Minted Lamb Burgers / Patties", date: "2025/10/27" },
                    { title: "Smokey rub", date: "2025/10/20" },
                  ].map((recipe, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="h-12 w-12 bg-gray-300 rounded flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{recipe.title}</p>
                        <p className="text-xs text-gray-500">{recipe.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <a
                    href="#"
                    className="inline-block text-green-600 hover:underline font-medium text-sm"
                  >
                    View all recipes →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}