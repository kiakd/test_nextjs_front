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
import { GetCustomerById } from "../../api/customerAPI"

export default function Page({ params }: any) {
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
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Customer Name</Label>
                            <Input id="name" name="name" placeholder="Customer Name" type="text" value={customerState.name} disabled ></Input>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="example@example.com" type="email" value={customerState.email} disabled ></Input>
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" placeholder="0123456789" type="text" value={customerState.phone} disabled ></Input>
                        </div>
                    </div>
                    <div className="w-full flex justify-between pt-3">
                        <Link className="btn" href="/customer">Cancel</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}