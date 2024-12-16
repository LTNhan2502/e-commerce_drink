interface IProduct {
    _id: string;
    category_id: Array<string>;
    size_id: Array<string>;
    topping_id: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    name: string;
    size: Array<ISize>;
    images: Array<string>;
    isBestSeller: boolean;
    isOutOfStock: boolean;
    __v: number;
}

interface ISize {
    _id: string;
    size: string;
    price: number;
    isSelected: boolean;
}

interface ICategory {
    _id: string;
    name: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface IProductWithImage extends IProduct {
    imageURL?: string;
}

interface ICart extends IProductWithImage {
    quantity: number;
    selectedSize: string;
    selectedToppings: Array<string>;
    totalPrice: number;
}

interface ISize {
    _id: string;
    size: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    __v: number;
}

interface ITopping {
    _id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    __v: number;
}

interface IFeedback {
    username: string;
    email: string;
    phoneNumber: string;
    review: string;
}
