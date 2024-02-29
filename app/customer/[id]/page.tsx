'use client'
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { GetCustomerById, StoreCustomer, UpdateCustomerById } from "../api/customerAPI"
import { RedirectCustomer } from "./redirectCustomer"

export default function Page({params}:any)
{
    const [customerState, setCustomerState] = useState({
        'name': '',
        'email': '',
        'phone': '',
    })
    const initState = async () => {
        const data = await GetCustomerById(params.id)
        const result = {
            'name': data.data.name,
            'email': data.data?.email ?? '',
            'phone': data.data?.phone ?? '',
        }
        setCustomerState(result)
    }
    const handelProduct = (e:any) => {
        const { name, value } = e.target
        const { email, vlaues } = e.target
        const { phone, setPhone } = e.target
        setCustomerState((prev) => ({
            ...prev,
            [name]: value,
            [email]: vlaues,
            [phone]: setPhone
        }))
    }
    const handelOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (params.id != 'add') 
        {
            const response = await UpdateCustomerById(params.id, customerState)
            if(response)
            {
                RedirectCustomer('/customer')
            }
        }
        else
        {
            console.log(customerState)
            try 
            { 
                const response = await StoreCustomer(customerState)
                if (response)
                {
                    RedirectCustomer('/customer')
                }
                
            }
            catch (error)
            {
                console.log(error)
            }
        }
    }
    useEffect(()=> {
        initState()
    }, [])
    return (
        <div className="container">
            <Card className="w-[350px] m-auto">
                <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handelOnSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Customer Name</Label>
                                <Input id="name" name="name" placeholder="Customer Name" type="text" onChange={handelProduct} value={customerState.name} required ></Input>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="example@example.com" type="email" onChange={handelProduct} value={customerState.email} ></Input>
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" placeholder="0123456789" type="text" onChange={handelProduct} value={customerState.phone} ></Input>
                            </div>
                        </div>
                        <div className="w-full flex justify-between pt-3">
                            <Link className="btn" href="/customer">Cancel</Link>
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}