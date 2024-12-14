'use client'
import Image from "next/image";
import logo from '../../assets/logo.jpg';
import backgroundImage from '../../assets/login-background.jpg';
import {AiOutlineLock, AiOutlineUser} from "react-icons/ai";
import React, {useState} from "react";
import {toast} from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({})
    // const [username, setUsername] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    // const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(">>Check formData", formData)
        toast.info("Đăng nhập")
    }

    return(
        <div className='flex h-screen w-full'>
            <div className='w-full h-screen overflow-hidden relative'>
                {/* Background image */}
                <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                    <Image
                        src={backgroundImage}
                        alt="Background image"
                        layout="fill"
                        objectFit="cover"
                        priority // Tải ảnh nền ngay lập tức khi vào trang
                    />
                </div>

                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-full h-screen md:w-[60%] md:rounded-lg md:h-[600px] flex flex-col justify-center items-center bg-white'>
                        <h2 className='text-[#3C4858] text-[40px] font-light'>
                            <Image src={logo} alt="Logo" width={100} height={100}/>
                        </h2>
                        <div className='flex flex-col gap-3 items-center mt-5'>
                            <div className='flex gap-2'>
                                <button className="w-10 h-10 bg-[#55acee] rounded-full"></button>
                                <button className="w-10 h-10 bg-[#ea4c89] rounded-full"></button>
                                <button className="w-10 h-10 bg-[#ea4c89] rounded-full"></button>
                            </div>
                            <h4>Trà sữa an tea</h4>
                        </div>
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <div className='flex justify-center items-center gap-2 relative w-max border-b-[1px] border-b-gray-400 mt-7'>
                                <AiOutlineUser className='h-6 w-6 text-gray-500'/>
                                <input
                                    type="text"
                                    placeholder='Nhập tài khoản'
                                    name='username'
                                    className='p-2 text-sm outline-none w-[250px]'
                                    onChange={handleChange}
                                />
                                {/*<p*/}
                                {/*    className={`text-sm ${errors.username ? "text-red-500" : "text-red-500"}`}*/}
                                {/*    style={{ minHeight: "1.25rem" }}*/}
                                {/*>*/}
                                {/*    {errors.username || ""}*/}
                                {/*</p>*/}
                            </div>
                            <div className='flex justify-center items-center gap-2 relative w-max border-b-[1px] border-b-gray-400 mt-7'>
                                <AiOutlineLock className='h-6 w-6 text-gray-500'/>
                                <input
                                    type="password"
                                    placeholder='Nhập mật khẩu'
                                    name='password'
                                    className='p-2 text-sm outline-none w-[250px]'
                                    onChange={handleChange}
                                />
                                {/*<p*/}
                                {/*    className={`text-sm ${errors.password ? "text-red-500" : "invisible"}`}*/}
                                {/*    style={{ minHeight: "1.25rem" }}*/}
                                {/*>*/}
                                {/*    {errors.password || ""}*/}
                                {/*</p>*/}
                            </div>
                            <button
                                type='submit'
                                className='text-white py-3 px-5 bg-[#9c27b0] w-max rounded-full text-xs m-auto mt-5'
                            >
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;