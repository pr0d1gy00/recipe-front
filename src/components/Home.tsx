import {FiBookOpen, FiEdit2, FiList, FiPlusCircle, FiTag} from "react-icons/fi";

export const Home = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full flex flex-col gap-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
                <FiBookOpen className="text-blue-500 text-3xl" />
                <h1 className="text-3xl font-extrabold text-blue-700">Bienvenido al Gestor de Recetas</h1>
            </div>
            <p className="text-gray-700 text-lg">
                Esta aplicación te permite gestionar tus recetas de cocina de manera sencilla. Puedes:
            </p>
            <ul className="list-disc ml-8 text-gray-700 text-base flex flex-col gap-2">
                <li className="flex items-center gap-2">
                    <FiList className="text-blue-400" /> Ver y buscar recetas existentes.
                </li>
                <li className="flex items-center gap-2">
                    <FiPlusCircle className="text-green-400" /> Registrar nuevas recetas con ingredientes, cantidades y categorías.
                </li>
                <li className="flex items-center gap-2">
                    <FiTag className="text-purple-400" /> Gestionar ingredientes y unidades de medida.
                </li>
                <li className="flex items-center gap-2">
                    <FiEdit2 className="text-yellow-400" /> Editar o eliminar recetas e ingredientes según tus necesidades.
                </li>
            </ul>
            <p className="text-gray-600 mt-4">
                ¡Comienza navegando por el menú y disfruta organizando tus recetas!
            </p>
        </div>
    </div>
);
