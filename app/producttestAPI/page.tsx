import React from 'react'
import GetProductTest from "./api/getProductTest"
import Form from "./form"


export default async function page() {
    const response = await GetProductTest()
    const result : any = await response
    return (
        <Form items={result.data} />
    )
}
