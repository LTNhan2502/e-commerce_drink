'use client'
import {useEffect, useState} from "react";
import Cart from "@/components/cart/client.cart";
import {useCart} from "@/library/cart.context";

const Footer = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { products } = useCart()

    // Dùng cái này để không bị lỗi runtime giá trị không khớp giữa server và client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return(
        <>
            <div className='p-3 w-full fixed bottom-0 left-0 bg-white z-10'>
                <button
                    className='rounded-lg bg-amber-400 flex justify-center text-white w-full py-2 text font-medium'
                    onClick={() => setCartOpen(true)}
                >
                    Xem giỏ hàng { isMounted && products.length > 0 ? `- ( ${products.length} món)` : '' }
                </button>
            </div>

            <Cart open={cartOpen} setOpen={setCartOpen} />
        </>
    )
}

export default Footer;