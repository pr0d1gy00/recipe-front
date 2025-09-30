import { useRecipes } from "../hooks/useRecipes";
import { FiBookOpen, FiSave, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

export const RecipeForm = () => {
    const {
        data,
        handleInputChange,
        handleIngredientChange,
        addIngredient,
        removeIngredient,
        handleSubmit,
        isEditing,
        allIngredients,
        units,
        categories
    } = useRecipes();
    console.log(data)

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl flex flex-col gap-6 border border-gray-100"
            >
                <div className="flex items-center gap-2 mb-2">
                    <FiBookOpen className="text-blue-500 text-2xl" />
                    <h2 className="text-2xl font-bold text-blue-700">
                        {isEditing ? "Editar Receta" : "Registrar Receta"}
                    </h2>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-semibold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        placeholder="Ej: Ensalada César"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        autoComplete="off"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-semibold">Descripción</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                        placeholder="Describe la receta..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        rows={3}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-semibold">Categoría</label>
                    <select
                        name="categoryId"
                        value={data.categoryId}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        required
                    >
                        <option value={0} disabled>Selecciona una categoría</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-semibold flex items-center gap-1">
                        Ingredientes
                        <button
                            type="button"
                            className="ml-2 bg-green-400 hover:bg-green-500 text-white rounded-full p-1"
                            onClick={addIngredient}
                            title="Agregar ingrediente"
                        >
                            <FiPlus />
                        </button>
                    </label>

                    {data.ingredients.length === 0 && (
                        <span className="text-gray-400 text-sm">Agrega al menos un ingrediente</span>
                    )}
                    {data.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex gap-2 items-center mb-2">
                            <select
                                className="border border-gray-300 rounded-lg px-2 py-1"
                                value={ing.ingredientId}
                                onChange={e =>
                                    handleIngredientChange(idx, "ingredientId", Number(e.target.value))
                                }
                                required
                            >
                                <option value={0} disabled>
                                    Ingrediente
                                </option>
                                {allIngredients.map(ingr => (
                                    <option key={ingr.id} value={ingr.id}>
                                        {ingr.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                min={1}
                                className="border border-gray-300 rounded-lg px-2 py-1 w-20"
                                value={ing.quantity}
                                onChange={e =>
                                    handleIngredientChange(idx, "quantity", Number(e.target.value))
                                }
                                placeholder="Cantidad"
                                required
                            />
                            <select
                                className="border border-gray-300 rounded-lg px-2 py-1"
                                value={ing.unitId}
                                onChange={e =>
                                    handleIngredientChange(idx, "unitId", Number(e.target.value))
                                }
                                required
                            >
                                <option value={0} disabled>
                                    Unidad
                                </option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.name} {unit.abbreviation && `(${unit.abbreviation})`}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1"
                                onClick={() => removeIngredient(idx)}
                                title="Quitar"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className={`flex items-center justify-center gap-2 font-bold py-2 px-4 rounded-lg shadow transition-colors
            ${isEditing
                        ? "bg-blue-400 hover:bg-blue-500 text-white"
                        : "bg-green-400 hover:bg-green-500 text-white"
                    }`}
                >
                    {isEditing ? <FiEdit2 /> : <FiSave />}
                    {isEditing ? "Actualizar" : "Registrar"}
                </button>
            </form>
        </div>
    );
};
