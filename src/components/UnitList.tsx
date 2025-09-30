import { useUnits } from "../hooks/useUnits";
import { useNavigate } from "react-router-dom";
import { FiBox, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export const UnitList = () => {
    const { units, handleDelete } = useUnits();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
                        <FiBox className="text-blue-400" /> Unidades
                    </h2>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 font-bold py-2 px-5 rounded-lg shadow transition-all"
                        onClick={() => navigate("/create-unit")}
                    >
                        <FiPlus /> Nueva Unidad
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {units.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center py-16">
                            <FiBox className="text-6xl text-blue-200 mb-4" />
                            <p className="text-gray-500 text-lg">No hay unidades registradas.</p>
                        </div>
                    ) : (
                        units.map(unit => (
                            <div
                                key={unit.id}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FiBox className="text-blue-500 text-xl" />
                                    <span className="font-bold text-xl text-gray-800">{unit.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span className="text-base">Abreviatura: <span className="font-semibold">{unit.abbreviation}</span></span>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition"
                                        onClick={() => navigate(`/edit-unit/${unit.id}`)}
                                    >
                                        <FiEdit2 /> Editar
                                    </button>
                                    <button
                                        className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
                                        onClick={() => handleDelete(unit.id!)}
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
