'use client'
import {useState} from "react";
import Cart from "@/components/cart/client.cart";

const Footer = () => {
    const [cartOpen, setCartOpen] = useState(false);

    return(
        <>
            <div className='p-3 w-full fixed bottom-0 left-0 bg-white z-10'>
                <button
                    className='rounded-lg bg-amber-400 flex justify-center text-white w-full py-2 text font-medium'
                    onClick={() => setCartOpen(true)}
                >
                    Xem giỏ hàng - (1 món)
                </button>
            </div>

            <Cart open={cartOpen} setOpen={setCartOpen} />
        </>
    )
}

export default Footer;