'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProductPage: React.FC<{ category: string; products: IProduct[] }> = ({ category, products }) => {

    return(
        <div className='flex flex-wrap me-[-0.75rem]'>
            <div className='w-full scroll-mt-28 mb-3 pe-3 font-semibold uppercase text-amber-400'>{category}</div>
            {products.map((product) => (
                <Link href={`product/${product.id}`} key={product.id} className='w-1/2 pe-3 mb-3 last:mb-16'>
                    <div className='rounded-lg w-full mb-2 overflow-hidden relative'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={150}
                            height={150}
                            className='w-full'
                        />
                        {product.status === 'best' ? (
                            <div className='absolute flex justify-center items-center border-[#0bf0f4] border-solid rounded-full size-10 top-[-8px] right-[-8px] w-[80px] h-[80px] text-white font-bold text-sm rotate-[30deg] z-[5] shadow-md'>
                                <div className='relative flex justify-center items-center border border-solid rounded-full w-[40px] h-[40px]'>
                                    <span className='absolute text-center text-[10px] font-bold'>BEST SELLER</span>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                    <p className='font-semibold mb-2'>{product.name}</p>
                    <p className='font-semibold mb-2'>{product.price}</p>
                </Link>
            ))}
        </div>
    )
}

export default ProductPage;