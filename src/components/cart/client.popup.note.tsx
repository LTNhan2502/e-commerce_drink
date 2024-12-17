import React, {useRef, useEffect, useState} from 'react';

interface IPopup {
    noteContent: string;
    isOpen: boolean;
    setIsOpen: () => void;
    productRef: HTMLDivElement | null;
}

const PopUp: React.FC<IPopup> = ({ noteContent, isOpen, setIsOpen, productRef }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [top, setTop] = useState<number | null>(null)

    useEffect(() => {
        const updatePosition = () => {
            if(productRef){
                console.log(">>Check productRef", productRef)
                const rect = productRef.getBoundingClientRect()
                setTop(Math.min(rect.bottom + window.scrollY, window.innerHeight - 100))
            }
        }

        if(isOpen){
            setTimeout(() => {
                updatePosition()
            }, 1)
            window.addEventListener("scroll", updatePosition, true)
            window.addEventListener("resize", updatePosition)
        }

        return () => {
            window.removeEventListener("scroll", updatePosition, true)
            window.removeEventListener("resize", updatePosition)
        }
    }, [isOpen, productRef]);

    // Nhấn ra ngoài thì đóng popup
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    if (!isOpen || !top) return null;

    return (
        <div
            ref={popupRef}
            className="mt-2 w-60 p-4 bg-white border border-gray-300 rounded-lg shadow-lg text-gray-600"
            style={{
                position: "absolute",
                top: `${top}px`,
                zIndex: 40,
            }}
        >
            <div className="flex items-start space-x-2">
                <p className="text-sm leading-relaxed">{noteContent}</p>
            </div>
        </div>
    );
};

export default PopUp;
