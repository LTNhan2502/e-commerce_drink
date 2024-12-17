"use client";
import Image from "next/image";
import Header from "@/components/layout/client.header";
import SearchBar from "@/components/home/client.searchbar";
import menuImg from '../../assets/menu-image.webp';
import ProductPage from "@/components/home/client.products";
import {useEffect, useRef, useState} from "react";
import { getMenu } from "@/utils/menuServices";
import { getCategory } from "@/utils/categoryServices";
import {LoadingPage} from "@/components/loading/loading.page";

const HomePage = () => {
    const [menu, setMenu] = useState<IProduct[]>([]);
    const [allCategories, setAllCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
    // Dùng ref để lưu vị trí từng danh mục
    const categoryRefs = useRef<Record<string, HTMLDivElement>>({})

    const handleScrollToCategory = (category: string) => {
        categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [menuRes, categoryRes] = await Promise.all([
                    getMenu(1, 30),
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
    console.log(">>Check all products", menu);

    if(loading){
        return(
            <LoadingPage/>
        )
    }

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
                <SearchBar
                    categories={allCategories.map((category) => category.name)}
                    onScrollToCategory={handleScrollToCategory}
                />

                {allCategories.map((category) => (
                    <div
                        key={category._id}
                        className='last:mb-16'
                        ref={(el) => {
                            if(el) categoryRefs.current[category.name] = el
                        }} // Lưu ref của từng danh mục
                    >
                        <ProductPage
                            category={category.name}
                            products={menu.filter((product) =>
                                product.category_id.includes(category._id)
                            )}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomePage;
