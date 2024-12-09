import Link from "next/link";

const Footer = () => {
    return(
        <div className='p-3 w-full fixed bottom-0 left-0 bg-white z-10'>
            <Link href={'/cart'} className='rounded-lg bg-amber-400 flex justify-center text-white w-full py-2 text font-medium'>
                Xem giỏ hàng - (1 món)
            </Link>
        </div>
    )
}

export default Footer;