import { useRecipes } from "../hooks/useRecipes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export const RecipeList = () => {
    const { recipes, handleDelete, allIngredients, categories,units } = useRecipes();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);

    const searchIngredients = search
        .split(",")
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);

    const filteredRecipes = recipes.filter(recipe =>
        (selectedCategory === 0 || recipe.categoryId === selectedCategory) &&
        (searchIngredients.length === 0
            ? true
            : searchIngredients.every(ingName =>
                recipe.ingredients.some(ri => {
                    const ingredient = allIngredients.find(i => i.id === ri.ingredientId);
                    return ingredient?.name.toLowerCase().includes(ingName);
                })
            ))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
                        <FiBookOpen className="text-blue-400" /> Recetas
                    </h2>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 font-bold py-2 px-5 rounded-lg shadow transition-all"
                        onClick={() => navigate("/create-recipe")}
                    >
                        <FiPlus /> Nueva Receta
                    </button>
                </div>
                <div className="mb-6 flex gap-4 items-center">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                        placeholder="Buscar por ingredientes (ej: tomate, pollo)"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(Number(e.target.value))}
                    >
                        <option value={0}>Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredRecipes.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center py-16">
                            <FiBookOpen className="text-6xl text-blue-200 mb-4" />
                            <p className="text-gray-500 text-lg">No hay recetas con esos filtros.</p>
                        </div>
                    ) : (
                        filteredRecipes.map(recipe => (
                            <div
                                key={recipe.id}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FiBookOpen className="text-blue-500 text-xl" />
                                    <span className="font-bold text-xl text-gray-800">{recipe.name}</span>
                                </div>
                                <div className="text-gray-600 text-sm mb-2">{recipe.description}</div>
                                <div className="text-gray-700 text-sm">
                                    <span className="font-semibold">Ingredientes:</span>
                                    <ul className="list-disc ml-6">
                                        {recipe.ingredients.map((ing, idx) => (
                                            <li key={idx}>
                                                {ing.ingredient?.name} - {ing.quantity} {
                                                    units.find(
                                                        u => u.id === ing.unitId
                                                    )?.abbreviation || "unidad(s)"
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition"
                                        onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                                    >
                                        <FiEdit2 /> Editar
                                    </button>
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
                                        onClick={() => handleDelete(recipe.id!)}
                                    >
                                        <FiTrash2 /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};