'use client'
import {createContext, ReactNode} from "react";

interface ICurrencyContext{
    formatCurrency: (number: number) => string
}

interface CurrencyWrapperProps {
    children: ReactNode;
}

export const CurrencyContext = createContext<ICurrencyContext | undefined>(undefined)

export const CurrencyWrapper = ({ children }: CurrencyWrapperProps) => {
    const formatCurrency = (number: number) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            maximumFractionDigits: 0,
        });
        return formatter.format(number);
    };


    return(
        <CurrencyContext.Provider value={{ formatCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}