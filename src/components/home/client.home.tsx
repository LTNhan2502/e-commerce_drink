import Image from "next/image";
import Header from "@/components/layout/client.header";
import SearchBar from "@/components/home/client.searchbar";
import menuImg from '../../assets/menu-image.webp';
import traSua from '../../assets/trasua.webp';
import ProductPage from "@/components/home/client.products";

const HomePage = () => {
    const products: IProduct[] = [
        { id: 1, name: "Trà sữa ANTEA thái xanh", price: 30000, image: traSua, category: "Trà Sữa", status: "best" },
        { id: 2, name: "Trà sữa ANTEA truyền thống", price: 30000, image: traSua, category: "Trà Sữa", status: "best" },
        { id: 3, name: "Trà ANTEA", price: 30000, image: traSua, category: "Trà - Trà chanh", status: "none" },
        { id: 4, name: "Trà sữa thái xanh khúc bạch", price: 30000, image: traSua, category: "Trà Sữa", status: "best" },
        { id: 5, name: "Trà sữa truyền thống khúc bạch", price: 30000, image: traSua, category: "Trà Sữa", status: "none" },
        { id: 6, name: "Trà sữa truyền thống phô mai", price: 27000, image: traSua, category: "Trà Sữa", status: "best" },
        { id: 7, name: "Trà sữa thái xanh trân châu đen", price: 25000, image: traSua, category: "Trà Sữa", status: "none" },
        { id: 8, name: "Trà sữa truyền thống trân châu đen", price: 25000, image: traSua, category: "Trà Sữa", status: "best" },
        { id: 9, name: "Trà chanh việt quất", price: 25000, image: traSua, category: "Trà - Trà chanh", status: "best" },
        { id: 10, name: "Trà chanh nhiệt đới", price: 25000, image: traSua, category: "Trà - Trà chanh", status: "none" },
        { id: 11, name: "Trà chanh", price: 18000, image: traSua, category: "Trà - Trà chanh", status: "none" },
        { id: 12, name: "Yaourt đác thơm", price: 27000, image: traSua, category: "Yaourt", status: "none" },
        { id: 13, name: "Yaourt việt quất", price: 25000, image: traSua, category: "Yaourt", status: "best" },
        { id: 14, name: "Yaourt đào", price: 25000, image: traSua, category: "Yaourt", status: "none" },
        { id: 15, name: "Yaourt dâu", price: 25000, image: traSua, category: "Yaourt", status: "best" },
        { id: 16, name: "Yaourt đá", price: 22000, image: traSua, category: "Yaourt", status: "best" },
        { id: 17, name: "Bánh đa trộn", price: 20000, image: traSua, category: "Ăn vặt", status: "best" },
        { id: 18, name: "Bánh tráng trộn", price: 20000, image: traSua, category: "Ăn vặt", status: "none" },
        { id: 19, name: "Sữa tươi hạt đác rim đường đen", price: 30000, image: traSua, category: "Đặc biệt", status: "none" },
    ];
    const categories = [...new Set(products.map(product => product.category))];

    return (
        <>
            <Header/>
            <div className='px-3 w-full mt-16'>
                <Image
                    src={menuImg}
                    alt='Menu'
                    width={500}
                    height={500}
                    className='w-full'
                />
            <SearchBar categories={categories} />

            {categories.map((category) => (
                <ProductPage
                    key={category}
                    category={category}
                    products={products.filter((product) => product.category === category)}
                />
            ))}
            </div>
        </>

    )
}

export default HomePage;