'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

export default function OverlayDrawer({ menuOpen, setMenuOpen }) {
    // const [open, setOpen] = useState(menuOpen)

    return (
        <Dialog open={menuOpen} onClose={() => setMenuOpen(!menuOpen)} className="relative z-[11]">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto relative w-screen max-w-md transform transition duration-300 ease-in-out data-[closed]:-translate-x-full sm:duration-300"
                        >
                            <TransitionChild>
                                <div className="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 duration-300 ease-in-out data-[closed]:opacity-0 sm:-mr-10 sm:pl-4">
                                    <button
                                        type="button"
                                        onClick={() => setMenuOpen(false)}
                                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <DialogTitle className="text-base font-semibold text-gray-900">Panel title</DialogTitle>
                                </div>
                                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    <div className='font-semibold w-full text-center text-lg mb-3'>
                                        <Link href={'/'} onClick={() => setMenuOpen(false)}>Trà sữa An tea</Link>
                                    </div>
                                    <ul>
                                        <li className="p-3 font-normal border-b-gray-300 w-full inline-block border-b border-white cursor-pointer">
                                            <Link href={'/auth/login'} onClick={() => setMenuOpen(false)}>Đăng nhập</Link>
                                        </li>
                                        <li className="p-3 font-normal border-b-gray-300 w-full inline-block border-b border-white cursor-pointer">
                                            <Link href={'/feedback'} onClick={() => setMenuOpen(false)}>Đánh giá</Link>
                                        </li>
                                        <li className="p-3 font-normal border-b-gray-300 w-full inline-block border-b border-white cursor-pointer">
                                            <Link href={'/cart'} onClick={() => setMenuOpen(false)}>Giỏ hàng</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
