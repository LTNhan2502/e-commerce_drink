"use client";
import Image from "next/image";
import Header from "@/components/layout/client.header";
import SearchBar from "@/components/home/client.searchbar";
import menuImg from '../../assets/menu-image.webp';
import ProductPage from "@/components/home/client.products";
import { useEffect, useState } from "react";
import { getMenu } from "@/utils/menuServices";
import { getCategory } from "@/utils/categoryServices";

const HomePage = () => {
    const [menu, setMenu] = useState<IProduct[]>([]);
    const [allCategories, setAllCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [menuRes, categoryRes] = await Promise.all([
                    getMenu(1, 10),
                    getCategory(),
                ]);

                setMenu(menuRes.data.result || []);
                setAllCategories(categoryRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log(loading)
    console.log(">>Check all categories", allCategories);

    return (
        <>
            <Header />
            <div className="px-3 w-full mt-16">
                <Image
                    src={menuImg}
                    alt="Menu"
                    width={500}
                    height={500}
                    className="w-full"
                />
                <SearchBar categories={allCategories.map((category) => category.name)} />

                {allCategories.map((category) => (
                    <ProductPage
                        key={category._id}
                        category={category.name}
                        products={menu.filter((product) =>
                            product.category_id.includes(category._id)
                        )}
                    />
                ))}
            </div>
        </>
    );
};

export default HomePage;
