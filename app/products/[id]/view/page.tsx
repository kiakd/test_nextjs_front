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
import axios from "axios"
import Link from "next/link"

export default function page({ params, actions, names }: any) {
    console.log("view")
    const [productState, setProductImgState] = useState({
        'name': '',
        'pathFileName': '',
        'id': '',
    })
    const [file, setFile] = useState<File>()

    const initProduct = async () => {

        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${params.id}`).then(res => {
            setProductImgState(res.data.data)
        })
    }
    const handelProduct = (e) => {
        const { name, value } = e.target
        setProductImgState((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (params.id != 'add') {
            initProduct()
        }
    }, [])
    return (
        <div className="container">
            <Card className="w-[350px] m-auto">
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" placeholder="Product Name" type="text" onChange={handelProduct} value={productState.name} disabled="true" ></Input>
                            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${productState.pathFileName}`} alt="img" className={`${params.id === 'add' && `hidden`} `} />
                        </div>
                    </div>
                    <div className="w-full flex justify-between pt-3">
                            <Link className="btn" href="/products">Cancel</Link>
                        </div>
                </CardContent>
            </Card>
        </div>
    )
}
