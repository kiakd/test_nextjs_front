"use server"

import { request } from "http"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { useAuth} from "@/hooks/auth"

export async function FormLogin(prevState : any,formData:any) {
    const emails = formData.get("email")
    const passwords = formData.get("password")
    console.log(emails)
    console.log(passwords)
    const response = await fetch ('http://localhost:8000/api/loginpage', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "email": emails,
            "password": passwords,
        })
    })

    const result = await response.json()
    console.log(result.message)
    if (result.message != 'success'){
        return { message: 'login fail' }
    }
    cookies().set('token_laravel_login', result.access_token)
    cookies().set('token_type', result.token_type)
    
    return redirect('/user')
}
