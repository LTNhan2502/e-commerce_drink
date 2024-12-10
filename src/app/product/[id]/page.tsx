'use client'

import {useEffect, useState} from 'react'
import Image from "next/image";
import {Radio, RadioGroup} from "@headlessui/react";
import {getSize} from "@/utils/sizeServices";
import {getTopping} from "@/utils/toppingServices";
import {getOneMenu} from "@/utils/menuServices";

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    topping: [
        { name: 'Trân châu đen', inStock: false },
        { name: 'Trân châu trắng', inStock: true },
        { name: 'Khúc bạch', inStock: true },
        { name: 'Phô mai (vành ly)', inStock: false },

    ],
}

function classNames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail({ params }: { params: { id: number } }) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [selectedTopping, setSelectedTopping] = useState(product.sizes[2])
    const [menu, setMenu] = useState<IProduct[]>([])
    const [size, setSize] = useState<ISize[]>([])
    const [topping, setTopping] = useState<ITopping[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSizeAndTopping = async() => {
            setLoading(true)
            try {
                const [menuRes, sizeRes, toppingRes] = await Promise.all([
                    getOneMenu(params.id),
                    getSize(),
                    getTopping(),
                ])
                setMenu(menuRes.data)
                setSize(sizeRes.data)
                setTopping(toppingRes.data)
            }catch(error){
                console.log("Failed to fetch size and topping", error)
            }finally {
                setLoading(false)
            }
        }

        fetchSizeAndTopping()
    }, [params.id]);

    console.log(menu, size, topping)
    console.log(">>Check params", params.id)
    console.log(loading)

    return (
        <div className="bg-white">
            <div className="pt-12">
                {/* Product info */}
                <div
                    className="mx-auto max-w-2xl px-4 pb-16 pt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
                >
                    <div
                        className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8">
                            {/* Image */}
                            <Image
                                alt={menu[0].name}
                                src={product.images[3].src}
                                width={150}
                                height={150}
                                className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4] rounded-lg"
                            />
                        {/*</div>*/}
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{menu[0].name}</h1>
                        </div>
                        <h2 className="sr-only">Thông tin sản phẩm</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{menu[0].price}đ</p>

                        {/* Reviews */}
                        <form className="mt-10">
                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                </div>

                                <fieldset aria-label="Choose a size" className="mt-4">
                                    <RadioGroup
                                        value={selectedSize}
                                        onChange={setSelectedSize}
                                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                    >
                                        {size.map((size) => (
                                            <Radio
                                                key={size._id}
                                                value={size}
                                                disabled={!menu[0].size_id.includes(size._id)}
                                                className={classNames(
                                                    menu[0].size_id.includes(size._id)
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                )}
                                            >
                                                <span>{size.size}</span>
                                                {menu[0].size_id.includes(size._id) ? (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-amber-400"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            stroke="currentColor"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                        >
                                                            <line x1={0} x2={100} y1={100} y2={0}
                                                                  vectorEffect="non-scaling-stroke"/>
                                                        </svg>
                                                    </span>
                                                )}
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            {/* Topping */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Topping</h3>
                                </div>

                                <fieldset aria-label="Choose a size" className="mt-4">
                                    <RadioGroup
                                        value={selectedTopping}
                                        onChange={setSelectedTopping}
                                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                    >
                                        {topping.map((topping) => (
                                            <Radio
                                                key={topping.name}
                                                value={topping}
                                                disabled={!menu[0].topping_id.includes(topping._id)}
                                                className={classNames(
                                                    menu[0].topping_id.includes(topping._id)
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-amber-400 sm:flex-1 sm:py-6',
                                                )}
                                            >
                                                <span>{topping.name}</span>
                                                {menu[0].topping_id.includes(topping._id) ? (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-amber-400"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            stroke="currentColor"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                        >
                                                            <line x1={0} x2={100} y1={100} y2={0}
                                                                  vectorEffect="non-scaling-stroke"/>
                                                        </svg>
                                                    </span>
                                                )}
                                            </Radio>
                                        ))}
                                    </RadioGroup>
                                </fieldset>
                            </div>

                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-400 px-8 py-3 text-base font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}
