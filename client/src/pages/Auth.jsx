import { FcGoogle } from 'react-icons/fc';
import { FaVk } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

const AuthPage = () => {
    return(
        <section className="flex flex-col justify-center items-center bg-black w-[100vw] h-[100vh]">
            <a href="/" className='absolute mb-109 bg-black' ><img src="/img/whiteLogo.png" alt="white kitten logo" width={"60px"} /></a>
            <div className="flex flex-col justify-between items-center border border-white rounded-2xl h-100 w-70 sm:w-90 mx-3">
                <h4 className="text-xl mx-10 my-18 font-bold text-center">Войдите с помощью</h4>
                <div className="flex flex-col justify-center w-full gap-3 py-10 px-10">
                    <div className="justify-center">
                        <div
                            className="flex items-center justify-center w-full border border-red-600 rounded-lg p-2 hover:bg-red-600 cursor-pointer"
                        >
                            <FcGoogle size={20} />
                        </div>
                    </div>
                    <div className="justify-center">
                        <div
                            className="flex items-center justify-center w-full border border-blue-600 rounded-lg p-2 hover:bg-blue-600 cursor-pointer"
                        >
                            <FaVk size={20} />
                        </div>
                    </div>
                    <div className="justify-center">
                        <div
                            className="flex items-center justify-center w-full border border-blue-400 rounded-lg p-2 hover:bg-blue-400 cursor-pointer"
                        >
                            <FaTelegramPlane size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;