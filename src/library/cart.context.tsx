'use client'
import React, {createContext, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

interface ICartContext {
    products: ICart[];
    addProduct: (product: ICart) => void;
    removeProduct: (id: string, selectedSize: string, selectedToppings: string[]) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ICart[]>(() => {
        // Lấy dữ liệu từ Cookie khi khởi tạo
        const storedCart = Cookies.get("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Lưu vào Cookie mỗi khi sản phẩm thay đổi
    useEffect(() => {
        Cookies.set("cart", JSON.stringify(products));
    }, [products]);

    const addProduct = (product: ICart) => {
        setProducts((prevProduct) => {
            // Kiểm tra xem đã có sản phẩm chỉ định trong cart chưa
            const existingProduct = prevProduct.find((prod) =>
                prod._id === product._id &&
                prod.selectedSize === product.selectedSize &&
                JSON.stringify(prod.selectedToppings) === JSON.stringify(product.selectedToppings)
            )

            // Nếu có tồn tại rồi thì tăng số lượng lên
            if(existingProduct){
                return prevProduct.map((prod) =>
                    prod._id === product._id &&
                    prod.selectedSize === product.selectedSize &&
                    JSON.stringify(prod.selectedToppings) === JSON.stringify(product.selectedToppings) ? {
                        ...prod,
                        quantity: prod.quantity + product.quantity,
                        totalPrice: prod.totalPrice + product.totalPrice,
                    } : prod
                )
            }

        //     Nếu không tồn tại thì thêm mới
            return [ ...prevProduct, product ]
        })

        // setProducts((prevProducts) => [...prevProducts, product]);
    };

    const removeProduct = (id: string, selectedSize: string, selectedToppings: string[]) => {
        setProducts((prevProducts) => prevProducts.filter((product) => {
            const isSameSize = product.selectedSize === selectedSize;
            const isSameToppings = JSON.stringify(product.selectedToppings) === JSON.stringify(selectedToppings);
            return !(product._id === id && isSameSize && isSameToppings)

        }));
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
