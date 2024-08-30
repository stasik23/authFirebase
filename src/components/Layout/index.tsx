import React from 'react'
import { NavbarComp } from '../NavbarComp';

export const Layout = ({ children }) => {
    return (
        <>
            <NavbarComp />
            {children}
        </>
    )
}