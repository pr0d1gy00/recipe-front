import { useState } from "react";
import { useIngredients } from "./useIngredients.tsx";
import toast from "react-hot-toast";
import axios from "axios";

export interface Purchase {
    id: number;
    ingredientId: number;
    quantity: number;
    date: string;
}

export const usePurchases = (initialPurchases: Purchase[] = []) => {
    const { allIngredients } = useIngredients();
    const [ingredientId, setIngredientId] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [date, setDate] = useState<string>("");
    const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
    const urlBack = import.meta.env.VITE_URL_BACKEND;

    const fetchPurchases = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/purchases`);
            setPurchases(res.data);
        } catch (error) {
            console.log(error)

            toast.error("Error al obtener las compras");
        }
    };

    const addPurchase = (purchase: Omit<Purchase, "id">) => {
        setPurchases(prev => [
            ...prev,
            { ...purchase, id: Date.now() }
        ]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ingredientId || !quantity || !date) {
            toast.error('Todos los campos son requeridos');
            return;
        }
        try {
            await axios.post(`${urlBack}/recipebook/purchases`, {
                ingredientId, quantity, date
            });
            fetchPurchases();
        } catch (error) {
            console.log(error)

            toast.error('Error al registrar la compra');
            return;
        }
        setIngredientId(0);
        setQuantity(1);
        setDate("");
    };

    const deletePurchase = (id: number) => {
        setPurchases(prev => prev.filter(p => p.id !== id));
    };

    return {
        purchases,
        addPurchase,
        deletePurchase,
        allIngredients,
        handleSubmit,
        fetchPurchases,
        ingredientId,
        setIngredientId,
        quantity,
        setQuantity,
        date,
        setDate
    };
};