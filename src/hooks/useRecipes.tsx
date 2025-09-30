import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import type { CategoryProps } from "../hooks/useCategories";
import type {IngredientsProps} from "../interface/ingredients.ts";
import type {UnitProps} from "./useUnits.tsx";

export interface RecipeIngredient {
    ingredientId: number;
    quantity: number;
    unitId: number;
    ingredient?:{
        id: number;
        name: string;
        unitId: number;
        unit?: {
        id: number;
        name: string;
        abbreviation: string;
    }}

}
export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    recipeId: number;
    unit: {
        id: number;
        name: string;
        abbreviation: string;
    }
}
export interface RecipeProps {
    id?: number;
    name: string;
    description: string;
    categoryId: number;
    ingredients: RecipeIngredient[];
}

const initialState: RecipeProps = {
    name: "",
    description: "",
    categoryId: 0,
    ingredients: [],
};
export const useRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [data, setData] = useState<RecipeProps>(initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [allIngredients, setAllIngredients] = useState<IngredientsProps[]>([]);
    const [units, setUnits] = useState<UnitProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);

    const navigate = useNavigate();
    const { id } = useParams();
    const urlBack = import.meta.env.VITE_URL_BACKEND;

    const getAll = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/recipes`);
            console.log(res)

            setRecipes(res.data);
        } catch {
            toast.error("Error al obtener recetas");
        }
    };

    const getAllCategories = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/categories`);
            console.log(res)

            setCategories(res.data.categories);
        } catch {
            toast.error("Error al obtener categorías");
        }
    };
    const getById = async () => {
        if (!id) return;
        console.log(id)

        try {
            const res = await axios.get(`${urlBack}/recipebook/recipes/${id}`);
            console.log(res)

            setData(res.data);
            setIsEditing(true);
        } catch {
            toast.error("Error al obtener la receta");
        }
    };

    const getAllIngredients = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/ingredients`);
            setAllIngredients(res.data.ingredients);
        } catch {
            toast.error("Error al obtener ingredientes");
        }
    };

    const getAllUnits = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/units`);
            setUnits(res.data.units);
        } catch {
            toast.error("Error al obtener unidades");
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: name === "categoryId" ? Number(value) : value,
        });
    };
    const handleIngredientChange = (
        idx: number,
        field: keyof RecipeIngredient,
        value: string | number
    ) => {
        const updated = [...data.ingredients];
        updated[idx] = { ...updated[idx], [field]: value };
        setData({ ...data, ingredients: updated });
    };

    const addIngredient = () => {
        setData({
            ...data,
            ingredients: [
                ...data.ingredients,
                { ingredientId: 0, quantity: 1, unitId: 0 },
            ],
        });
    };

    const removeIngredient = (idx: number) => {
        const updated = [...data.ingredients];
        updated.splice(idx, 1);
        setData({ ...data, ingredients: updated });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!data.name || !data.description || data.ingredients.length === 0) {
            toast.error("Completa todos los campos y agrega al menos un ingrediente");
            return;
        }
        if(!categories){
            toast.error("No hay categorías disponibles. Crea una categoría primero.");
            return;
        }
        try {
            if (isEditing && id) {
                await axios.put(`${urlBack}/recipebook/recipes/${id}`, data);
                toast.success("Receta actualizada");
                setIsEditing(false);
            } else {
                await axios.post(`${urlBack}/recipebook/recipes`, data);
                toast.success("Receta creada");
            }
            setData(initialState);
            navigate("/recipes");
        } catch {
            toast.error("Error al guardar la receta");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${urlBack}/recipebook/recipes/${id}`);
            getAll();
            toast.success("Receta eliminada");
        } catch {
            toast.error("Error al eliminar la receta");
        }
    };

    useEffect(() => {
        getAllIngredients()
        getAll();

    }, []);
    useEffect(() => {
        getById();
        getAllIngredients();
        getAllUnits();
        getAllCategories();
    }, [id]);

    return {
        recipes,
        data,
        isEditing,
        handleInputChange,
        handleIngredientChange,
        addIngredient,
        removeIngredient,
        handleSubmit,
        handleDelete,
        allIngredients,
        units,
        categories
    };
};
