import { usePurchases } from "../hooks/usePurchases";
import { useEffect } from "react";
import { FiShoppingCart, FiPlus, FiCalendar, FiBox } from "react-icons/fi";

export const PurchaseList = () => {
    const {
        purchases,
        handleSubmit,
        allIngredients,
        ingredientId,
        setIngredientId,
        quantity,
        setQuantity,
        date,
        setDate,
        fetchPurchases,
    } = usePurchases();

    useEffect(() => {
        fetchPurchases();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <FiShoppingCart className="text-green-500 text-3xl" />
                    <h2 className="text-2xl font-bold text-green-700">Gestión de Compras de Ingredientes</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow">
                    <select
                        className="border rounded px-3 py-2"
                        value={ingredientId}
                        onChange={e => setIngredientId(Number(e.target.value))}
                        required
                    >
                        <option value={0}>Selecciona ingrediente</option>
                        {allIngredients.map(ing => (
                            <option key={ing.id} value={ing.id}>{ing.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min={1}
                        className="border rounded px-3 py-2 w-24"
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        placeholder="Cantidad"
                        required
                    />
                    <input
                        type="date"
                        className="border rounded px-3 py-2"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FiPlus /> Registrar
                    </button>
                </form>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <FiBox className="text-blue-400" /> Compras registradas
                    </h3>
                    {purchases.length === 0 ? (
                        <p className="text-gray-500">No hay compras registradas.</p>
                    ) : (
                        <ul className="divide-y">
                            {purchases.map(p => {
                                const ingredient = allIngredients.find(i => i.id === p.ingredientId);
                                return (
                                    <li
                                        key={p.id}
                                        className="py-4 flex items-center justify-between hover:bg-blue-50 rounded-lg transition"
                                    >
                                        <div className="flex items-center gap-4 bg-gray-100 w-full p-3 rounded-lg">
                                            <FiBox className="text-green-500 text-xl" />
                                            <div>
                                                <div className="font-semibold text-gray-800 flex items-center gap-2">
                                                    {ingredient?.name}
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2 flex items-center gap-1">
                                                        <FiShoppingCart className="inline" /> {p.quantity}
                                                        {ingredient?.unit?.name && (
                                                            <span className="ml-1">{ingredient.unit.name}</span>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                                    <FiCalendar /> {p.date}
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
