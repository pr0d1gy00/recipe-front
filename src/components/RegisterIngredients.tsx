import { useIngredients } from '../hooks/useIngredients.tsx';
import { FiEdit2, FiTag, FiPlusCircle, FiBox } from 'react-icons/fi';
import type { JSX } from "react";

export const RegisterIngredients = () => {
    const { inputsForm, handleInputChange, dataOfIngredients, handleSubmit, isEditing, units } = useIngredients();
    const iconMap: Record<string, JSX.Element> = {
        name: <FiTag className="text-gray-400 mr-2" />,
        unit: <FiBox className="text-gray-400 mr-2" />,
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-white py-10">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
                <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">
                    <FiPlusCircle className="inline mr-2" />
                    Registrar Ingredientes
                </h1>
                <form className="flex flex-col gap-6" action='POST' onSubmit={handleSubmit}>
                    {inputsForm.map((input) => (
                        input.name === "unit" ? (
                            <div key={input.name} className="w-full">
                                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor={input.name}>
                                    {input.label}
                                </label>
                                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-300">
                                    {iconMap[input.name]}
                                    <select
                                        id={input.name}
                                        name={input.name}
                                        className="bg-transparent outline-none w-full text-gray-800"
                                        value={dataOfIngredients.unit || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled>Selecciona una unidad</option>
                                        {units && units.map((unit:{
                                            id: number,
                                            name: string,
                                            abbreviation: string | null
                                        }) => (
                                            <option key={unit.id} value={unit.id}>
                                                {unit.name} {unit.abbreviation && `(${unit.abbreviation})`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div key={input.name} className="w-full">
                                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor={input.name}>
                                    {input.label}
                                </label>
                                <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-300">
                                    {iconMap[input.name] || <FiEdit2 className="text-gray-300 mr-2" />}
                                    <input
                                        className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-400"
                                        id={input.name}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        value={dataOfIngredients[input.name as keyof typeof dataOfIngredients] || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )
                    ))}
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
                    >
                        <FiPlusCircle className="text-xl" />
                        {isEditing ? 'Actualizar Ingrediente' : 'Agregar Ingrediente'}
                    </button>
                </form>
            </div>
        </div>
    );
};