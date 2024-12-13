'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFile } from "@/utils/fileServices";

const ProductPage: React.FC<{ category: string; products: IProduct[] }> = ({ category, products }) => {
    const [productsWithImage, setProductsWithImage] = useState<IProductWithImage[]>([]);

    useEffect(() => {
        const fetchImageURLs = async () => {
            try {
                const updatedProducts = await Promise.all(
                    products.map(async (product) => {
                        if (product.images && product.images.length > 0) {
                            const imageId = product.images[0];
                            const res = await getFile(imageId);
                            const imageURL = res.data.data.url;
                            return { ...product, imageURL };
                        }
                        return product;
                    })
                );
                setProductsWithImage(updatedProducts);
            } catch (error) {
                console.error("Failed to fetch image URLs:", error);
            }
        };

        fetchImageURLs();
    }, [products]);

    // const handleAddToCart = (product: IProductWithImage) => {
    //     try {
    //         const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    //         const updatedCart = [...cartItems, product];
    //         localStorage.setItem('cart', JSON.stringify(updatedCart));
    //         console.log("Product added to cart:", product);
    //     } catch (error) {
    //         console.error("Failed to add product to cart:", error);
    //     }
    // };

    return (
        <div className='flex flex-wrap me-[-0.75rem]'>
            <div className='w-full scroll-mt-28 mb-3 pe-3 font-semibold uppercase text-amber-400'>{category}</div>
            {productsWithImage.length > 0 ? (
                productsWithImage.map((product) => (
                    <Link
                        href={`product/${product._id}`}
                        key={product._id}
                        className='w-1/2 pe-3 mb-3 last:mb-16'
                        // onClick={(e) => {
                        //     e.preventDefault();
                        //     // addProduct(product);
                        // }}
                    >
                        <div className='rounded-lg w-full mb-2 overflow-hidden relative'>
                            <Image
                                src={product.imageURL as string}
                                alt={product.name}
                                width={150}
                                height={150}
                                className='w-full'
                            />
                            {product.isBestSeller && (
                                <div className='absolute flex justify-center items-center border-[#0bf0f4] border-solid rounded-full size-10 top-[-8px] right-[-8px] w-[80px] h-[80px] text-white font-bold text-sm rotate-[30deg] z-[5] shadow-md'>
                                    <div className='relative flex justify-center items-center border border-solid rounded-full w-[40px] h-[40px]'>
                                        <span className='absolute text-center text-[10px] font-bold'>BEST SELLER</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className='font-semibold mb-2'>{product.name}</p>
                        <p className='font-semibold mb-2'>{product.price}</p>
                    </Link>
                ))
            ) : null}
        </div>
    );
};

export default ProductPage;
