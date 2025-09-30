import { type FormEvent, useEffect, useState} from "react";
import type {IngredientsProps, ListOfIngredientsProps} from "../interface/ingredients.ts";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
const initialState: IngredientsProps = {
    name: '',
    unit:0
}

export const useIngredients= ()=> {
    const inputsForm=[
        {label: 'Nombre', type: 'text', name: 'name', placeholder: 'Ej: Tomate'},
        {label: 'Unidad de Medida', type: 'text', name: 'unit', placeholder: 'Ej: kg, g, l, ml, unidades'},
    ]
    const navigate = useNavigate();
    const params = useParams();
    const id= params.id;
    const urlBack = import.meta.env.VITE_URL_BACKEND;
    const [dataOfIngredients, setDataOfIngredients]=useState<IngredientsProps>(initialState);
    const [units, setUnits] = useState([]);
    const handleInputChange = (  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setDataOfIngredients({
            ...dataOfIngredients,
            [name]: value
        });
    }
    const [isEditing, setIsEditing] = useState(false);
    console.log(dataOfIngredients)
    const getAllUnits = async () => {
        try {
            const res = await axios.get(`${urlBack}/recipebook/units`);
            setUnits(res.data.units);
        } catch {
            toast.error("Error al obtener unidades");
        }
    };
    const handleGetIngredientById = async () => {
        if (!id) return;
        try {
            const response = await axios.get(`${urlBack}/recipebook/ingredients/${id}`);
            const ingredient = response.data.ingredient;

            setDataOfIngredients({
                name: ingredient.name,
                unit: parseInt(ingredient.unit)
            });
            setIsEditing(true);
        } catch (error) {
            console.error('Error al obtener el ingrediente:', error);
        }

    }
    const [allIngredients, setAllIngredients] = useState<ListOfIngredientsProps[]>([]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!dataOfIngredients.name || !dataOfIngredients.unit) {
            console.error('Por favor, complete todos los campos del formulario.');
            return;
        }
        if (isEditing && id) {
            try {
                await axios.put(`${urlBack}/recipebook/ingredients/${id}`, dataOfIngredients).then(
                    response => {
                        toast.success(
                            `Ingrediente ${response.data.data.name} actualizado con éxito!`,
                            {
                                duration: 4000
                            }
                        )
                        setDataOfIngredients(initialState); // Reiniciar el formulario
                        setIsEditing(false);
                    }
                );
                navigate('/ingredients');
            } catch (error) {
                console.error('Error al actualizar el ingrediente:', error);
            }
            return;
        }
        try {
            await axios.post(`${urlBack}/recipebook/ingredients`, dataOfIngredients).then(
                response => {
                    toast.success(
                        `Ingrediente ${response.data.data.name} registrado con éxito!`,
                        {
                            duration: 4000
                        }
                    )
                    setDataOfIngredients(initialState);
                    navigate('/ingredients');
                }
            );
        }catch (error) {
            console.error('Error al registrar el ingrediente:', error);

        }
    }
    async function getAllIngredients(){
        try {
            await axios.get(`${urlBack}/recipebook/ingredients`).then(
                response => {
                    setAllIngredients(response.data.ingredients);
                }
            );
        } catch (error) {
            console.error('Error al obtener los ingredientes:', error);
        }
    }
    const handleDelete = async (id: number) => {

        try {
            await axios.delete(`${urlBack}/recipebook/ingredients/${id}`);
            getAllIngredients()

            toast.success('Ingrediente eliminado con éxito!', { duration: 4000 });
        } catch (error) {
            console.error('Error al eliminar el ingrediente:', error);
        }
    }
    useEffect(() => {
        getAllUnits()
    }, []);
    useEffect(() => {
        getAllIngredients()
    }, []);
    useEffect(() => {
        handleGetIngredientById()
    }, []);
    return {
        inputsForm,
        handleInputChange,
        dataOfIngredients,
        handleSubmit,
        allIngredients,
        handleDelete,
        isEditing,
        units
        }
}
