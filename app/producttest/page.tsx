import React from 'react'
import GetProductTest from "./api/getProductTest"
import { DataTableDemo } from "./form"
import { columns } from "./column"


export default async function page() {
    const response = await GetProductTest()
    const result : any = await response
    console.log(result.data)
    return (
        <DataTableDemo columns={columns} data={result.data.data} nextPage={result.data.next_page_url} />
    )
}
