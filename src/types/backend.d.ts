interface IProduct {
    _id: string;
    category_id: Array<string>;
    size_id: Array<string>;
    topping_id: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    name: string;
    price: number;
    images: Array<string>;
    __v: number;
}

interface ICategory {
    _id: string;
    name: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}