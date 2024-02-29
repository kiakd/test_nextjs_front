import React from 'react'
import NavLink from "./navlink/navLink"
import { cookies } from 'next/headers';

export default function Links() {
    const isLoggedIn = cookies().get('token_laravel_login');
    const links = [
        {
            title: "Homepage",
            path: "/",
        },
        {
            title: "Products",
            path: "/products",
        },
        {
            title: "Customer",
            path: "/customer",
        },
        ...(isLoggedIn)
        ? [] :
        [
        {
            title: "Login",
            path: "/login",
        }],
        {
            title: "User",
            path: "/user",
        }
    ]
    return (
        <div className="">
            {links.map((link => (
                <NavLink item={link} key={link.title} />
            )))}
        </div>
    )
}