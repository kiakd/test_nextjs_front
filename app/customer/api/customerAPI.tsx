'use server'
import { redirect } from "next/navigation"
import React from 'react'

export async function DeleteCustomerById($id:any) {
    console.log('del')
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/${$id}}`,{
        method: "DELETE",
       })
       return {message:'del sucess', status: 200}
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function UpdateCustomerById($id,$data) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/${$id}}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify($data)
       })
       const reuslt  = await response.json()
       return reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function StoreCustomer($data) {
    console.log($data)
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify($data)
       })
       const reuslt  = await response.json()
       return  reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}


export async function GetCustomerById($id) {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer/${$id}}`)
       const reuslt  = await response.json()
       return reuslt
    }
    catch (error)
    {
        console.log(error)
    }
}

export async function GetCustomerAll() {
    try
    {   
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customer`, { cache: 'no-store' })
       return response.json()
    }
    catch (error)
    {
        return [{message: error, status: 500}]
    }
}
