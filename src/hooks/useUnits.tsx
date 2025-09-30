import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export interface UnitProps {
    id?: number;
    name: string;
    abbreviation: string;
}

const initialState: UnitProps = { name: "", abbreviation: "" };

export const useUnits = () => {
    const [units, setUnits] = useState<UnitProps[]>([]);
    const [data, setData] = useState<UnitProps>(initialState);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const urlBack = import.meta.env.VITE_URL_BACKEND;

    const getAll = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/units`);
            setUnits(res.data.units);
        } catch {
            toast.error("Error al obtener unidades");
        }
    };

    const getById = async () => {
        if (!id) return;
        try {
            const res = await axios.get(`${urlBack}/recipebook/units/${id}`);
            setData({
                name: res.data.unit.name,
                abbreviation: res.data.unit.abbreviation,
            });
            setIsEditing(true);
        } catch {
            toast.error("Error al obtener la unidad");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!data.name || !data.abbreviation) return toast.error("Todos los campos son requeridos");
        if (isEditing && id) {
            try {
                await axios.put(`${urlBack}/recipebook/units/${id}`, data);
                toast.success("Unidad actualizada");
                setIsEditing(false);
                setData(initialState);
                navigate("/units");
            } catch {
                toast.error("Error al actualizar");
            }
            return;
        }
        try {
            await axios.post(`${urlBack}/recipebook/units`, data);
            toast.success("Unidad creada");
            navigate("/units");
            setData(initialState);
            getAll();
        } catch {
            toast.error("Error al crear");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${urlBack}/recipebook/units/${id}`);
            toast.success("Unidad eliminada");
            getAll();
        } catch {
            toast.error("Error al eliminar");
        }
    };

    useEffect(() => { getAll(); }, []);
    useEffect(() => { getById(); }, [id]);

    return {
        units,
        data,
        isEditing,
        handleInputChange,
        handleSubmit,
        handleDelete,
        setIsEditing,
        setData,
    };
};