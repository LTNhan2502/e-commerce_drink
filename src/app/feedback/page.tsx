'use client'

import React, { useState } from "react";
import {postEvaluate} from "@/utils/evaluateServices";
import {toast} from "react-toastify";

const FeedbackPage = () => {
    const [selectedStars, setSelectedStars] = useState<number>(5);
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [errors, setErrors] = useState<{ name?: string; phone?: string; content?: string }>({});

    const handleStarClick = (star: number) => {
        setSelectedStars(star);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Reset errors
        const newErrors: { name?: string; phone?: string; content?: string } = {};

        // Kiểm tra họ và tên
        if (!name || !name.trim()) {
            newErrors.name = "Vui lòng không để trống";
        } else if (name.length < 2) {
            newErrors.name = "Họ và tên phải từ 2 ký tự trở lên";
        }

        // Kiểm tra số điện thoại
        if (!phone || !phone.trim()) {
            newErrors.phone = "Vui lòng không để trống";
        } else if (!/^0\d{9}$/.test(phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }

        // Kiểm tra nội dung
        if (!content || !content.trim()) {
            newErrors.content = "Vui lòng không để trống";
        } else if (content.length > 2000) {
            newErrors.content = "Nội dung nhận xét không được dài quá 2000 ký tự";
        }

        // Gán lỗi vào state
        setErrors(newErrors);

        // Nếu không có lỗi
        if (Object.keys(newErrors).length === 0) {
            console.log("Vô ròi");
            try {
                const res = await postEvaluate(name, phone, content, selectedStars);
                if (res && res.statusCode === 201) {
                    toast.success("Gửi đánh giá thành công")
                    // Reset form
                    setName('');
                    setPhone('');
                    setContent('');
                    setSelectedStars(5);
                }
            } catch (error) {
                console.log("Failed to submit", error);
            }
        }
    };


    return (
        <div className="isolate bg-white px-6 py-16 sm:py-16 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Trải nghiệm của bạn</h2>
                {/* Chọn số sao */}
                <div className="flex items-center justify-center space-x-2 mb-4 mt-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleStarClick(star)}
                            className={`text-3xl cursor-pointer transition ${
                                star <= selectedStars ? "text-yellow-400" : "text-gray-300"
                            }`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <form className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <div className="mt-2.5">
                            <input
                                id="full-name"
                                name="full-name"
                                type="text"
                                autoComplete="given-name"
                                placeholder="Họ và tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500"
                            />
                            <p
                                className={`text-sm ${errors.name ? "text-red-500" : "invisible"}`}
                                style={{ minHeight: "1.25rem" }}
                            >
                                {errors.name || ""}
                            </p>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <div>
                            <input
                                id="phone-number"
                                name="phone-number"
                                type="text"
                                placeholder="Số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500"
                            />
                            <p
                                className={`text-sm ${errors.phone ? "text-red-500" : "invisible"}`}
                                style={{ minHeight: "1.25rem" }}
                            >
                                {errors.phone || ""}
                            </p>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <div>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500"
                                placeholder="Nhận xét"
                            />
                            <p
                                className={`text-sm ${errors.content ? "text-red-500" : "invisible"}`}
                                style={{ minHeight: "1.25rem"}}
                            >
                                {errors.content || ""}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-amber-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        onClick={handleSubmit}
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FeedbackPage;
