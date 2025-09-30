import {useIngredients} from "../hooks/useIngredients.tsx";
import {FiTag, FiBox, FiBookOpen, FiPlus} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

export const Ingredients = () => {
    const {allIngredients, handleDelete} = useIngredients();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
                        <FiBookOpen className="text-blue-400"/> Ingredientes
                    </h2>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 font-bold py-2 px-5 rounded-lg shadow transition-all"
                        onClick={() => navigate("/register-ingredient")}
                    >
                        <FiPlus/> Nuevo Ingrediente
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">

                    {allIngredients.length === 0 ?
                        <p className="text-gray-500 col-span-full text-center">No hay ingredientes registrados.</p>
                        :
                        allIngredients.map(ingredient => (
                            <div
                                key={ingredient.id}
                                className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border border-gray-100"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <FiTag className="text-blue-500"/>
                                    <span
                                        className="font-bold text-lg text-gray-800">Ingrediente: {ingredient.name}</span>

                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FiBox className="text-gray-400"/>
                                    <span className="text-sm">Medida: {ingredient.unit.name}</span>
                                </div>
                                <button
                                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                                    onClick={
                                        () => navigate(`/edit-ingredient/${ingredient.id}`)
                                    }
                                >
                                    Editar
                                </button>
                                <button
                                    className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                                    onClick={() => handleDelete(ingredient.id!)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};