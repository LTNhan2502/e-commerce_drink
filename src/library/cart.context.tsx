'use client'
import React, {createContext, useContext, useEffect, useState} from "react";

interface ICartContext {
    products: IProductWithImage[];
    addProduct: (product: IProductWithImage) => void;
    removeProduct: (id: string) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<IProductWithImage[]>(() => {
        // Lấy dữ liệu từ localStorage khi khởi tạo
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Lưu vào localStorage mỗi khi sản phẩm thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(products));
    }, [products]);

    const addProduct = (product: IProductWithImage) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const removeProduct = (id: string) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    };

    return (
        <CartContext.Provider value={{ products, addProduct, removeProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
