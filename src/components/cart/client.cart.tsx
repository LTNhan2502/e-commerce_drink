'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import React, {useContext, useEffect, useState} from "react";
import {useCart} from "@/library/cart.context";
import {getTopping} from "@/utils/toppingServices";
import {CurrencyContext} from "@/library/currency.context";
import {addOrder} from "@/utils/orderServices";
import {toast} from "react-toastify";
import {LoadingPage} from "@/components/loading/loading.page";

interface CartProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({ open, setOpen }) => {
    const { products, removeProduct } = useCart();
    const [allToppings, setAllToppings] = useState<ITopping[]>([]);
    const [visibleID, setVisibleID] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    // Dùng dấu ! ở cuối nếu chắc chắn rằng đã dùng CurrencyWrapper bọc mở main (không bao giờ undefined)
    const {formatCurrency} = useContext(CurrencyContext)!;

    const totalCartPrice = products.reduce((acc, product) => acc + product.totalPrice, 0);

    // Hàm thay đổi visibleID để hiển thị note
    const handleToggleNoteID = (id: string) => {
        // Khi nhấn vào, nếu id truyền vào bằng với visibleID thì tắt note, ngược lại
        setVisibleID(visibleID === id ? '' : id);
    }

    // Hàm xác nhận order
    const handleCreateOrder = async () => {
        setLoading(true)
        try {
            const order = {
                name: 'Client order',
                phone: '0123456789',
                order_details: products,
                status: "waiting"
            }
            const res = await addOrder(order);

            if(res){
                toast.success("Thêm thành công")
            }
        }catch(error){
            console.log("Failed to create order", error)
            toast.info("Tính năng đang trong quá trình nâng cấp")
        }finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        const fetchToppings = async() => {
            try {
                const res = await getTopping()
                const data = res.data
                setAllToppings(data)
            }catch (error){
                console.log("Failed to fetch toppings", error)
            }
        }

        fetchToppings()
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (visibleID && !(event.target as Element).closest('.note-container')) {
                setVisibleID('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [visibleID]);

    return (
        <>
            {loading && <LoadingPage/>}
            <Dialog open={open} onClose={setOpen} className="relative z-40">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 top-0 flex max-w-full pl-10">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-300 ease-in-out data-[closed]:translate-x-full sm:duration-300"
                            >
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-lg font-medium text-gray-900">Giỏ hàng</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="absolute -inset-0.5" />
                                                    <span className="sr-only">Đóng</span>
                                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                                </button>
                                            </div>
                                        </div>

                                        {products.length < 1 ? (
                                            <div className='flex justify-center'>
                                                <div className='text-lg font-bold'>Chưa có sản phẩm</div>
                                            </div>
                                        ) : (
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {products.map((product) => {
                                                            const uniqueKey = `product-${product._id}-${product.selectedSize}-${product.selectedToppings}`
                                                            return (
                                                                <li key={uniqueKey} className="flex py-6 items-center">
                                                                    <div
                                                                        className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200"
                                                                    >
                                                                        <Image
                                                                            alt={product.name}
                                                                            src={product.imageURL as string}
                                                                            width={150}
                                                                            height={150}
                                                                            className="size-full object-cover"
                                                                            priority
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        {/* Tên và xoá đơn */}
                                                                        <div>
                                                                            <div
                                                                                className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <p>{product.name}</p>
                                                                                </h3>
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-amber-600 hover:text-amber-500"
                                                                                    onClick={() => removeProduct(product._id, product.selectedSize, product.selectedToppings)}
                                                                                >
                                                                                    Xoá đơn
                                                                                </button>

                                                                            </div>

                                                                        </div>

                                                                        {/* Đơn giá và size */}
                                                                        <div className='flex justify-between items-center'>
                                                                            <p>
                                                                                {product.size.map((prod) => (
                                                                                    prod.size === product.selectedSize &&
                                                                                    <p key={prod._id}>{formatCurrency(prod.price)}đ</p>
                                                                                ))}
                                                                            </p>
                                                                            <p>Size {product.selectedSize}</p>
                                                                        </div>

                                                                        {/* Topping */}
                                                                        <div className='flex flex-col'>
                                                                            <p className='text-sm text-gray-600'>Topping</p>
                                                                            {allToppings.length > 0 && product.selectedToppings?.length > 0 ? (
                                                                                allToppings.map((topping) => (
                                                                                    product.selectedToppings.includes(topping._id) ? (
                                                                                        <span
                                                                                            className='text-sm text-gray-500 ml-2'
                                                                                            key={topping._id}
                                                                                        >
                                                                                            {topping.name}
                                                                                        </span>
                                                                                    ) : null
                                                                                ))
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>

                                                                        {/* Số lượng, tổng tiền và xem ghi chú */}
                                                                        <div
                                                                            className="flex flex-1 items-end justify-between text-sm">
                                                                            <div>
                                                                                <p className="text-gray-500">X {product.quantity}</p>
                                                                                <span className='relative note-container'>
                                                                                    {product.note &&
                                                                                        <>
                                                                                            <p
                                                                                                onClick={() => handleToggleNoteID(uniqueKey)}
                                                                                                className='text-amber-600 hover:text-amber-500 text-xs cursor-pointer'
                                                                                            >
                                                                                                Xem ghi chú
                                                                                            </p>
                                                                                            <span
                                                                                                className={`absolute bottom min-w-14 text-center rounded-md border shadow-md hover:border-gray-400 transition-all
                                                                                                    ${visibleID === uniqueKey ? 'visible scale-100' : 'invisible scale-125'}
                                                                                                `}
                                                                                            >
                                                                                                {product.note}
                                                                                            </span>
                                                                                        </>
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-gray-500">{formatCurrency(product.totalPrice)}đ</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {products.length >= 1 && (
                                        <div className="border-t bg-white border-gray-200 px-4 py-6 sm:px-6 z-50">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Tổng giá</p>
                                                <p>{formatCurrency(totalCartPrice)}đ</p>
                                            </div>
                                            {/*<p className="mt-0.5 text-sm text-gray-500">Đã tính phụ phí và giá ship.</p>*/}
                                            <div className="mt-6">
                                                <span
                                                    onClick={handleCreateOrder}
                                                    className="flex items-center justify-center rounded-md border border-transparent bg-amber-400 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-600"
                                                >
                                                    Đặt món
                                                </span>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    hoặc{' '}
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpen(false)}
                                                        className="font-medium text-amber-600 hover:text-amber-500"
                                                    >
                                                        Tiếp tục xem hàng
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Cart;
