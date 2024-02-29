"use client"
import Link from "next/link"
import React from 'react'
import styles from './navlink.module.css'
import { usePathname } from "next/navigation"
import { cookies } from 'next/headers';
export default function NavLink({item}: any) {
    const pathName = usePathname();
  return (
    <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>{item.title}</Link>
  )
}
