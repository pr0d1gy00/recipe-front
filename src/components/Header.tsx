import {useHeader} from "../hooks/useHeader.tsx";
import {useNavigate} from "react-router-dom";
export const Header = () => {
    const {optionsHeader}= useHeader()
    const navigate = useNavigate();
    return (
        <header className={"bg-gray-800 text-white flex justify-center"}>

                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Mi Aplicación de Cocina</h1>
                    {
                        <nav className="flex items-center justify-between gap-4">
                                {optionsHeader.map((option) => (
                                    <button key={option.value} className="hover:underline hover: cursor-pointer"
                                        onClick={() => navigate(option.value)}
                                    >
                                        {option.label}

                                    </button>
                                ))}

                        </nav>
                    }
                </div>



        </header>
    );
};
