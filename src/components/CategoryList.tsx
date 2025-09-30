import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { FiTag, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export const CategoryList = () => {
    const { categories, handleDelete } = useCategories();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
                        <FiTag className="text-blue-400" /> Categorías
                    </h2>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 font-bold py-2 px-5 rounded-lg shadow transition-all"
                        onClick={() => navigate("/create-category")}
                    >
                        <FiPlus /> Nueva Categoría
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categories.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center py-16">
                            <FiTag className="text-6xl text-blue-200 mb-4" />
                            <p className="text-gray-500 text-lg">No hay categorías registradas.</p>
                        </div>
                    ) : (
                        categories.map(cat => (
                            <div
                                key={cat.id}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FiTag className="text-blue-500 text-xl" />
                                    <span className="font-bold text-xl text-gray-800">{cat.name}</span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition"
                                        onClick={() => navigate(`/edit-category/${cat.id}`)}
                                    >
                                        <FiEdit2 /> Editar
                                    </button>
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
                                        onClick={() => handleDelete(cat.id!)}
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