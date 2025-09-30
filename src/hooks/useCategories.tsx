import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export interface CategoryProps {
    id?: number;
    name: string;
}

const initialState: CategoryProps = { name: "" };

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [data, setData] = useState<CategoryProps>(initialState);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const urlBack = import.meta.env.VITE_URL_BACKEND;

    const getAll = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/categories`);
            setCategories(res.data.categories);
        } catch (e) {
            toast.error("Error al obtener categorías");
        }
    };

    const getById = async () => {
        if (!id) return;
        try {
            const res = await axios.get(`${urlBack}/recipebook/categories/${id}`);
            console.log(res)

            setData({ name: res.data.category.name });
            setIsEditing(true);
        } catch {
            toast.error("Error al obtener la categoría");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!data.name) return toast.error("Nombre requerido");
        if (isEditing && id) {
            try {
                await axios.put(`${urlBack}/recipebook/categories/${id}`, data);
                toast.success("Categoría actualizada");
                setIsEditing(false);
                setData(initialState);
                navigate("/categories");
            } catch {
                toast.error("Error al actualizar");
            }
            return;
        }
        try {
            await axios.post(`${urlBack}/recipebook/categories`, data);
            toast.success("Categoría creada");
            setData(initialState);
            getAll();
        } catch {
            toast.error("Error al crear");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${urlBack}/recipebook/categories/${id}`);
            toast.success("Eliminada");
            getAll();
        } catch {
            toast.error("Error al eliminar");
        }
    };

    useEffect(() => { getAll(); }, []);
    useEffect(() => { getById(); }, [id]);

    return {
        categories,
        data,
        isEditing,
        handleInputChange,
        handleSubmit,
        handleDelete,
        setIsEditing,
        setData,
    };
};
