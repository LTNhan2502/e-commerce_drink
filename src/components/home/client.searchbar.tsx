'use client'
import React, {useEffect, useState} from "react";
import {AiOutlineDown, AiOutlineSearch} from "react-icons/ai";

interface ISearchBar {
    categories: string[];
    onScrollToCategory: (category: string) => void;
}

const SearchBar: React.FC<ISearchBar> = ({ categories, onScrollToCategory }) => {
    const [isDropVisible, setIsDropVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategorySelect = (category: string) => {
        setSearchQuery(category);
        setIsDropVisible(false);
        onScrollToCategory(category);
        console.log(searchQuery);
    }

    useEffect(() => {
        // Khi mở overlay, ẩn thanh cuộn body
        if (isDropVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isDropVisible]);

    return(
        <>
            {/* Tìm kiếm */}
            <div className='flex px-3 py-3 bg-white sticky top-[47px] left-0 z-[10] -mx-3 mb-16'>
                <button
                    className='flex rounded-lg border flex-1 px-3 py-2 justify-between'
                    onClick={() => setIsDropVisible(true)}
                >
                    <span className='text-gray-600'>Sản phẩm</span>
                    <AiOutlineDown className='text-gray-500 h-6 w-6'/>
                </button>
                <button className='flex rounded-lg border px-3 ms-3 justify-between items-center'>
                    <AiOutlineSearch className='h-6 w-6 text-gray-500'/>
                    <span className='text-sm text-gray-600'>Tìm</span>
                </button>
            </div>

            {/* Dropdown overlay */}
            <div className='relative'>
                {isDropVisible && (
                    <div
                        className='fixed inset-0 z-50 w-screen flex justify-center items-end'
                        onClick={() => setIsDropVisible(false)}
                    >
                        <div className='w-full rounded-xl p-6 backdrop-blur-2xl'>
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategorySelect(category)}
                                    className='border border-gray-700 my-2 hover:border-white hover:text-white font-medium rounded-lg py-2 px-3 w-full text-center inline-block'
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchBar;