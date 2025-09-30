import {Header} from './Header.tsx';
import {Toaster} from 'react-hot-toast';
import  {Outlet} from "react-router-dom";
export const Layout = () => {
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <Header />
            <main className="flex flex-col items-center justify-center w-full">

                <Outlet />

            </main>
        </div>
    );
};