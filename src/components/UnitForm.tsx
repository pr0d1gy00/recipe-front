import { useUnits } from "../hooks/useUnits";
import { FiBox, FiSave, FiEdit2 } from "react-icons/fi";

export const UnitForm = () => {
    const { data, handleInputChange, handleSubmit, isEditing } = useUnits();

    return (
        <div className="min-h-screen     flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 border border-gray-100"
            >
                <div className="flex items-center gap-2 mb-2">
                    <FiBox className="text-blue-500 text-2xl" />
                    <h2 className="text-2xl font-bold text-blue-700">
                        {isEditing ? "Editar Unidad" : "Registrar Unidad"}
                    </h2>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-semibold flex items-center gap-1">
                        <FiBox className="text-blue-400" />
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        placeholder="Ej: Gramos"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        autoComplete="off"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-700 font-semibold flex items-center gap-1">
                        <FiBox className="text-blue-400" />
                        Abreviatura
                    </label>
                    <input
                        type="text"
                        name="abbreviation"
                        value={data.abbreviation}
                        onChange={handleInputChange}
                        placeholder="Ej: gr"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        autoComplete="off"
                    />
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
