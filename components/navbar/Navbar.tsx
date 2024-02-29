import React from 'react'
import Links from './links/Links';
import styles from "./navbar.module.css"

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        Logo
      </div>
      <div>
        <Links /> 
      </div>
    </div>
  )
}
