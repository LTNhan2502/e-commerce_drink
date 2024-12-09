interface IProduct {
    _id: string;
    category_id: Array<string>;

    name: string;
    price: number;
    image: StaticImageData;
    category: string;
    status: string;
}