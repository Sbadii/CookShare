// src/pages/CreateRecipePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

const CreateRecipePage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    instructions: "",
    tempsPreparation: "",
    tempsCuisson: "",
    portions: "",
    calories: "",
    niveauDifficulte: "Facile",
    typePlat: "Plat principal",
    regimeAlimentaire: "",
    imageUrl: "",
  });

  const [ingredients, setIngredients] = useState<
    { nom: string; quantite: string; unite: string }[]
  >([{ nom: "", quantite: "", unite: "" }]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { nom: "", quantite: "", unite: "" }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données de la recette :", { ...formData, ingredients });
    alert("Recette soumise ! (À connecter à l’API)");
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-green-600 mb-6">Créer une nouvelle recette</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium mb-1">Titre *</label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
              rows={2}
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium mb-1">Instructions *</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
              rows={6}
              required
            />
          </div>

          {/* Ingrédients */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Ingrédients *</label>
              <button
                type="button"
                onClick={addIngredient}
                className="text-sm text-green-600 hover:underline"
              >
                + Ajouter un ingrédient
              </button>
            </div>
            <div className="space-y-3">
              {ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nom (ex: Tomate)"
                    className="flex-1 px-2 py-1 border rounded text-sm"
                    value={ing.nom}
                    onChange={(e) => handleIngredientChange(index, "nom", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Qté"
                    className="w-20 px-2 py-1 border rounded text-sm"
                    value={ing.quantite}
                    onChange={(e) => handleIngredientChange(index, "quantite", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Unité"
                    className="w-24 px-2 py-1 border rounded text-sm"
                    value={ing.unite}
                    onChange={(e) => handleIngredientChange(index, "unite", e.target.value)}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Détails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Temps de préparation (min)</label>
              <input
                type="number"
                name="tempsPreparation"
                value={formData.tempsPreparation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Temps de cuisson (min)</label>
              <input
                type="number"
                name="tempsCuisson"
                value={formData.tempsCuisson}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Portions</label>
              <input
                type="number"
                name="portions"
                value={formData.portions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Calories (par portion)</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Niveau de difficulté</label>
              <select
                name="niveauDifficulte"
                value={formData.niveauDifficulte}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type de plat</label>
              <select
                name="typePlat"
                value={formData.typePlat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Entrée">Entrée</option>
                <option value="Plat principal">Plat principal</option>
                <option value="Dessert">Dessert</option>
                <option value="Boisson">Boisson</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Régime alimentaire</label>
              <input
                type="text"
                name="regimeAlimentaire"
                value={formData.regimeAlimentaire}
                onChange={handleInputChange}
                placeholder="ex: Végétarien, Sans gluten"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">URL de l’image (optionnel)</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="https://exemple.com/image.jpg"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Publier la recette
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateRecipePage;