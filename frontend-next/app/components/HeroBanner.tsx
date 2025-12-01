// src/components/HeroBanner.tsx
export default function HeroBanner() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/background.jpg)" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

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
            placeholder="Insert an ingredient, recipe name etc."
            className="flex-1 px-3 py-2 outline-none text-black"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Search
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
  );
}
