'use client'
import { useState } from "react";
import Image from "next/image";
import logo from '../../assets/logo.jpg';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import OverlayDrawer from "@/components/overlay/overlay.drawer";
import Cart from "@/components/cart/client.cart";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <header className="bg-white shadow-md fixed w-full z-40 left-0 top-0">
            <div className="container mx-auto flex justify-between items-center py-3 px-6">
                {/* Left Menu Icon */}
                <button
                    className="text-2xl text-gray-700 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <AiOutlineMenu />
                </button>

                {/* Logo */}
                <div className="flex justify-center flex-grow lg:flex-grow-0">
                    <Link href={'/'}>
                        <Image
                            src={logo}
                            alt="Logo"
                            className="h-8 w-8 object-cover rounded-full"
                        />
                    </Link>
                </div>

                {/* Cart Icon */}
                <div className="relative">
                    <button onClick={() => setCartOpen(true)}>
                        <AiOutlineShoppingCart className="text-2xl text-gray-700" />
                        <div className="absolute -top-1 -right-2 bg-yellow-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            1
                        </div>
                    </button>
                </div>
            </div>

            <OverlayDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Cart open={cartOpen} setOpen={setCartOpen}/>
        </header>
    );
}
