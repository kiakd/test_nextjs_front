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
import { RedirectProductPath } from "./redirectProductPath"

export default function page({ params, actions, names }: any) {
    console.log(params)
    console.log(actions, names)
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

    const handelOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const dataFile: File | null = file as unknown as File
        let buffer = null
        let nameImage = null
        console.log(dataFile)
        if (dataFile) {
            const bytes = await dataFile.arrayBuffer()
            buffer = Buffer.from(bytes)
            nameImage = dataFile.name
        }
        if (params.id != 'add') {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": productState.name,
                    "buffer": buffer,
                    "pathFileName": `${nameImage}`
                })
            })
            if (!response.ok) {
                console.log(response)
            }

        } else {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": productState.name,
                    "buffer": buffer,
                    "pathFileName": `${nameImage}`
                })
            })
            if (!response.ok) {
                console.log(response)
            }

        }
        RedirectProductPath('/products')

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
                    <form onSubmit={handelOnSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" name="name" placeholder="Product Name" type="text" onChange={handelProduct} value={productState.name} ></Input>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${productState.pathFileName}`} alt="img" className={`${params.id === 'add' && `hidden`} `} />
                                <Input name="inputImage" type="file" onChange={(e) => setFile(e.target.files?.[0])} />
                            </div>
                        </div>
                        <div className="w-full flex justify-between pt-3">
                            <Link className="btn" href="/products">Cancel</Link>
                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
