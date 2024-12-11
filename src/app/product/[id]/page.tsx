'use client'

import {useEffect, useMemo, useState} from 'react'
import Image from "next/image";
import {Radio, RadioGroup} from "@headlessui/react";
import {getSize} from "@/utils/sizeServices";
import {getTopping} from "@/utils/toppingServices";
import {getOneMenu} from "@/utils/menuServices";
import {useCart} from "@/library/cart.context";
import {getFile} from "@/utils/fileServices";
import {LoadingPage} from "@/components/loading/loading.page";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

function classNames(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail({ params }: { params: { id: number } }) {
    const [selectedSize, setSelectedSize] = useState<{ size: string }>({ size: '' })
    const [selectedToppings, setSelectedToppings] = useState<string[]>([])
    const [menu, setMenu] = useState<IProduct | null>(null)
    const [productWithImage, setProductWithImage] = useState<IProductWithImage | null>(null)
    const [size, setSize] = useState<ISize[]>([])
    const [topping, setTopping] = useState<ITopping[]>([])
    const [quantity, setQuantity] = useState<number>(1)
    const [loading, setLoading] = useState(false)
    const { addProduct } = useCart()

    const toggleTopping = (toppingId: string) => {
        setSelectedToppings((prevSelected) =>
            prevSelected.includes(toppingId)
                ? prevSelected.filter((id) => id !== toppingId)
                : [...prevSelected, toppingId]
        );
    };

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1)
    }

    const handleDecrease = () => {
        if(quantity > 1){
            setQuantity((prevQuantity) => prevQuantity - 1)
        }
    }

    const calculateTotalPrice = (price: number, quantity: number, toppingsPrice: number): number => {
        return (price * quantity + toppingsPrice)
    }

    const handleAddToCart = (product: IProductWithImage) => {
        if(!product) return;

        const cartItem = {
            ...product,
            quantity,
            selectedSize: selectedSize.size,
            selectedToppings,
            totalPrice,
        }
        console.log(">>Check cartItem", cartItem)
        addProduct(cartItem)
    }

    // Tính tổng
    const totalPrice = useMemo(() => {
        const toppingsPrice = selectedToppings.reduce(
            (sum, id) => sum + (topping.find((t) => t._id === id)?.price || 0),
            0
        )

        return calculateTotalPrice(productWithImage?.price || 0, quantity, toppingsPrice)
    }, [productWithImage, selectedToppings, quantity, topping])

    // Lấy thông tin của sản phẩm
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

    // Lấy url của ảnh và thêm nó vào đối tượng
    useEffect(() => {
        if (!menu) return; // Chỉ thực hiện khi `menu` có dữ liệu

        const fetchImageURL = async () => {
            try {
                if (menu.images && menu.images.length > 0) {
                    const imageId = menu.images[0];
                    const res = await getFile(imageId);
                    const imageURL = res.data.data.url;

                    // Cập nhật sản phẩm với URL ảnh
                    setProductWithImage({ ...menu, imageURL });
                } else {
                    setProductWithImage({ ...menu });
                }
            } catch (error) {
                console.error("Failed to fetch image URL:", error);
            }
        };

        fetchImageURL();
    }, [menu])

    console.log(menu, size, topping)
    console.log(">>Check params", params.id)
    console.log(loading)
    console.log(">>Check menu", productWithImage)
    console.log(">>Check selected toppings", selectedToppings)
    console.log(">>Check selected size", selectedSize)

    if(!productWithImage){
        return (
            <LoadingPage/>
        )
    }

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
                                alt={productWithImage.name}
                                src={productWithImage.imageURL as string}
                                width={150}
                                height={150}
                                className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4] rounded-lg"
                            />
                        {/*</div>*/}
                    </div>

                    {/* Size */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productWithImage.name}</h1>
                        </div>
                        <h2 className="sr-only">Thông tin sản phẩm</h2>
                        {/*<p className="text-3xl tracking-tight text-gray-900">{productWithImage.price}đ</p>*/}
                        <div className="flex justify-between items-center gap-4">
                            {/* Hiển thị giá */}
                            <span className="text-lg font-bold text-amber-500">
                                {productWithImage.price}đ
                            </span>

                            {/* Hiển thị ô tăng giảm số lượng */}
                            <div className="flex items-center gap-2">
                                {/* Nút giảm */}
                                <button
                                    className="w-8 h-8 flex items-center justify-center border-2 border-amber-500 text-amber-500 rounded"
                                    onClick={handleDecrease}
                                >
                                    <AiOutlineMinus/>
                                </button>
                                {/* Số lượng */}
                                <span className="text-base font-semibold">{quantity}</span>
                                {/* Nút tăng */}
                                <button
                                    className="w-8 h-8 flex items-center justify-center bg-amber-500 text-white rounded"
                                    onClick={handleIncrease}
                                >
                                    <AiOutlinePlus/>
                                </button>
                            </div>
                        </div>

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
                                                disabled={!productWithImage.size_id.includes(size._id)}
                                                className={classNames(
                                                    productWithImage.size_id.includes(size._id)
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                )}
                                            >
                                                <span>{size.size}</span>
                                                {productWithImage.size_id.includes(size._id) ? (
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
                                    <div className="space-y-4">
                                        {topping.map((topping) => (
                                            <label
                                                key={topping._id}
                                                className="flex items-center justify-between border-b py-3"
                                            >
                                                {/* Thông tin topping */}
                                                <div>
                                                    <p className="text-base font-medium text-gray-800">{topping.name}</p>
                                                    <p className="text-sm text-gray-500">{topping.price}đ</p>
                                                </div>

                                                {/* Checkbox */}
                                                <input
                                                    type="checkbox"
                                                    checked={selectedToppings.includes(topping._id)}
                                                    onChange={() => toggleTopping(topping._id)}
                                                    className="h-5 w-5 appearance-none rounded border border-gray-300 focus:ring-2 focus:ring-amber-500 checked:bg-amber-500 relative checked:border-transparent checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-amber-400 px-8 py-3 text-base font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={() => handleAddToCart(productWithImage)}
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
